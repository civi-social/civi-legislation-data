import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const postWithRetry = async <T extends object>(
  url: string,
  body: object,
  config: AxiosRequestConfig,
  retries = 3
): Promise<T> => {
  try {
    const response = await axios.post<T>(url, body, config);
    return response.data;
  } catch (e: unknown) {
    const error = e as AxiosError<T>;
    if (error.response && error.response.status === 429 && retries > 0) {
      const waitTime = Math.pow(2, 4 - retries) * 5000; // Exponential backoff with max wait time of 8 seconds
      console.log(
        `Too Many Requests. Retrying in ${waitTime / 1000} seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return await postWithRetry(url, body, config, retries - 1);
    } else {
      throw error;
    }
  }
};

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

export const postTextCompletions = async (content: string) => {
  const OPEN_API_KEY = process.env.OPEN_API_KEY;
  if (!process.env.OPEN_API_KEY) {
    console.error("Need to provide OPEN_API_KEY as environment var");
    process.exit(0);
  }
  const summary = await postWithRetry<Gpt35TurboReturn>(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content,
        },
      ],
      max_tokens: 60,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPEN_API_KEY}`,
      },
    }
  );

  // Wait some time because of open ai rate limiters
  // https://platform.openai.com/docs/guides/rate-limits/overview
  await sleep(2500);

  return summary.choices[0].message.content;
};
