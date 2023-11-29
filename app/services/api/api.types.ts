export interface BaseResponse<T> {
  data: T[]
  endIndex: number
  startIndex: number
  count: number
  numberOfPages: number
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
