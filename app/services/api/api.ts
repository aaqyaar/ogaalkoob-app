/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { getGeneralApiProblem } from "./apiProblem"
import type { ApiConfig } from "./api.types"
import { load, remove } from "app/utils/storage"
import { AuthState } from "app/models"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 7000000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })

    this.apisauce.addResponseTransform((response: ApiResponse<any>) => {
      if (response.data.message === "jwt expired") {
        remove("authStore")
      }

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return Promise.reject(problem)
      }

      return response
    })
  }

  private request = async <T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    data?: any,
    headers?: any,
  ): Promise<T> => {
    const authStore = load<AuthState>("authStore")
    const token = authStore?.state.token

    const response = await this.apisauce.any({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    })

    if (!response.ok) {
      console.error(`Error calling ${method} ${url}`, response.problem)
      const problem = getGeneralApiProblem(response)
      if (problem) throw problem
    }

    return response.data as T
  }

  get = <T>(url: string, data?: any, headers?: any): Promise<T> =>
    this.request<T>("GET", url, headers)

  post = <T>(url: string, data?: any, headers?: any): Promise<T> =>
    this.request<T>("POST", url, data, headers)

  put = <T>(url: string, data?: any, headers?: any): Promise<T> =>
    this.request<T>("PUT", url, data, headers)

  patch = <T>(url: string, data?: any, headers?: any): Promise<T> =>
    this.request<T>("PATCH", url, data, headers)

  delete = <T>(url: string, data?: any, headers?: any): Promise<T> =>
    this.request<T>("DELETE", url, data, headers)
}

// Singleton instance of the API for convenience
export const api = new Api()
