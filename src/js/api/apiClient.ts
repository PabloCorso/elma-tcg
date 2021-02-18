type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

type ApiParams = { [key: string]: string | number };

export type ApiClientType = {
  get: (url: string) => Promise<Response>;
  post: (url: string, body: unknown) => Promise<Response>;
  put: (url: string, body: unknown) => Promise<Response>;
  del: (url: string) => Promise<Response>;
};

const ApiClient = (fetch: Fetch) => {
  const get = async (url: string) => {
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  };

  const post = async (url: string, body: unknown) => {
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const put = async (url: string, body: unknown) => {
    return fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  const del = async (url: string) => {
    return fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });
  };

  return { get, post, put, del };
};

const addParamsToUrl = (url: string, params: ApiParams) => {
  let result = url;
  let paramEntries = Object.entries(params);
  for (let i = 0; i < paramEntries.length; i++) {
    const [key, value] = paramEntries[i];
    const isFirst = i === 0;
    const prefix = isFirst ? "?" : "&";
    result += `${prefix}${key}=${value}`;
  }

  return result;
};

export default ApiClient;
