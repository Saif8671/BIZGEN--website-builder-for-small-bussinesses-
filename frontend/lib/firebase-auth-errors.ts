type ErrorLike = {
  code?: string
  message?: string
}

function currentHostname() {
  if (typeof window === "undefined") {
    return "this domain"
  }

  return window.location.hostname || "this domain"
}

export function getEmailAuthErrorMessage(error: ErrorLike) {
  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password. Please try again."
    case "auth/too-many-requests":
      return "Too many login attempts. Please try again later."
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in instead."
    case "auth/weak-password":
      return "Password is too weak. Please use at least 8 characters."
    case "auth/invalid-email":
      return "Please enter a valid email address."
    case "auth/operation-not-allowed":
      return "Email/password sign-in is not enabled in Firebase Authentication."
    case "auth/internal-error":
      return "Firebase Authentication is misconfigured. Check that the email/password provider is enabled and your frontend env values are correct."
    default:
      return error.message || "An error occurred during authentication."
  }
}

export function getOAuthAuthErrorMessage(error: ErrorLike, providerName: string) {
  switch (error.code) {
    case "auth/unauthorized-domain":
      return `${providerName} sign-in is blocked for ${currentHostname()}. Add this domain in Firebase Authentication -> Settings -> Authorized domains, then try again.`
    case "auth/operation-not-allowed":
      return `${providerName} sign-in is not enabled in Firebase Authentication.`
    case "auth/internal-error":
      return `${providerName} sign-in is misconfigured in Firebase Authentication.`
    case "auth/network-request-failed":
      return "Network error while contacting Firebase. Please check your connection and try again."
    default:
      return error.message || `An error occurred during ${providerName} authentication.`
  }
}
