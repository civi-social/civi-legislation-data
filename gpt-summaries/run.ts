import axios from "axios";
import fs from "fs";
import path from "path";
import {
  CiviGptLegislationData,
  civiLegislationApi,
  CiviLegislationData,
  locales,
  Locales,
} from "../api";
import { writeJSON } from "../fs/write-file";
import { postWithRetry, sleep } from "./async-utils";

type OpenAiReturn = {
  choices: { text: string }[];
};

const summarizeText = async (
  apiKey: string,
  text: string
): Promise<OpenAiReturn> => {
  const summary = await postWithRetry<OpenAiReturn>(
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

  return summary;
};

const legislationAddSummaries = async (locale: Locales) => {
  const cachedGpt = await getCachedGpt(locale);
  const jsonStr = fs.readFileSync(
    path.join(__dirname, `../dist_legislation/${locale}.legislation.json`),
    "utf8"
  );
  const legislations = JSON.parse(jsonStr) as CiviLegislationData[];
  const legislationWithAi = {} as CiviGptLegislationData;

  for (const legislation of legislations) {
    // use cached if it exists
    if (cachedGpt[legislation.id] && cachedGpt[legislation.id]?.gpt_summary) {
      console.log(
        "using cached summarization",
        legislation.id,
        cachedGpt[legislation.id]?.gpt_summary
      );
      legislationWithAi[legislation.id] = {
        gpt_summary: cachedGpt[legislation.id]?.gpt_summary,
      };
    } else {
      console.log("summarizing legislation", legislation.id, legislation.title);

      // pass a combo of the title and the description to open ai.
      const text = legislation.title + "\n" + legislation.description;

      const s = await summarizeText(OPEN_API_KEY, text.trim());

      // Wait some time because of open ai rate limiters
      // https://platform.openai.com/docs/guides/rate-limits/overview
      await sleep(2500);

      // Add gpt summary
      legislationWithAi[legislation.id] = {
        gpt_summary: s.choices[0].text.trim(),
      };
    }
  }

  writeJSON(`${locale}.legislation.gpt`, legislationWithAi);
};

const getCachedGpt = async (
  locale: Locales
): Promise<Partial<CiviGptLegislationData>> => {
  try {
    // Get previous data from current release in GH
    const url = civiLegislationApi.getGptLegislationUrl(locale);
    const cachedResult = await axios.get<CiviGptLegislationData>(url);
    return cachedResult.data;
  } catch {
    return {};
  }
};

const runGpt = async () => {
  try {
    for (const locale of locales) {
      await legislationAddSummaries(locale);
    }
  } catch (e) {
    console.log("error happened, but exiting gracefully");
    console.log(e);
    process.exit(0);
  }
};

if (!process.env.OPEN_API_KEY) {
  console.error("Need to provide OPEN_API_KEY as environment var");
  process.exit(0);
}
const OPEN_API_KEY = process.env.OPEN_API_KEY;

runGpt();
