export type Method = "post" | "POST";

export type HTTPRequestHeaders = Record<string, string>;

export interface HTTPRequestConfig<D = any> {
  url?: string;
  method?: Method;
  baseURL?: string;
  headers?: HTTPRequestHeaders;
  params?: any;
  data?: D;
  timeout?: number;
}

export type HTTPResponseHeaders = Record<string, string> & {
  "set-cookie"?: string[];
};

export interface HTTPClientResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: HTTPResponseHeaders;
  config: HTTPRequestConfig<D>;
  request?: any;
}

export interface IHTTPClient {
  post<T = any, R = HTTPClientResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: HTTPRequestConfig<D>
  ): Promise<R>;
}
