import Vue from 'vue'
// import store from './store'

//全局状态下 捕获异常，避免崩盘  在开发环境不需要捕获
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function(err, vm, info, a) {
    Vue.nextTick(() => {
     /*  store.dispatch('addErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      }) */
      console.error(err, info)
    })
  }
}
