import axios, { AxiosError } from "axios";
import fs from "fs";
import path from "path";
import { writeJSON } from "../fs/write-file";

function csvToJson(csvArray: Array<string[]>) {
  const headers = csvArray[0];
  const result = [];

  for (let i = 1; i < csvArray.length; i++) {
    const obj: { [k: string]: string } = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = csvArray[i][j];
    }
    result.push(obj);
  }
  return result;
}

const runGoogleSheet = async () => {
  try {
    // Your Google Sheets ID and API key
    const spreadsheetId = "1dEHnMY7KZ2kyQL5lraMNMerTdp3TP37JlF63eJMSXZQ";
    const apiKey = process.env.GOOGLE_SPREADSHEET_API_KEY;
    console.log(apiKey);

    // The range of the data you want to retrieve
    const range = "Sheet1"; // Change it according to your sheet

    // Google Sheets API URL
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    const res = await axios.get(url);
    const json = csvToJson(res.data.values);
    const civiGoogleSheet = parseCiviGoogleSheetJson(json);
    console.log(civiGoogleSheet);
  } catch (e: unknown) {
    handleAxiosError(e);
  }
};

type CiviGoogleSheet = {
  bill_id: string;
  summary: string;
  locale: string;
  date: string;
  tags: string[];
};

type StringKeysOfCiviGoogleSheet = keyof Omit<CiviGoogleSheet, "tags">;

const parseCiviGoogleSheetJson = (json: { [k: string]: string }[]) => {
  const localeDataMap: { [locale: string]: CiviGoogleSheet[] } = {};
  json.forEach((item) => {
    const wikiObj: CiviGoogleSheet = {
      bill_id: "",
      summary: "",
      locale: "",
      date: "",
      tags: [],
    };
    Object.entries(item).forEach(([key, value]) => {
      if (key.startsWith("Tag")) {
        if (value !== undefined) {
          wikiObj.tags = [...wikiObj.tags, key.replace("Tag ", "")];
        }
      } else {
        wikiObj[key as StringKeysOfCiviGoogleSheet] = value;
      }
    });

    if (!localeDataMap[wikiObj.locale]) {
      localeDataMap[wikiObj.locale] = [];
    }
    localeDataMap[wikiObj.locale].push(wikiObj);
  });

  Object.entries(localeDataMap).forEach(([locale, data]) => {
    const fileName = `${locale}.legislation.wiki`;
    const existingData = fs.existsSync(path.join(`${fileName}.json `))
      ? JSON.parse(fs.readFileSync(path.join(`${fileName}.json`), "utf-8"))
      : [];
    const updatedData = [...existingData, ...data];
    writeJSON(fileName, updatedData);
  });
  return json;
};

const isAxiosError = (e: unknown): e is AxiosError => {
  return typeof e === "object" && e !== null && "response" in e;
};

const handleAxiosError = (e: unknown) => {
  console.log("error happened, but exiting gracefully");
  if (isAxiosError(e)) {
    console.log(e?.response?.status, e?.response?.statusText);
  } else {
    console.log(e);
  }
  process.exit(0);
};
runGoogleSheet();
