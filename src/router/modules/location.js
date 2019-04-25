import Layout from '@/views/layout/Layout'
const route = {
    path: '/location',
    component: Layout,
    meta: { title: '场地管理', icon: 'changdiguanli', noCache: true, affix: false },
    rediect: '/location/list',
    children: [
        {
            path: '/location/list',
            component: () => import('@/views/location/list'),
            name: 'localtion_list',
            /* affix: true 一直固定不关闭 */
            meta: { title: '场地管理', noCache: false, affix: false }
        },
        {
            path: '/location/add-device',
            hidden: true,
            component: () => import('@/views/location/AddDevice2location'),
            name: 'localtion_addDevice2localtion',
            /* affix: true 一直固定不关闭 */
            meta: { title: '场地添加设备', noCache: false, affix: false }
        },
    ]
}
export default route