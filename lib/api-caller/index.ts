import { setSuccess, setFetchFail } from "@/lib/utils/remote-data";

type Method = "GET" | "POST";

type ParamType<P> = { method: Method; url: string; payload?: P };

class ApiCaller {
  private normalizeError = (err: unknown | any) => {
    if (err instanceof Error) {
      return err;
    }

    return new Error("Unknown error occurred");
  };

  // Ignored for test coverage as it is private function.
  /* istanbul ignore next */
  private resolveFetchAction = async <T, P = any>({
    method,
    url,
    payload,
  }: ParamType<P>) => {
    try {
      const defaultOptions = payload ? { body: JSON.stringify(payload) } : {};

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        ...defaultOptions,
      });

      const { status } = response;

      // 499 is our own BE error response
      if (status < 200 || status >= 300) {
        // Define error message
        return setFetchFail(new Error("Operation fail"));
      }

      try {
        const result = await response.json();
        return setSuccess<T>(result);
      } catch (error) {
        return setFetchFail(this.normalizeError(error));
      }
    } catch (error) {
      return setFetchFail(this.normalizeError(error));
    }
  };

  GET = async <T>(url: string) => {
    return this.resolveFetchAction<T>({ method: "GET", url });
  };

  POST = async <T, P>(url: string, payload: P) => {
    return this.resolveFetchAction<T, P>({ method: "POST", url, payload });
  };
}

export const apiCaller = new ApiCaller();
