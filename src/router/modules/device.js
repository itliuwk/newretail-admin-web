import Layout from '@/views/layout/Layout'
const device = {
    path: '/device',
    component: Layout,
    meta: { title: '设备管理', icon: 'shebeiguanli1-copy', noCache: true, affix: false },
    children: [
        {
            path: '/device/list',
            component: () => import('@/views/device/list/index'),
            name: '设备列表',
            /* affix: true 一直固定不关闭 */
            meta: { title: '设备列表', noCache: false, affix: false }
        },
        {
            path: '/device/list/edit',
            component: () => import('@/views/device/list/edit'),
            hidden: true,
            name: '设备编辑',
            /* affix: true 一直固定不关闭 */
            meta: { title: '设备编辑', noCache: false, affix: false }
        },
        {
            path: '/device/group',
            component: () => import('@/views/device/group/index'),
            name: 'device_group_list',
            /* affix: true 一直固定不关闭 */
            meta: { title: '设备分组列表', noCache: false, affix: false }
        },
        // {
        //     path: '/device/map',
        //     component: () => import('@/views/device/map/index'),
        //     name: '机器地理图',
        //     /* affix: true 一直固定不关闭 */
        //     meta: { title: '机器地理图', noCache: false, affix: false }
        // },
        // {
        //     path: '/device/fault',
        //     component: () => import('@/views/device/fault/index'),
        //     name: '机器故障',
        //     /* affix: true 一直固定不关闭 */
        //     meta: { title: '机器故障', noCache: false, affix: false }
        // },
    ]
}
export default device