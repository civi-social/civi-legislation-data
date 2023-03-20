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
import { categorizeText, summarizeText } from "./prompts";

const generateGptSummaries = async (locale: Locales) => {
  const cachedGpt = await getCachedGpt(locale);
  const legislations = await getLegislation(locale);

  // JSON to save
  const legislationWithAi = {} as CiviGptLegislationData;

  for (const legislation of legislations) {
    console.log("\n\n\n");
    console.log("summarizing legislation", legislation.id, legislation.title);

    // generate summaries
    if (cachedGpt[legislation.id] && cachedGpt[legislation.id]?.gpt_summary) {
      console.log("using cached summarization");
      legislationWithAi[legislation.id] = {
        ...(legislationWithAi[legislation.id] || {}),
        gpt_summary: cachedGpt[legislation.id]?.gpt_summary,
      };
    } else {
      // pass a combo of the title and the description to open ai.
      const text = legislation.title + "\n" + legislation.description;

      const gpt_summary = await summarizeText(text);

      console.log("summarized", gpt_summary);

      // Add gpt summary
      legislationWithAi[legislation.id] = {
        ...(legislationWithAi[legislation.id] || {}),
        gpt_summary,
      };
    }

    // generate tags
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

      const gpt_tags = await categorizeText(text.trim());

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

const getLegislation = async (locale: Locales) => {
  const jsonStr = fs.readFileSync(
    path.join(__dirname, `../dist_legislation/${locale}.legislation.json`),
    "utf8"
  );
  const legislations = JSON.parse(jsonStr) as CiviLegislationData[];
  return legislations;
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
      await generateGptSummaries(locale);
    }
  } catch (e) {
    console.log("error happened, but exiting gracefully");
    console.log(e);
    process.exit(0);
  }
};

runGpt();
