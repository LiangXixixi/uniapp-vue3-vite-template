import { loginOutApi } from '@/api/login'

export const loginOut = async () => {
	await loginOutApi()
	
	// 清空本地缓存token跳转到登录页
	uni.setStorageSync('token', '')
	uni.reLaunch({
		url: '/pages/login/index'
	})
}