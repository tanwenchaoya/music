
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
import Loading from './plugin/loading/index'
Vue.use(VueLazyload, {
  // 配置图片还没有加载好的时候的展位图片
  loading: require('./assets/images/logo_163@3x.png')

})
Vue.use(Loading, {
  title: '努力加载中...'
})
fastclick.attach(document.body)
Vue.config.productionTip = false
console.log(store)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
