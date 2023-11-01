//格式化处理

//格式化日期-时间 "2023-09-26T08:07:37.229838Z"=>"2023-09-26 18:00:14"
export const formatDate = (data : string): string => {
	// 将日期字符串转为 Date 对象
	const date = new Date(data)
	
	// 获取年、月、日、时、分、秒
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')
	
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const parseQueryString = (url : string) => {
	const params = {}
	const keys = url.match(/([^?&]+)(?==)/g)
	const values = url.match(/(?<==)([^&]*)/g)
	
	for (const index in keys) {
		// @ts-ignore
		params[keys[index]] = values[index]
	}
	
	return params
}