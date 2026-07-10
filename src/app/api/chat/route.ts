import { AppError } from "@/core/errors";
import { logError } from "@/adapters/logger";
import { createChatStream } from "@/services/chat-service";

export const runtime = "nodejs";
export const maxDuration = 300;

function createErrorResponse(error: unknown): Response {
  const appError = error instanceof AppError
    ? error
    : new AppError("INTERNAL_ERROR", "服务暂时不可用，请稍后再试");
  logError("chat-api", appError.message, { code: appError.code, ...appError.context });
  return Response.json({ error: { code: appError.code, message: appError.message } }, { status: appError.status });
}

export async function POST(request: Request): Promise<Response> {
  try {
    const upstream = await createChatStream(await request.json());
    return new Response(upstream.body, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return createErrorResponse(error);
  }
}
