import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

// 注册全局组件
import meta from '@/components/metaphor/index'

createApp(App).mount('#app')
const app = createApp(App)
app.use(router)
app.use(store)
// app.use(VueAxios,axios)
app.use(meta)

app.mount('#app')
