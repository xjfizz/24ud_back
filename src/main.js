// ie polyfill
import '@babel/polyfill'


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import echarts from 'echarts'
import {
  VueAxios
} from './utils/request'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
import './style/reset.less'
// import './core/socket'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
