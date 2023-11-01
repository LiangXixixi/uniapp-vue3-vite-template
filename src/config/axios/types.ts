import type { AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from "axios"

export type AxiosHeaders = 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data'
export type AxiosMethod = 'get' | 'post' | 'delete' | 'put'
export type AxiosResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'
export interface RequestInterceptors<T> {
    // 请求拦截
    requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
    requestInterceptorsCatch?: (err: any) => any
    // 响应拦截
    responseInterceptors?: (config: T) => T
    responseInterceptorsCatch?: (err: any) => any
}
export interface AxiosConfig<T = AxiosResponse> {
    baseUrl: {
        dev: string
        pro: string
        test: string
    }
    code: number
    defaultHeaders: AxiosHeaders
    timeout: number
    interceptors: RequestInterceptors<T>
}
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: RequestInterceptors<T>
}