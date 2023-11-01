// 支付宝支付
export const alipayPayment = (data: any): Promise<any> => {
	return new Promise((reslove, reject) => {
		uni.requestPayment({
			provider: "alipay",
			orderInfo: data,
			success: (res) => {
				// 支付成功
				if( JSON.parse(res.rawdata).resultStatus === '9000' ) {
					reslove(res)
				}
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}