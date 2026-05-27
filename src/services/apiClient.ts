const DEFAULT_API_BASE_URL = "http://localhost:3000";
const API_BASE_URL =
  process.env["EXPO_PUBLIC_API_BASE_URL"]?.trim() || DEFAULT_API_BASE_URL;
const API_ROUTE_PREFIX = "/v1";
const API_AUTH_HASH_HEADER = "X-Auth-Hash";
const API_AUTH_HASH_TOKEN =
  process.env["EXPO_PUBLIC_API_AUTH_HASH"]?.trim() ||
  "mvp-user-4a2b8c1d9e0f3a7b5c6d8e2f1a0b9c8";
const PUBLIC_ROUTES = new Set<string>(["/health"]);

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type QueryValue = string | number | boolean | null | undefined;

type ApiRequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  query?: Record<string, QueryValue>;
  signal?: AbortSignal;
};

type ApiErrorDetails = {
  status: number;
  path: string;
  details?: unknown;
};

export class ApiError extends Error {
  status: number;
  path: string;
  details?: unknown;

  constructor(message: string, { status, path, details }: ApiErrorDetails) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.path = path;
    this.details = details;
  }
}

function normalizePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (PUBLIC_ROUTES.has(normalizedPath)) {
    return normalizedPath;
  }
  if (
    normalizedPath.startsWith(`${API_ROUTE_PREFIX}/`) ||
    normalizedPath === API_ROUTE_PREFIX
  ) {
    return normalizedPath;
  }
  return `${API_ROUTE_PREFIX}${normalizedPath}`;
}

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const normalizedPath = normalizePath(path);
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  if (!query) {
    return url.toString();
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

function isJsonResponse(response: Response) {
  return response.headers.get("content-type")?.includes("application/json");
}

async function parseResponseBody<TResponse>(response: Response) {
  if (response.status === 204) {
    return undefined as TResponse;
  }

  if (isJsonResponse(response)) {
    return (await response.json()) as TResponse;
  }

  return (await response.text()) as TResponse;
}

export async function apiClient<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  const { method = "GET", body, headers, query, signal } = options;
  const url = buildUrl(path, query);
  const response = await fetch(url, {
    method,
    signal,
    headers: {
      [API_AUTH_HASH_HEADER]: API_AUTH_HASH_TOKEN,
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorBody: unknown;
    if (isJsonResponse(response)) {
      errorBody = await response.json();
    } else {
      errorBody = await response.text();
    }

    throw new ApiError(`Request failed with status ${response.status}`, {
      status: response.status,
      path: normalizePath(path),
      details: errorBody,
    });
  }

  return parseResponseBody<TResponse>(response);
}

export function apiGet<TResponse>(
  path: string,
  options?: Omit<ApiRequestOptions, "method" | "body">,
) {
  return apiClient<TResponse>(path, { ...options, method: "GET" });
}

export function apiPost<TResponse>(
  path: string,
  body?: unknown,
  options?: Omit<ApiRequestOptions, "method" | "body">,
) {
  return apiClient<TResponse>(path, { ...options, method: "POST", body });
}

export function apiPut<TResponse>(
  path: string,
  body?: unknown,
  options?: Omit<ApiRequestOptions, "method" | "body">,
) {
  return apiClient<TResponse>(path, { ...options, method: "PUT", body });
}

export function apiPatch<TResponse>(
  path: string,
  body?: unknown,
  options?: Omit<ApiRequestOptions, "method" | "body">,
) {
  return apiClient<TResponse>(path, { ...options, method: "PATCH", body });
}

export function apiDelete<TResponse>(
  path: string,
  options?: Omit<ApiRequestOptions, "method" | "body">,
) {
  return apiClient<TResponse>(path, { ...options, method: "DELETE" });
}
