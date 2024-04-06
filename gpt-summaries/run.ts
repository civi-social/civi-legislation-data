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

  let skippedBillCount = 0;

  for (const legislation of legislations) {
    console.log("\n\n\n");
    console.log("summarizing legislation", legislation.id, legislation.title);

    const shouldSkipCache = process.env.SKIP_GPT_CACHE === locale;
    const cachedSummary = cachedGpt[legislation.id]?.gpt_summary;
    const cachedTags = cachedGpt[legislation.id]?.gpt_tags;
    const cachedTagsExist = Array.isArray(cachedTags) && cachedTags.length > 0;

    // We only want to summarize resolutions for now, as there are a lot of other bills
    // that would make this expensive from an OPEN AI perspective, and also
    // a lot of these bills don't need summaries
    const isNotResolution =
      locale === "chicago" && legislation.classification !== "resolution";

    if (isNotResolution) {
      skippedBillCount++;
      continue;
    }

    // generate summaries
    if (!shouldSkipCache && cachedSummary) {
      console.log("using cached summarization");
      legislationWithAi[legislation.id] = {
        ...(legislationWithAi[legislation.id] || {}),
        gpt_summary: cachedSummary,
      };
    } else {
      // pass a combo of the title and the description to open ai.
      const text = legislation.title + "\n" + legislation.description;

      let gpt_summary = await summarizeText(text);
      if (!gpt_summary) {
        if (cachedSummary) {
          gpt_summary = cachedSummary;
          console.log("could not get get summary. using cache");
        } else {
          gpt_summary = "";
          console.log("could not get get summary or cache.");
        }
      }

      console.log("summarized", gpt_summary);

      // Add gpt summary
      legislationWithAi[legislation.id] = {
        ...(legislationWithAi[legislation.id] || {}),
        gpt_summary,
      };
    }

    // generate tags
    if (!shouldSkipCache && cachedTagsExist) {
      console.log("using cached tags");
      legislationWithAi[legislation.id] = {
        ...(legislationWithAi[legislation.id] || {}),
        gpt_tags: cachedGpt[legislation.id]?.gpt_tags,
      };
    } else {
      // pass a combo of the title and the description to open ai.
      const text = legislation.title + "\n" + legislation.description;

      console.log("tagging legislation");

      let gpt_tags = await categorizeText(text.trim());

      if (!gpt_tags) {
        if (cachedTagsExist) {
          gpt_tags = cachedTags;
          console.log("could not get get summary. using cache");
        } else {
          gpt_tags = [];
          console.log("could not get get summary or cache.");
        }
      }

      console.log(gpt_tags);

      // Add gpt summary
      legislationWithAi[legislation.id] = {
        ...(legislationWithAi[legislation.id] || {}),
        gpt_tags,
      };
    }
  }

  if (skippedBillCount > 0) {
    console.log(
      `Skipped running gpt on ${skippedBillCount} local ordinances to save on API costs.`
    );
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
