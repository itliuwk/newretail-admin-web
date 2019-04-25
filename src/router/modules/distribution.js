import Layout from '@/views/layout/Layout'

const commodityManagement = {
    path: '/distribution',
    component: Layout,
    meta: {title: '分润管理', icon: 'gongxiang', noCache: true, affix: false},
    children: [
        {
            path: '/distribution/equipment',
            component: () => import('@/views/distribution/equipment/index'),
            name: '设备分润',
            meta: {title: '设备分润', noCache: false, affix: false}
        },
        {
            path: '/distribution/field',
            component: () => import('@/views/distribution/field/index'),
            name: '场地分润',
            meta: {title: '场地分润', noCache: false, affix: false},

        }
    ]
};

export default commodityManagement
