import service from '@/config/axios/service'
import { config } from '@/config/axios/config'

const { defaultHeaders } = config

const request = (option : AxiosConfig) => {
	const { url, method, params, data, headersType, responseType } = option
	return service.request({
		url,
		method,
		params,
		data,
		responseType,
		headers: {
			'Content-Type': headersType || defaultHeaders
		}
	})
}

export default {
	get: <T = any>(option : AxiosConfig) => {
		return request({ method: 'get', ...option }) as Promise<IResponse<T>>
	},
	post: <T = any>(option : AxiosConfig) => {
		return request({ method: 'post', ...option }) as Promise<IResponse<T>>
	},
	delete: <T = any>(option : AxiosConfig) => {
		return request({ method: 'delete', ...option }) as Promise<IResponse<T>>
	},
	put: <T = any>(option : AxiosConfig) => {
		return request({ method: 'put', ...option }) as Promise<IResponse<T>>
	},
	// 取消请求
	cancelRequest: (url : string | string[]) => {
		return service.cancelRequest(url)
	},
	//取消全部请求
	cancelAllRequest: () => {
		return service.cancelAllRequest()
	}
}