import Vue from 'vue'
import Vuex from 'vuex'
import './plugins'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuex)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
