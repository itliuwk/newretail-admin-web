import Layout from '@/views/layout/Layout'

const order = {
    path: '/orgManage',
    component: Layout,
    meta: {title: '组织管理', icon: 'dingdan', noCache: true, affix: false},
    children: [
        {
            path: '/orgManage/index',
            component: () => import('@/views/orgManage/orgManage/index'),
            name: '组织管理',
            meta: {title: '组织管理', noCache: false, affix: false}
        },
        // {
        //     path: '/order/luckyFree',
        //     component: () => import('@/views/order/luckyFree/index'),
        //     name: '幸运免单',
        //     meta: {title: '幸运免单', noCache: false, affix: false},
        //
        // }
    ]
};

export default order
