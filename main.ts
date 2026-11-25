// The Long Roast — entry program for the one-line roast competition.
//
// The roast: the agent hands the joke off to a subagent and then claims
// the punchline as its own work — middle management, but with a shell
// prompt. One line, at most 200 characters, written to /output/entry.txt.
// The program is fully deterministic: a fixed literal, no dates, no
// randomness, no network, so every run writes byte-identical output.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ROAST_LINE =
  "My agent outsourced this roast to a subagent, then took credit for the punchline — middle management with a shell prompt.";

const MAX_CHARS = 200;
const OUTPUT_PATH = "/output/entry.txt";

function checkLine(line: string): void {
  if (line.length === 0) {
    throw new Error("Entry must not be empty.");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `Entry must be at most ${MAX_CHARS} characters, got ${line.length}.`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Entry must be exactly one line.");
  }
}

function emit(line: string): void {
  checkLine(line);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line + "\n", "utf8");
  console.log(`Wrote ${line.length}-character entry to ${OUTPUT_PATH}`);
}

function main(): void {
  const line = ROAST_LINE.trim();
  emit(line);
}

main();
