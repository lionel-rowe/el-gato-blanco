import { fetchJSON } from "@/utils/fetch-json";

export const categoryService = {
  getAll: async (): Promise<FetchResponse<ICategory[]>> => {
    return await fetchJSON(`/api/categories`);
  },
};
