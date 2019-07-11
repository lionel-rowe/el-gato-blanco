const API_BASE_URL = "http://localhost:5000";

export const fetchJSON = async (
  path: string,
  options: any = {}
): Promise<FetchResponse<any>> => {
  options.method = options.method || "GET";
  options.headers = options.headers || {};
  options.headers["Content-Type"] = "application/json";
  options.body = JSON.stringify(options.body);

  const res = await fetch(`${API_BASE_URL}${path}`, options);

  if (res.ok) {
    const data = await res.json();

    return {
      res,
      data
    };
  } else {
    throw new Error(
      [res.status, res.statusText]
        .filter(Boolean)
        .map(el => `${el}`)
        .join(" | ") || "Unknown Error"
    );
  }
};
