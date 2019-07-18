import { FetchError } from "@/utils/fetch-json";

export default (e: Error): string => {
  if (e instanceof FetchError) {
    if (e.status === -1) {
      return 'An error occurred while fetching data.';
    }

    return [e.status, e.message].filter(Boolean).join(" | ");
  } else {
    return 'An unknown error occurred.';
  }
};
