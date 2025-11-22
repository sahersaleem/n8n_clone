import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("fetching", "5s");
    await step.sleep("transcribing", "5s");
    await step.sleep("sending to ui", "5s");
    await step.run("creating a workflow", () => {
      return prisma.workflow.create({
        data: {
          name: "Created in Function",
        },
      });
    });
    return { message: `Hello ${event.data.email}!` };
  }
);
