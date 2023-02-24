import axios from "axios";

if (!process.env.OPEN_API_KEY) {
  console.error("Need to provide OPEN_API_KEY as environment var");
  process.exit(1);
}
const OPEN_API_KEY = process.env.OPEN_API_KEY;

async function summarizeText(
  apiKey: string,
  text: string,
  numSentences: number
): Promise<string> {
  const response = await axios.post(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      prompt: `Summarize this proposed legislation in a way a high school student would understand. Use less than 100 words. \n ${text}`,
      max_tokens: 60,
      temperature: 0.5,
      n: numSentences,
      stop: ".",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const summary = response.data;

  return summary;
}

const text = `
Requires the Department of Human Services to (i) establish a new intervention license category entitled \"OPS Harm Reduction Services\", (ii) establish standards for entities to become licensed under the OPS Harm Reduction Services category, and (iii) create a licensing application process. Provides that, notwithstanding any other law, ordinance, or regulation, any entity licensed as an OPS Harm Reduction Services provider may operate an overdose prevention site as authorized by the Department.
`;

summarizeText(OPEN_API_KEY, text, 3)
  .then((s) => {
    console.log(s);
  })
  .catch((e) => {
    console.error("error");
    console.error(e);
  });
