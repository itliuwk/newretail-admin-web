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
                title: '货道列表', noCache: false, affix: false
            },
        },
        {
            path: '/shelfs/status',
            component: () => import('@/views/shelfs/status'),
            name: "shelfs_status",
            meta: { title: '货道状态', noCache: false, affix: false },
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