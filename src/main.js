import Vue from 'vue'
import Routes from './routes'
import App from './App.vue'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

export const eventBus = new Vue()

new Vue({
  vuetify,
  render: h => h(App),
  router: Routes
}).$mount('#app')
