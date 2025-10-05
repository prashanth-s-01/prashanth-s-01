require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");

async function main() {
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README.template.md"))
  ).toString("utf-8");

  const bb_quote = await (
    await fetch("https://api.breakingbadquotes.xyz/v1/quotes")
  ).json();

  const readme = readmeTemplate
    .replace("{bb_quote}", bb_quote[0].quote)
    .replace(
      "{bb_character}",
      `- ${bb_quote[0].author}`
    );

  await fs.writeFile("README.md", readme);
}

main();
