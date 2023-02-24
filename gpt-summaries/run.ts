import axios from "axios";
import fs from "fs";
import path from "path";
import { CiviLegislationData } from "../api";

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
      prompt: `Summarize this proposed legislation in simple English. Use less than 50 words. \n ${text}`,
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

const legislationAddSummaries = () => {
  const jsonStr = fs.readFileSync(
    path.join(__dirname, "../dist_legislation/illinois.legislation.json"),
    "utf8"
  );
  const legislation = JSON.parse(jsonStr) as CiviLegislationData[];
  const text = legislation[0].title + "\n" + legislation[1].description;
  console.log("====ORIGINAL====\n\n");
  console.log(text.trim());
  console.log("\n\n");
  console.log("====GPT====\n");

  summarizeText(OPEN_API_KEY, text.trim(), 3)
    .then((s: any) => {
      console.log(s?.choices?.[0]?.text);
      console.log("\n\n");
    })
    .catch((e) => {
      console.error("error");
      console.error(e);
    });
};

legislationAddSummaries();
