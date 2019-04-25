import Layout from '@/views/layout/Layout'
const device = {
    path: '/inventory',
    component: Layout,
    meta: { title: '库存管理', icon: 'kucunguanli' },
    children: [
        {
            path: '/inventory/list',
            component: () => import('@/views/inventory/list/index'),
            name: 'inventory_list',
            /* affix: true 一直固定不关闭 */
            meta: { title: '库存管理', noCache: false, affix: false }
        },
        {
            path: '/inventory/detail',
            hidden: true,
            component: () => import('@/views/inventory/detail/index'),
            name: 'inventory_detail',
            /* affix: true 一直固定不关闭 */
            meta: { title: '库存详情', noCache: false, affix: false }
        },
        {
            path: '/inventory/audits',
            hidden: true,
            component: () => import('@/views/inventory/detail/audits/table'),
            /* affix: true 一直固定不关闭 */
            meta: { title: '产品库存记录', noCache: false, affix: false }

        }

    ]
}
export default device