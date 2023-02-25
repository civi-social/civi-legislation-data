import axios from "axios";
import fs, { writeFile } from "fs";
import path from "path";
import { CiviLegislationData, locales, Locales } from "../api";
import { writeJSON } from "../scraper/writeFile";

if (!process.env.OPEN_API_KEY) {
  console.error("Need to provide OPEN_API_KEY as environment var");
  process.exit(1);
}
const OPEN_API_KEY = process.env.OPEN_API_KEY;

async function summarizeText(apiKey: string, text: string): Promise<string> {
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt: `Summarize this for an 8th-grade student:\n\n${text}`,
      max_tokens: 60,
      temperature: 0.5,
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

const legislationAddSummaries = async (locale: Locales) => {
  const jsonStr = fs.readFileSync(
    path.join(__dirname, `../dist_legislation/${locale}.legislation.json`),
    "utf8"
  );
  const legislations = JSON.parse(jsonStr) as CiviLegislationData[];
  const legislationWithAi = [...legislations];
  for (let legislation of legislations) {
    const text = legislation.title + "\n" + legislation.description;
    // console.log("====ORIGINAL====\n\n");
    // console.log(text.trim());
    // console.log("\n\n");
    // console.log("====GPT====\n");

    return summarizeText(OPEN_API_KEY, text.trim())
      .then((s: any) => {
        legislationWithAi[i2].summaries = {
          gpt: s.choices[0].text.trim(),
        };
      })
      .catch((e) => {
        console.error("error");
        console.error(e);
      });
  });

  writeJSON(`${locale}.legislation`, legislationWithAi);

  }
};
locales.forEach((locale) => {
  legislationAddSummaries(locale);
});
