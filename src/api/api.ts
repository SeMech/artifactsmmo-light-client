import { paths } from '@/types/artifactsmmo-openapi-scheme';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type Options = {
  query?: Record<string, string|number>,
  path?: Record<string, string|number>
}

class Api {
  private static _instance: Api;
  private http: AxiosInstance;
  token: string | null = null;

  constructor() {
    this.http = axios.create({
      baseURL: 'https://api.artifactsmmo.com',
      headers: {
        Accept: 'application/json'
      }
    })
  }

  static getInstance() {
    if (!Api._instance) {
      Api._instance = new Api()
    }

    return Api._instance
  }

  static buildUrl(url: string, options?: Options): string {
    const queryParams = new URLSearchParams()
    let prepapredUrl = url

    if (options) {
      const { query, path } = options
      if (query) {
        Object.keys(query).forEach(key => {
          queryParams.append(key, query[key].toString())
        })
      }
      if (path) {
        Object.keys(path).forEach(key => {
          prepapredUrl = prepapredUrl.replace(`{${key}}`, path[key].toString())
        })
      }
    }

    return `${prepapredUrl}?${queryParams.toString()}`
  }

  setAuthToken(token: string|null) {
    this.token = token
  }

  async get<Res = unknown>(url: keyof paths, options: Options, headers?: AxiosRequestConfig['headers']) {
    return this.http.get<Res>(Api.buildUrl(url, options), {
      headers
    })
  }

  async privateGet<Res = unknown>(url: keyof paths, options: Options, headers?: AxiosRequestConfig['headers']) {
    return this.get<Res>(url, options, Object.assign({
      Authorization: `Bearer ${this.token}`
    }, headers))
  }
}

const api = Api.getInstance()

export default api;
