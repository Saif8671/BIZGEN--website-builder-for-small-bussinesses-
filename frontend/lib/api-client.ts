import { auth } from "./firebase";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * Gets the current Firebase ID token if a user is logged in.
 */
async function getAuthToken(): Promise<string | null> {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  
  try {
    return await currentUser.getIdToken();
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
}

/**
 * Helper to build the headers for API requests.
 */
async function getHeaders(customHeaders?: HeadersInit): Promise<Headers> {
  const headers = new Headers(customHeaders);
  
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const token = await getAuthToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

/**
 * Core API client for making requests to the FastAPI backend.
 */
export const apiClient = {
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const headers = await getHeaders(options?.headers);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "GET",
      headers,
    });
    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    const headers = await getHeaders(options?.headers);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "POST",
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse<T>(response);
  },

  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    const headers = await getHeaders(options?.headers);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "PUT",
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse<T>(response);
  },

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const headers = await getHeaders(options?.headers);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: "DELETE",
      headers,
    });
    return handleResponse<T>(response);
  },
};

/**
 * Helper to parse the response and handle errors consistently.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = "An error occurred";
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || response.statusText;
    } catch {
      errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }

  // Handle empty responses (like 204 No Content)
  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return {} as T;
  }

  return response.json();
}
