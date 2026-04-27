"use strict";
/**
 * Minimal SDK Usage
 *
 * Uses all defaults: discovers skills, extensions, tools, context files
 * from cwd and ~/.pi/agent. Model chosen from settings or first available.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var pi_coding_agent_1 = require("@mariozechner/pi-coding-agent");
var session = (await (0, pi_coding_agent_1.createAgentSession)()).session;
session.subscribe(function (event) {
    if (event.type === "message_update" && event.assistantMessageEvent.type === "text_delta") {
        process.stdout.write(event.assistantMessageEvent.delta);
    }
});
await session.prompt("What files are in the current directory?");
session.state.messages.forEach(function (msg) {
    console.log(msg);
});
console.log();
