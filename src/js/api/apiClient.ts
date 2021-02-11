type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export type ApiClientType = {
  get: (url: string) => Promise<Response>;
  post: (url: string, body: unknown) => Promise<Response>;
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

  return { get, post };
};

export default ApiClient;
