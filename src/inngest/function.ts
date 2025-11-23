import prisma from "@/lib/db";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openAi";
import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

const google = createGoogleGenerativeAI();
const openAi = createOpenAI();
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
  { id: "execute.ai" },
  { event: "execute.ai" },

  async ({ event, step }) => {
    await step.sleep("pretend", "5s");

    //For gemini
    const { steps: geminiSteps } = await step.ai.wrap(
      "gemini-generate-text",
      generateText,
      {
        model: google("gemini-2.5-flash"),
        system: "You are a helpful assistant",
        prompt: "2+2?",
      }
    );

    //For openAI
    const { steps: openAiSteps } = await step.ai.wrap(
      "openAI-generate-text",
      generateText,
      {
        model: openAi("gpt-4"),
        system: "You are a helpful assistant",
        prompt: "2+2?",
      }
    );

    //For ANTHROPIC
    const { steps: anthropicSteps } = await step.ai.wrap(
      "anthropic-generate-text",
      generateText,
      {
        model: anthropic("claude-sonnet-4-0"),
        system: "You are a helpful assistant",
        prompt: "2+2?",
      }
    );

    return { geminiSteps, openAiSteps, anthropicSteps };
  }
);
