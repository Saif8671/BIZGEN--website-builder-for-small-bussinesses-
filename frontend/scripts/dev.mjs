import net from "node:net"
import path from "node:path"
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const nextBin = path.resolve(__dirname, "../../node_modules/next/dist/bin/next")
const requestedPort = Number.parseInt(
  process.env.PORT ?? process.env.npm_config_port ?? "3001",
  10,
)
const preferredPort = Number.isInteger(requestedPort) ? requestedPort : 3001
const maxPortChecks = 20

function canListen(port) {
  return new Promise((resolve) => {
    const server = net.createServer()

    server.once("error", (error) => {
      if (error.code === "EADDRINUSE") {
        resolve(false)
        return
      }

      throw error
    })

    server.once("listening", () => {
      server.close(() => resolve(true))
    })

    server.listen(port)
  })
}

async function findAvailablePort(startPort) {
  for (let offset = 0; offset < maxPortChecks; offset += 1) {
    const port = startPort + offset

    if (await canListen(port)) {
      return port
    }
  }

  throw new Error(
    `Could not find an open port between ${startPort} and ${startPort + maxPortChecks - 1}.`,
  )
}

const port = await findAvailablePort(preferredPort)

if (port !== preferredPort) {
  console.log(
    `Port ${preferredPort} is already in use. Starting Next.js on http://localhost:${port} instead.`,
  )
}

const child = spawn(process.execPath, [nextBin, "dev", "--port", String(port)], {
  stdio: "inherit",
  env: {
    ...process.env,
    PORT: String(port),
  },
})

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})
