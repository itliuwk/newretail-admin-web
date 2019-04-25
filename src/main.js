import Vue from 'vue'
import App from './App'
//  CSS resets
import 'normalize.css/normalize.css'
//elementui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueDND from 'awe-dnd'
Vue.use(VueDND)

import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)

import Cookies from 'js-cookie'
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
})

import '@/styles/index.scss'// global css
import './errorLog' // error log
import './icons' // icon
import "./permission" //权限控制
import store from './store'//全局store
import router from './router'

// register global utility filters.
import * as filters from './filters' // global filters
import '@/utils/dom'//全局方法
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
import Directives from './directives'
Vue.use(Directives) //添加下拉框 scroll方法
Vue.config.devtools = true;
window._vm = new Vue({
  el: '#app',
  router,
  store,

  // i18n,
  render: h => h(App)
})
