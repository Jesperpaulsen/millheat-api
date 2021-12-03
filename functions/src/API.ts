import { Mill } from "./mill";
import axios from "axios";

export class API {
  baseUrl = "https://api.millheat.com/";
  mill: Mill;

  constructor(mill: Mill) {
    this.mill = mill;
  }

  readonly doRequest = async <T>(
    method: "post" | "put" | "get",
    url: string,
    {
      auth,
      headers,
      data,
    }: {
      auth?: boolean;
      headers?: { [key: string]: string };
      data?: any;
    } = {}
  ) => {
    const tmpHeaders = headers || {};
    if (auth) {
      tmpHeaders["access_token"] = this.mill.authenticator.accessToken || "";
    }
    if (url.startsWith("/")) {
      throw new Error(`Don't pass in / at the beginning of the URL: ${url}`);
    }
    // @ts-ignore
    const res = await axios[method](`${this.baseUrl}${url}`, {
      headers: tmpHeaders,
      data,
    });
    return res.data?.data as T;
  };
}
