import { fetchJSON } from "@/utils/fetch-json";

export const productService = {
  getAll: async (): Promise<FetchResponse<IProduct[]>> => {
    return await fetchJSON(`/api/products`);
  }
};
