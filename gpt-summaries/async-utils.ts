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
