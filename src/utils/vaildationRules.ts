// 验证规则

export const phoneRules = (phone: string): boolean => {
	const rsg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
	
	return rsg.test(phone) ? true : false
}

export const emailRules = (email: string): boolean => {
	const rsg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
	
	return rsg.test(email) ? true : false
}