const API_KEY = "partnora_demo_local_dev_key";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set("X-API-Key", API_KEY);
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (init?.method && init.method !== "GET" && !headers.has("Idempotency-Key")) {
    headers.set("Idempotency-Key", crypto.randomUUID());
  }
  const res = await fetch(path, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export type ListEnvelope<T> = {
  data: { items: T[]; nextCursor?: string };
  meta?: { correlationId?: string; generatedAt?: string };
};

export type DataEnvelope<T> = {
  data: T;
  meta?: { correlationId?: string; generatedAt?: string };
};
