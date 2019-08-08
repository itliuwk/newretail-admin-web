import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
import Layout from '@/views/layout/Layout'

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/errorPage/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/errorPage/401'),
        hidden: true
    },
    {
        path: '/',
        redirect: '/dashboard/index'
    },
    {
        path: '/dashboard',
        component: Layout,
        children: [
            {
                path: '/dashboard/index',
                component: () => import('@/views/dashboard/index'),
                name: '首页',
                /* affix: true 一直固定不关闭 */
                meta: { title: '首页', icon: 'yemian-copy', noCache: true, affix: true }
            },
        ]
    },
    /* inject new router */
    require("./modules/orgManage.js").default,
    require("./modules/device.js").default,
    require("./modules/shelfs.js").default,
    require("./modules/location.js").default,
    require("./modules/inventory.js").default,
    require("./modules/advertisingManagement.js").default,
    require("./modules/commodityManagement.js").default,
    require("./modules/privilegeManagement.js").default,
    require("./modules/distribution.js").default,
    require("./modules/marketingCenter.js").default,
    require("./modules/valueAddedManagement.js").default,
    require("./modules/order.js").default,
    { path: '*', redirect: '/404', hidden: true }

];


const router = new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});
export default router
