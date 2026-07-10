import { describe, expect, it } from "vitest";
import { parseChatRequest } from "@/services/chat-service";
import { AppError } from "@/core/errors";

describe("parseChatRequest", () => {
  it("testAddsSystemPromptWhenRequestIsValid", () => {
    const result = parseChatRequest({ messages: [{ role: "user", content: "写标题" }] });
    expect(result.messages[0].role).toBe("system");
    expect(result.messages[1]).toEqual({ role: "user", content: "写标题" });
  });

  it("testRejectsEmptyMessagesWhenContentIsBlank", () => {
    expect(() => parseChatRequest({ messages: [{ role: "user", content: "  " }] })).toThrow(AppError);
  });

  it("testRejectsUnknownRolesWhenRoleIsInvalid", () => {
    expect(() => parseChatRequest({ messages: [{ role: "admin", content: "test" }] })).toThrow(AppError);
  });
});
