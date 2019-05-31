import Layout from '@/views/layout/Layout'
const route = {
    path: '/shelfs',
    component: Layout,
    redirect: '/shelfs/index',
    meta: { title: '货道管理', icon: 'shebeiguanli' },
    children: [
        {
            path: '/shelfs/index',
            component: () => import('@/views/shelfs/list'),
            name: "shelfs_list",
            meta: {
                title: '货道模板', noCache: false, affix: false
            },
        },
        {
            path: '/shelfs/status',
            component: () => import('@/views/shelfs/status'),
            name: "shelfs_status",
            meta: { title: '设备货道', noCache: false, affix: false },
        },
        {
            path: '/shelfs/replenishment',
            component: () => import('@/views/shelfs/replenishment'),
            name: "shelfs_replenishment",
            meta: { title: '货道补货', noCache: false, affix: false },
        },
        {
            path: '/shelfs/replenishment/quxia',
            hidden: true,
            component: () => import('@/views/shelfs/replenishment/quxia'),
            name: "shelfs_quxia",
            meta: { title: '货道补货-酒店售货机', noCache: false, affix: false },
        },
        {
            path: '/shelfs/replenishment/quxia-vm',
            hidden: true,
            component: () => import('@/views/shelfs/replenishment/quxia-vm'),
            name: "shelfs_quxia-vm",
            meta: { title: '货道补货-自助售货机', noCache: false, affix: false },
        },
        {
            path: '/shelfs/detail',
            hidden: true,
            component: () => import('@/views/shelfs/detail'),
            name: "shelfs_detail",
            meta: { title: '货道详情', noCache: false, affix: false },
        },
        {
            path: '/shelfs/putaway',
            hidden: true,
            component: () => import('@/views/shelfs/list/putawayShelf/putawayShelf'),
            name: "shelfs_list_putaway",
            meta: { title: '货道上架', noCache: false, affix: false },
        },
        {
            path: '/shelfs/add',
            hidden: true,
            component: () => import('@/views/shelfs/add'),
            name: "shelfs_list_add",
            meta: { title: '新增货道方案', noCache: false, affix: false },
        },

    ]
}
export default route
