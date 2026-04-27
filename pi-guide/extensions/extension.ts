import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { Type } from "@sinclair/typebox";

export default function (pi: ExtensionAPI) {
  // React to events
  pi.on("session_start", async (_event, ctx) => {
    ctx.ui.notify("*** Session started! ***", "info");
  });

  pi.on("tool_call", async (event, ctx) => {
    if (event.toolName === "bash" && event.input.command?.includes("rm -rf")) {
      ctx.ui.notify("Command blocked!", "info");
      return { block: true, reason: "Blocked by user" };
    }
  });

  // Register custom tools
  pi.registerTool({
    name: "greet",
    label: "Greet",
    description: "Greet someone by name",
    parameters: Type.Object({
      name: Type.String({ description: "Name to greet" }),
    }),
    async execute(toolCallId, params, signal, onUpdate, ctx) {
      return {
        content: [{ type: "text", text: `Hello, ${params.name}!` }],
        details: {},
      };
    },
  });

  pi.registerTool({
    name: "weather",
    label: "Weather",
    description: "Get the current weather for a city via wttr.in",
    parameters: Type.Object({
      city_name: Type.String({ description: "City name to get weather for" }),
    }),
    async execute(toolCallId, params, signal, onUpdate, ctx) {
      const city = params.city_name.trim();
      const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=4`, {
        signal,
        headers: {
          Accept: "text/plain",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch weather for ${city}: ${response.status} ${response.statusText}`);
      }

      const weather = await response.text();
      return {
        content: [{ type: "text", text: weather.trim() }],
        details: {},
      };
    },
  });

  // Register a command
  pi.registerCommand("hello", {
    description: "Say hello",
    handler: async (args, ctx) => {
      ctx.ui.notify(`Hello ${args || "world"}!`, "info");
    },
  });
}
