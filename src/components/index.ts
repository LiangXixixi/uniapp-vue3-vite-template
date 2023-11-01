import GlobalTitle from './GlobalTitle.vue'

import type { App } from 'vue'

const setupComponents = (app: App<Element>) => {
    app.component('GlobalTitle', GlobalTitle)
}

export { setupComponents }