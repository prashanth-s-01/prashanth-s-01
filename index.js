require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README.template.md"))
  ).toString("utf-8");
}
main();

const bb_quote = await (
  await fetch("https://officeapi.dev/api/quotes/random")
).json();

const readme = readmeTemplate
  .replace("{bb_quote}", bb_quote.data.content)
  .replace(
    "{bb_character}",
    `- ${bb_quote.data.character.firstname} ${bb_quote.data.character.lastname}`
  );

await fs.writeFile("README.md", readme);
