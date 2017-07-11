// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  axios,
  router,
  store,
  template: '<App/>',
  components: {App}
});
