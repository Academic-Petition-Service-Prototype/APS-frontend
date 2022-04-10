import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios';

import vuetify from './plugins/vuetify'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#ff7674',
};

// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2, options);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')