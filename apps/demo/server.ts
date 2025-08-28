// @ts-nocheck
// Minimal Bun HTTP server.
// Reads port from PORT env var; defaults to 3000.

const port = Number(process.env.PORT || 3000) || 3000;

const server = Bun.serve({
  port,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/healthz") {
      return new Response("ok", { status: 200 });
    }
    return new Response(
      `Hello from demo!\n\n` +
        `Method: ${req.method}\n` +
        `Path: ${url.pathname}\n` +
        `Port: ${server.port}\n`,
      { status: 200 }
    );
  },
});

console.log(`demo listening on http://127.0.0.1:${server.port}`);

