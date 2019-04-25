import Layout from '@/views/layout/Layout'

const commodityManagement = {
    path: '/commodityManagement',
    component: Layout,
    meta: {title: '商品管理', icon: 'shangpinguanli', noCache: true, affix: false},
    children: [
        {
            path: '/commodityManagement/productList',
            component: () => import('@/views/commodityManagement/productList/index'),
            name: '商品列表',
            meta: {title: '商品列表', noCache: false, affix: false}
        },
        {
            path: '/commodityManagement/commodityClassification',
            component: () => import('@/views/commodityManagement/commodityClassification/index'),
            name: '商品分类',
            meta: {title: '商品分类', noCache: false, affix: false},

        }
    ]
};

export default commodityManagement
