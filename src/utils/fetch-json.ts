const API_BASE_URL = "http://localhost:5000";

export class FetchError extends Error {
  constructor(message: string, status?: number) {
    super(message);
    if (status) {
      this.status = status;
    }
    this.name = "FetchError";
  }

  public status: number;
}

export const fetchJSON = async (
  path: string,
  options: any = {}
): Promise<FetchResponse<any>> => {
  options.method = options.method || "GET";
  options.headers = options.headers || {};
  options.headers["Content-Type"] = "application/json";
  options.body = JSON.stringify(options.body);

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, options);

    if (res.ok) {
      const data = await res.json();

      return {
        res,
        data
      };
    } else {
      throw new FetchError(res.statusText || "Fetch Error", res.status);
    }
  } catch (e) {
    throw new FetchError("Fetch Error", -1);
  }
};
