import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/plugins/vuetify'
import '@/plugins/components'
// import '@/assets/styles/app.scss'
import x2js from 'x2js'

Vue.prototype.$x2js = new x2js()
Vue.config.productionTip = true

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
