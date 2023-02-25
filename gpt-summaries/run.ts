import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";
import fs, { writeFile } from "fs";
import path from "path";
import { CiviLegislationData, locales, Locales } from "../api";
import { writeJSON } from "../scraper/writeFile";
import axiosRetry from "axios-retry";

if (!process.env.OPEN_API_KEY) {
  console.error("Need to provide OPEN_API_KEY as environment var");
  process.exit(1);
}
const OPEN_API_KEY = process.env.OPEN_API_KEY;

type OpenAiReturn = {
  choices: { text: string }[];
};

async function summarizeText(
  apiKey: string,
  text: string
): Promise<OpenAiReturn> {
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
}

async function postWithRetry<T extends object>(
  url: string,
  body: object,
  config: AxiosRequestConfig,
  retries = 3
): Promise<T> {
  try {
    const response = await axios.post<T>(url, body, config);
    return response.data;
  } catch (e: unknown) {
    const error = e as AxiosError<T>;
    if (error.response && error.response.status === 429 && retries > 0) {
      const waitTime = Math.pow(2, 4 - retries) * 30000; // Exponential backoff with max wait time of 8 seconds
      console.log(
        `Too Many Requests. Retrying in ${waitTime / 1000} seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return await postWithRetry(url, body, config, retries - 1);
    } else {
      throw error;
    }
  }
}

const legislationAddSummaries = async (locale: Locales) => {
  const jsonStr = fs.readFileSync(
    path.join(__dirname, `../dist_legislation/${locale}.legislation.json`),
    "utf8"
  );
  const legislations = JSON.parse(jsonStr) as CiviLegislationData[];
  const legislationWithAi = [] as CiviLegislationData[];

  for (const legislation of legislations) {
    const text = legislation.title + "\n" + legislation.description;

    const s = await summarizeText(OPEN_API_KEY, text.trim());

    legislationWithAi.push({
      ...legislation,
      summaries: {
        gpt: s.choices[0].text.trim(),
      },
    });
  }

  writeJSON(`${locale}.legislation`, legislationWithAi);
};

locales.forEach((locale) => {
  legislationAddSummaries(locale);
});
