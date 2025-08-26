import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const backendUrl = "http://localhost:3000/sse/connect";

  const backendResp = await fetch(backendUrl, {
    headers: { Accept: "text/event-stream" },
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        const reader = backendResp.body!.getReader();
        let buffer = "";

        controller.enqueue(encoder.encode("retry: 3000\n\n"));

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          console.log("Chunk do backend:", JSON.stringify(chunk));

          buffer += chunk;

          // separa em linhas
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.trim() === "") continue;

            if (line.startsWith("data:")) {
              const msg = line.replace(/^data:\s*/, "");
              const payload = `event: message\ndata: ${msg}\n\n`;
              controller.enqueue(encoder.encode(payload));
              console.log("Proxy repassando:", payload);
            } else {
              console.log("Linha ignorada do backend:", line);
            }
          }
        }
      },
      cancel() {
        console.log("Proxy cancelado pelo cliente");
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      },
    }
  );
}
