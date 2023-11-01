import { resolve } from 'path'
import uni from "@dcloudio/vite-plugin-uni"
import vitePluginRequire from "vite-plugin-require"
import type { UserConfig, ConfigEnv } from 'vite'

const root = process.cwd()
const pathResolve = (dir : string) => resolve(root, '.', dir)

export default ({ command, mode } : ConfigEnv) : UserConfig => {
	return {
		plugins: [
			uni(), 
			vitePluginRequire({
				fileRegex: /(.jsx?|.tsx?|.vue)$/,
				translateType: "importMetaUrl"
			})
		],
		resolve: {
			alias: [
				{
					find: /\@\//,
					replacement: `${pathResolve('src')}`
				},
				{
					find: "@axios",
					replacement: `${pathResolve('node_modules/axios/lib')}`
				}
			]
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/styles/global.scss";@import "uview-plus/theme.scss";'
				}
			}
		}
	}
}