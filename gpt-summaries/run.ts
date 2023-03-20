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

type Gpt35TurboReturn = {
  id: string;
  object: string;
  created: number;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

const summarizeText = async (
  apiKey: string,
  text: string
): Promise<Gpt35TurboReturn> => {
  const summary = await postWithRetry<Gpt35TurboReturn>(
    "https://api.openai.com/v1/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Summarize this for an 8th-grade student:\n\n${text}`,
        },
      ],
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

const categorizeText = async (
  apiKey: string,
  text: string
): Promise<Gpt35TurboReturn> => {
  const prompt = `Can you categorize the following legislation? Give the response with only comma separated answers.
  
  ${text}

  The category options are: 

  Economy
  Education
  Democracy
  Health Care
  Public Safety
  Abortion
  Immigration
  Foreign Policy
  States Rights
  Civil Rights
  Climate Change
  `;

  const summary = await postWithRetry<Gpt35TurboReturn>(
    "https://api.openai.com/v1/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Summarize this for an 8th-grade student:\n\n${prompt}`,
        },
      ],
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
    console.log("\n\n\n");
    console.log("summarizing legislation", legislation.id, legislation.title);

    // get summaries
    if (cachedGpt[legislation.id] && cachedGpt[legislation.id]?.gpt_summary) {
      console.log("using cached summarization");
      legislationWithAi[legislation.id] = {
        ...(legislationWithAi[legislation.id] || {}),
        gpt_summary: cachedGpt[legislation.id]?.gpt_summary,
      };
    } else {
      // pass a combo of the title and the description to open ai.
      const text = legislation.title + "\n" + legislation.description;

      const summaryResult = await summarizeText(OPEN_API_KEY, text.trim());

      const gpt_summary = summaryResult.choices[0].message.content.trim();

      console.log("summarized", gpt_summary);

      // Wait some time because of open ai rate limiters
      // https://platform.openai.com/docs/guides/rate-limits/overview
      await sleep(2500);

      // Add gpt summary
      legislationWithAi[legislation.id] = {
        ...(legislationWithAi[legislation.id] || {}),
        gpt_summary,
      };
    }

    // get tags
    if (cachedGpt[legislation.id] && cachedGpt[legislation.id]?.gpt_tags) {
      console.log("using cached tags");
      legislationWithAi[legislation.id] = {
        ...(legislationWithAi[legislation.id] || {}),
        gpt_tags: cachedGpt[legislation.id]?.gpt_tags,
      };
    } else {
      // pass a combo of the title and the description to open ai.
      const text = legislation.title + "\n" + legislation.description;

      console.log("tagging legislation");

      const summaryResult = await categorizeText(OPEN_API_KEY, text.trim());

      // Wait some time because of open ai rate limiters
      // https://platform.openai.com/docs/guides/rate-limits/overview
      await sleep(2500);

      const gpt_tags = summaryResult.choices[0].message.content
        .trim()
        .split(",")
        .map((tag) => tag.trim());

      console.log(gpt_tags);

      // Add gpt summary
      legislationWithAi[legislation.id] = {
        ...(legislationWithAi[legislation.id] || {}),
        gpt_tags,
      };
    }
  }

  writeJSON(`${locale}.legislation.gpt`, legislationWithAi);
};

const getCachedGpt = async (
  locale: Locales
): Promise<Partial<CiviGptLegislationData>> => {
  if (process.env.SKIP_GPT_CACHE === locale) {
    return {};
  }
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
