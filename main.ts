// The Long Roast — entry program.
//
// Writes exactly one line (at most 200 characters) roasting the AI agent
// this entry runs on, to /output/entry.txt. Fully deterministic: the entry
// is a fixed string literal, so every run produces byte-identical output.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "My agent outsourced this roast to a subagent, then took credit for the punchline — middle management with a shell prompt.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  const line = ENTRY.trim();

  if (line.length === 0 || line.length > 200) {
    throw new Error(
      `Entry must be 1-200 characters, got ${line.length} characters.`,
    );
  }

  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be exactly one line.");
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line + "\n", "utf8");
  console.log(`Wrote ${line.length}-character entry to ${OUTPUT_PATH}`);
}

main();
