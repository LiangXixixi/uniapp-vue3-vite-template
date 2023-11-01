import { ref } from 'vue'
import { getAppLatestVersion } from '@/api/global'

const useAppUpload = () => {
	const progressRef = ref<string>('')
	const downloadUrl = ref<string>('')
	
	// 获取本地版号
	const getLocalVersion = (): Promise<string> => {
		return new Promise((resolve) => {
			plus.runtime.getProperty((plus.runtime.appid as string), (widgetInfo) => {
				const version = widgetInfo.version
				resolve(version as string)
			})
		})
	}
	// 获取最新版号以及安装包下载链接
	const getLatestVersion = (): Promise<string> => {
		return new Promise(async (resolve, reject) => {
			try {
				const { data } = await getAppLatestVersion()
				
				downloadUrl.value = data.url
				resolve(data.version)
			}catch(error){
				reject(error)
			}
		})
	}
	// 比较版号
	const checkVersion = async (): Promise<boolean> => {
		const localVersion = await getLocalVersion()
		const latestVersion = await getLatestVersion()
		
		if( localVersion === latestVersion ) return true
		
		return false
	}
	// 提示更新
	const updatePackageTips = () => {
		uni.showModal({
			title: '检测到有版本更新',
			confirmText: '立即升级',
			showCancel: false,
			success: () => {
				downloadPackage(downloadUrl.value)
			}
		})
	}
	// 创建下载任务下载安装包
	const downloadPackage = (downloadUrl: string) => {
		const task: PlusDownloaderDownload = plus.downloader.createDownload(downloadUrl, {}, (res, status) => {
			if( status === 200 ) {
				plus.runtime.install(res.filename as string, {
					force: false
				}, () => {
					plus.runtime.restart()
				})
			}
		})
		
		onProgress(task)
		task.start()
	}
	// 下载进度提示
	const onProgress = (task: PlusDownloaderDownload) => {
		task.addEventListener('statechanged', (e: any) => {
			if( e && e.downloadedSize > 0 ) {
				const progress = ((e.downloadedSize / e.totalSize) * 100).toFixed(2)
				// console.log(progress, 'progress')
				progressRef.value = progress
			}
		}, false)
	}
	
	return {
		progressRef,
		downloadUrl,
		checkVersion,
		updatePackageTips
	}
}

export { useAppUpload }