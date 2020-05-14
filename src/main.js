import Vue from 'vue'
import App from './App.vue'
import Routes from './routes'
import vuetify from './plugins/vuetify'

import store from './store'

Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  vuetify,
  render: h => h(App),
  router: Routes,
  store
}).$mount('#app')
