// 白名单
const whiteList = ['/pages/login/index', '/pages/my/expense', '/pages/my/agreements']

const hasPermission = (url : string) : Boolean => {
	const isLogin = Boolean(uni.getStorageSync('token'))

	// 白名单或者登录成功允许访问
	if (whiteList.includes(url) || isLogin) {
		return true
	}
	return false
}

// 添加普通页面拦截器
uni.addInterceptor('navigateTo', {
	invoke: (e) => {
		if (!hasPermission(e.url)) {
			uni.reLaunch({
				url: '/pages/login/index'
			})
			return false
		}
		return true
	}
})
// 添加tabbar拦截器
uni.addInterceptor('switchTab', {
	invoke: (e) => {
		if (!hasPermission(e.url)) {
			uni.reLaunch({
				url: '/pages/login/index'
			})
			return false
		}
		return true
	}
})