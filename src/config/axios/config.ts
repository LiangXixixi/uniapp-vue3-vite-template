import qs from 'qs'
import { useUniFunc } from "@/hooks/useUniFunc"
// import { loginOut } from '@/utils/loginOut'
import type { AxiosConfig } from './types'
import type { InternalAxiosRequestConfig, AxiosRequestHeaders, AxiosError, AxiosResponse } from 'axios'

// 不需要loading白名单
const noLoadingWhite: string[] = ['/app/add/burypoint', '/app/user/detailinfo', '/getVersionNumber', '/admin/addor/update/pvuv', '/app/prop/list', '/user/add/pvuv', '/app/ai/ask', '/app/ai/listAITemplate', '/app/ai/listAIKnow', '/app/ai/incrAIChatMessageCount', '/app/ai/refreshAIToken']
const uniFunc = useUniFunc()
const config : AxiosConfig = {
	baseUrl: {
		dev: "",
		pro: "",
		test: ""
	},
	code: 0,
	defaultHeaders: 'application/json',
	interceptors: {
		requestInterceptors: config => config,
		responseInterceptors: (result : AxiosResponse) => result
	},
	timeout: 60000
}
let loading = false

const defaultRequestInterceptors = (config : InternalAxiosRequestConfig) => {
	const token = uni.getStorageSync('token')
	
	if( !noLoadingWhite.includes(config.url as string) && !loading ){
		uni.showLoading({
			mask: true,
			title: '拼命加载中...'
		})
		loading = true
	}
	
	if (token) config.headers['token'] = token
	
	if (
		config.method === 'post' && (config.headers as AxiosRequestHeaders)['Content-Type'] === 'application/x-www-form-urlencoded'
	) {
		config.data = qs.stringify(config.data)
	}
	if (config.method === 'get' && config.params) {
		let url = config.url as string
		url += '?'
		const keys : string[] = Object.keys(config.params)
		for (const key of keys) {
			if (config.params[key] !== void 0 && config.params[key] !== null) {
				url += `${key}=${encodeURIComponent(config.params[key])}&`
			}
		}
		url = url.substring(0, url.length - 1)
		config.params = {}
		config.url = url
	}

	return config
}
const errorRequestInterceptors = async (error : AxiosError) => {
	if( loading ){
		uni.hideLoading()
		loading = false
	}
	await Promise.reject(error)
}

const defaultResponseInterceptors = async (response : AxiosResponse<any>) => {
	if( loading ){
		uni.hideLoading()
		loading = false
	}
	
	// 判断是否是文件流
	if (response?.config?.responseType === 'blob') {
		return response
	} else if (response.data.code === config.code) {
		return response.data
	} else if (response.data.error_code == 110 || response.data.error_code == 111) {
		return response
	} else if ( response.data.code ===  403) {
		uni.showModal({
			showCancel: false,
			content: response.data.error,
			success: () => {
				// 清空本地缓存token跳转到登录页
				uni.setStorageSync('token', '')
				uni.redirectTo({
					url: '/pages/login/index'
				})
			}
		})
	}
	else {
		await uniFunc.uniToast(response.data.error, 'error')
	}
}
const errorResponseInterceptors = async (error : AxiosError) => {
	if( loading ){
		uni.hideLoading()
		loading = false
	}
	
	await uniFunc.uniToast(error.message, 'error')
	console.log(error)
	return Promise.reject(error)
}

export { config, defaultRequestInterceptors, errorRequestInterceptors, defaultResponseInterceptors, errorResponseInterceptors }