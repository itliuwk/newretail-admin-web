import Layout from '@/views/layout/Layout'

const commodityManagement1 = {
    path: '/commodityManagement1',
    component: Layout,
    meta: {title: '商品管理', icon: 'shangpinguanli', noCache: true, affix: false},
    children: [
        {
            path: '/commodityManagement1/commodityManagement1',
            component: () => import('@/views/commodityManagement/commodityClassification1/index'),
            name: '商品分类',
            meta: {title: '商品分类', noCache: false, affix: false},

        }
    ]
};

export default commodityManagement1
