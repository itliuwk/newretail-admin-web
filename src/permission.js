import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth'
NProgress.configure({ showSpinner: false }) // NProgress Configuration


router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    if (to.path === '/login') {
        next()
        NProgress.done() // finish progress bar
    } else {
        if (getToken()) {
            store.dispatch('GenerateRoutes').then(routes => {
                next()
            })
        } else {
            next('/login')
        }

    }



})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})