import { NextResponse } from "next/server"

const SUPERVITY_URL =
  "https://auto-workflow-api.supervity.ai/api/v1/workflow-runs/execute/stream"

const REQUIRED_ENV_KEYS = ["SUPERVITY_API_TOKEN", "SUPERVITY_WORKFLOW_ID"] as const
const VALID_INPUT_METHODS = ["Image Upload", "Manual Input"] as const

function getMissingEnvVars() {
  return REQUIRED_ENV_KEYS.filter((name) => !process.env[name]?.trim())
}

function normalizeCheckboxValue(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return "false"
  }

  return value === "true" ? "true" : "false"
}

function normalizeInputMethod(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null
  }

  const trimmedValue = value.trim()

  if (trimmedValue === "upload") {
    return "Image Upload"
  }

  if (trimmedValue === "manual") {
    return "Manual Input"
  }

  if (VALID_INPUT_METHODS.includes(trimmedValue as (typeof VALID_INPUT_METHODS)[number])) {
    return trimmedValue as (typeof VALID_INPUT_METHODS)[number]
  }

  return null
}

function parseStreamEventData(rawText: string) {
  const blocks = rawText
    .split(/\r?\n\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)

  const events = blocks.map((block) => {
    const eventMatch = block.match(/(?:^|\n)event:\s*(.+)/)
    const dataLines = block
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.replace(/^data:\s?/, ""))

    const dataText = dataLines.join("\n")

    let parsedData: unknown = dataText

    try {
      parsedData = dataText ? JSON.parse(dataText) : null
    } catch {
      parsedData = dataText
    }

    return {
      event: eventMatch?.[1]?.trim() ?? "message",
      data: parsedData,
    }
  })

  return {
    events,
    errorEvent: events.find((event) => event.event === "error"),
  }
}

export async function POST(request: Request) {
  try {
    const missingEnvVars = getMissingEnvVars()

    if (missingEnvVars.length > 0) {
      return NextResponse.json(
        {
          error: `Workflow is not configured. Add ${missingEnvVars.join(", ")} to frontend/.env.local and restart Next.js.`,
          missingEnvVars,
        },
        { status: 503 },
      )
    }

    const sourceFormData = await request.formData()

    const businessName = sourceFormData.get("business_name")
    const industry = sourceFormData.get("industry")
    const description = sourceFormData.get("description")
    const services = sourceFormData.get("services")
    const rawInputMethod = sourceFormData.get("input_method")
    const inputMethod = normalizeInputMethod(rawInputMethod)
    const websiteImage = sourceFormData.get("website_image")

    if (!businessName || !industry || !description || !services || !rawInputMethod) {
      return NextResponse.json(
        { error: "Missing one or more required workflow fields." },
        { status: 400 },
      )
    }

    if (!inputMethod) {
      return NextResponse.json(
        {
          error: `Unsupported input_method. Use one of: ${VALID_INPUT_METHODS.join(", ")}.`,
        },
        { status: 400 },
      )
    }

    if (inputMethod === "Image Upload" && !(websiteImage instanceof File)) {
      return NextResponse.json(
        { error: "Website image is required when using Image Upload." },
        { status: 400 },
      )
    }

    const upstreamFormData = new FormData()
    upstreamFormData.set("workflowId", process.env.SUPERVITY_WORKFLOW_ID!)
    upstreamFormData.set("inputs[input_method]", String(inputMethod))
    upstreamFormData.set("inputs[business_name]", String(businessName))
    upstreamFormData.set("inputs[industry]", String(industry))
    upstreamFormData.set("inputs[description]", String(description))
    upstreamFormData.set("inputs[services]", String(services))
    if (websiteImage instanceof File) {
      upstreamFormData.set("inputs[website_image]", websiteImage, websiteImage.name)
    }
    upstreamFormData.set(
      "inputs[custom_sections]",
      normalizeCheckboxValue(sourceFormData.get("custom_sections")),
    )

    let upstreamResponse: Response

    try {
      upstreamResponse = await fetch(SUPERVITY_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SUPERVITY_API_TOKEN!}`,
          "x-source": process.env.SUPERVITY_SOURCE ?? "v1",
        },
        body: upstreamFormData,
      })
    } catch (error) {
      const message =
        error instanceof Error && error.message.trim()
          ? error.message
          : "Unable to reach the Supervity workflow service."

      return NextResponse.json(
        {
          error: "Unable to reach the Supervity workflow service.",
          details: message,
        },
        { status: 502 },
      )
    }

    const rawText = await upstreamResponse.text()
    let parsedBody: unknown = null

    try {
      parsedBody = rawText ? JSON.parse(rawText) : null
    } catch {
      parsedBody = null
    }

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          error: "Supervity workflow request failed.",
          details: parsedBody ?? rawText,
          status: upstreamResponse.status,
        },
        { status: upstreamResponse.status },
      )
    }

    const streamedPayload = parseStreamEventData(rawText)

    if (streamedPayload.errorEvent) {
      const errorData = streamedPayload.errorEvent.data
      const message =
        typeof errorData === "object" &&
        errorData !== null &&
        "error" in errorData &&
        typeof errorData.error === "string"
          ? errorData.error
          : "Supervity workflow execution failed."

      return NextResponse.json(
        {
          error: message,
          details: errorData,
          raw: rawText,
        },
        { status: 502 },
      )
    }

    return NextResponse.json({
      ok: true,
      data: parsedBody ?? streamedPayload.events,
      raw: rawText,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error."

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
