export interface getCodeType {
	phone: string
}

export interface loginType {
	login_type: number
	phone: string
	phone_code: string
	token: string
	phone_model: string
}

export interface addBurypointType {
	action: string
	type?: string
	user_id: number
}

export interface addPvUvStatisticsType {
	count: number
	key: string
	user_id: number
}