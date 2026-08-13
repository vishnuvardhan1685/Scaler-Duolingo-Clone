const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiGet<T>(path: string): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("No external API configured, using internal demo backend");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1000);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("No external API configured, using internal demo backend");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1000);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  } finally {
    clearTimeout(timeoutId);
  }
}
