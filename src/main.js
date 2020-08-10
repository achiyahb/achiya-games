import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import Vue2TouchEvents from 'vue2-touch-events'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  Vue2TouchEvents,
  render: h => h(App)
}).$mount('#app')
