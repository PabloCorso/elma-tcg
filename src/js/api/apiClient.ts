type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export type ApiClientType = {
  get: (url: string) => Promise<Response>;
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

  return { get };
};

export default ApiClient;
