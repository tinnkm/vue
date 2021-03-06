// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import layout from './components/Layout.vue'
import router from './router'
import iView from 'iview'
import VueResource from 'vue-resource'
import Store from '@/store/index'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
Vue.use(VueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: Store,
  template: '<layout/>',
  components: { layout }
})
