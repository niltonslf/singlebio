import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {HttpRequest, HttpResponse} from '../http-client';

class AxiosHttpClient {
  instance: AxiosInstance;
  token: string = '';

  constructor() {
    this.instance = axios.create({
      baseURL: '',
    });
    this.token = '';
  }

  private async request<T>(params: HttpRequest): Promise<HttpResponse<T>> {
    try {
      const response = await this.instance.request({
        url: params.url,
        method: params.method,
        data: params.body,
        headers: {
          Authorization: `Bearer ${this.token}`,
          ...params?.headers,
        },
        params: params?.params,
      });

      return this.adapt(response);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        console.log('logout');
      }
      throw error.response;
    }
  }

  private adapt(response: AxiosResponse): HttpResponse {
    return {statusCode: response?.status, body: response?.data};
  }

  async get<T = any>(
    url: string,
    headers?: any,
    params?: any,
  ): Promise<HttpResponse<T>> {
    return await this.request<T>({method: 'get', url, headers, params});
  }

  async post<T = any>(
    url: string,
    body?: any,
    headers?: any,
    params?: any,
  ): Promise<HttpResponse<T>> {
    return await this.request<T>({method: 'post', url, headers, params, body});
  }

  async put<T = any>(
    url: string,
    body?: any,
    headers?: any,
    params?: any,
  ): Promise<HttpResponse<T>> {
    return await this.request<T>({method: 'put', url, headers, params, body});
  }

  async patch<T = any>(
    url: string,
    body?: any,
    headers?: any,
    params?: any,
  ): Promise<HttpResponse<T>> {
    return await this.request<T>({method: 'patch', url, headers, params, body});
  }

  async delete<T = any>(
    url: string,
    headers?: any,
    params?: any,
  ): Promise<HttpResponse<T>> {
    return await this.request<T>({method: 'delete', url, headers, params});
  }

  axios(): AxiosInstance {
    return axios.create({});
  }
}

const httpClient = new AxiosHttpClient();
export {httpClient};
