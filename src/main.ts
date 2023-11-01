import { createSSRApp } from "vue"
import App from "./App.vue"
import uViewPlus from 'uview-plus'
import { setupComponents } from '@/components'
import './permission'

export const createApp = () => {
  const app = createSSRApp(App)
	
	setupComponents(app)
	app.use(uViewPlus)
	
  return {
    app
  }
}
