import axios from "axios"
import { config, defaultRequestInterceptors, errorRequestInterceptors, defaultResponseInterceptors, errorResponseInterceptors } from "@/config/axios/config"
import settle from '@axios/core/settle.js'
import buildURL from '@axios/helpers/buildURL.js'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { RequestConfig } from "@/config/axios/types"

const { baseUrl } = config
const vite_base_url: 'dev' | 'pro' | 'test' = import.meta.env.VITE_API_BASE_PATH
const PAHT_URL = baseUrl[vite_base_url]
const abortControllerMap: Map<string, AbortController> = new Map()

const axiosInstance: AxiosInstance = axios.create({
  ...config,
  // #ifdef APP-PLUS
	baseURL: ``
  // #endif

  // #ifdef H5
  baseURL: `${PAHT_URL}/userapp/api/v1`
  // #endif
})
// 更改axios默认适配器
axiosInstance.defaults.adapter = (config) => {
  return new Promise<AxiosResponse<string | AnyObject | ArrayBuffer>>((resolve, reject) => {
    uni.request({
      method: config.method!.toUpperCase(),
      url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: config.sslVerify,
      timeout: config.timeout,
      complete: function complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config
        }

        settle(resolve, reject, response)
      }
    })
  })
}

axiosInstance.interceptors.request.use(defaultRequestInterceptors, errorRequestInterceptors)
axiosInstance.interceptors.response.use(defaultResponseInterceptors, errorResponseInterceptors)


const service = {
  request: (config: RequestConfig) => {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors?.requestInterceptors(config as any)
      }

      axiosInstance.request(config).then(res => resolve(res)).catch(err => reject(err))
    })
  },
  cancelRequest: (url: string | string[]) => {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url of urlList) {
      abortControllerMap.get(_url)?.abort()
      abortControllerMap.delete(_url)
    }
  },
  cancelAllRequest() {
    for (const [_, controller] of abortControllerMap) {
      controller.abort()
    }
    abortControllerMap.clear()
  }
}

export default service