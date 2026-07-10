import { describe, expect, it } from "vitest";
import { extractSseContent } from "@/utils/sse";

describe("extractSseContent", () => {
  it("testExtractsContentWhenEventIsComplete", () => {
    const input = 'data: {"choices":[{"delta":{"content":"你好"}}]}\n\n';
    expect(extractSseContent(input)).toEqual({ content: "你好", rest: "" });
  });

  it("testKeepsBufferWhenEventIsIncomplete", () => {
    const input = 'data: {"choices":[{"delta":{"content":"半';
    expect(extractSseContent(input)).toEqual({ content: "", rest: input });
  });

  it("testIgnoresDoneAndMalformedEvents", () => {
    const input = "data: invalid\n\ndata: [DONE]\n\n";
    expect(extractSseContent(input)).toEqual({ content: "", rest: "" });
  });
});
