import type { VercelRequest, VercelResponse } from "@vercel/node";

// Import the server handler built by Vite
let serverHandler: any;

async function getServerHandler() {
  if (!serverHandler) {
    const mod = await import("../dist/server/server.js");
    serverHandler = mod.default || mod;
  }
  return serverHandler;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const server = await getServerHandler();

    // Convert Vercel request to Web API Request
    const url = new URL(
      request.url || "/",
      `https://${request.headers.host || "localhost"}`
    );

    const webRequest = new Request(url, {
      method: request.method,
      headers: new Headers(request.headers as Record<string, string>),
      body:
        request.method !== "GET" && request.method !== "HEAD"
          ? JSON.stringify(request.body)
          : undefined,
    });

    // Call the server handler
    const webResponse = await server.fetch(webRequest, {}, {});

    // Set response headers
    webResponse.headers.forEach((value, name) => {
      response.setHeader(name, value);
    });

    // Set status code
    response.status(webResponse.status);

    // Send the response body
    const body = await webResponse.text();
    response.send(body);
  } catch (error) {
    console.error("SSR Error:", error);
    response.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
