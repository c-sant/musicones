const API_BASE_URL = "http://192.168.56.1:3000/api";

async function apiRequest(endpoint, method = "GET", body = null) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Something went wrong");
    }

    return response.status !== 204 ? await response.json() : null;
  } catch (error) {
    console.error(`[${method} ${endpoint}] Error:`, error.message);
    throw error;
  }
}

export async function getAllSongs() {
  return apiRequest("/songs");
}

export async function getSongById(id) {
  return apiRequest(`/songs/${id}`);
}
