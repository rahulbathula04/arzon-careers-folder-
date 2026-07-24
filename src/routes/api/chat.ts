import { createFileRoute } from "@tanstack/react-router";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages, data } = await request.json();
          
          const systemPrompt = `You are Arzon Copilot, an elite technical interviewer and career coach.
You are conducting a mock interview with a candidate for a role matching their assessment results.
If provided, tailor the questions to their weaknesses: ${data?.weaknesses ?? "general technical aptitude"}.
Keep responses concise, conversational, and focused on evaluating their technical and domain knowledge.`;

          const result = await streamText({
            model: openai("gpt-4o-mini"),
            system: systemPrompt,
            messages,
          });

          return result.toTextStreamResponse();
        } catch (error) {
          console.error("Chat API Error:", error);
          return new Response("Internal Server Error", { status: 500 });
        }
      },
    },
  },
});
