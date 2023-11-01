export type ShowToastIcon = "success" | "loading" | "error" | "none" | "fail" | "exception" | undefined

const useUniFunc = () => {
	const uniToast = async (title: string, icon?: ShowToastIcon) => {
		// if( title && title.length > 7 ) {
		// 	throw new Error('title文本长度不能超过7个文字')
		// }
		await uni.showToast({
			title,
			icon: icon || 'success',
			mask: true
		})
	}

	return {
		uniToast
	}
}

export { useUniFunc }