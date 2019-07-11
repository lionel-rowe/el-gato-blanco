import { fetchJSON } from "@/utils/fetch-json";

export const orderService = {
  getById: async (id: string): Promise<FetchResponse<IOrder>> => {
    return await fetchJSON(`/api/orders/${id}`);
  },

  create: async (): Promise<FetchResponse<IOrder>> => {
    const options = {
      method: "POST",
      body: { lineItems: [] }
    };

    return await fetchJSON("/api/orders", options);
  }
};
