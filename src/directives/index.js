import Vue from 'vue'
// register globally
import Sticky from 'vue-sticky-directive'
Vue.use(Sticky)

export default () => {

    Vue.directive('scroll', {
        bind(el, binding) {
            // 获取滚动页面DOM
            let SCROLL_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
            let scrollPosition = 0
            SCROLL_DOM.addEventListener('scroll', function () {
                // 当前的滚动位置 减去  上一次的滚动位置
                // 如果为true则代表向上滚动，false代表向下滚动
                let flagToDirection = this.scrollTop - scrollPosition > 0
                // 记录当前的滚动位置
                scrollPosition = this.scrollTop
                const LIMIT_BOTTOM = 100
                // 记录滚动位置距离底部的位置
                let scrollBottom = this.scrollHeight - (this.scrollTop + this.clientHeight) < LIMIT_BOTTOM
                // 如果已达到指定位置则触发
                if (scrollBottom) {
                    // 将滚动行为告诉组件
                    binding.value(flagToDirection)
                }
            })
        }
    })
}