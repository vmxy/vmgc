import { getServiceEnvConfig } from "~/.env-config";
import { createRequest } from "./request";

//const { url, proxyPattern } = getServiceEnvConfig(import.meta.env);
//const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === "Y";
/* export const request = createRequest({
  baseURL: isHttpProxy ? proxyPattern : url,
}); */

const API_SERVER = import.meta.env.VITE_API_SERVER || globalThis.API_SERVER || "";
const useMock = import.meta.env.VITE_MOCK == "Y";
let baseURL = useMock ? "/mock" : "/api";
baseURL = API_SERVER ? API_SERVER.replace(/\/+$/i, "") + baseURL : baseURL;
//console.info("API_SERVER", API_SERVER);

export const realRequest = createRequest({ baseURL: baseURL });
export const mockRequest = createRequest({ baseURL: "/mock" });
export const request = useMock ? mockRequest : realRequest;
