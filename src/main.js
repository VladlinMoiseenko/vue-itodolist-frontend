import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import router from './router'
import store from './store'
import 'babel-polyfill'

Vue.use(Vuetify);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
