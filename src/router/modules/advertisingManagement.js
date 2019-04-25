import Layout from '@/views/layout/Layout'

const advertisingManagement = {
    path: '/advertisingManagement',
    component: Layout,
    meta: {title: '广告管理', icon: 'guanggaoguanli', noCache: true, affix: false},
    children: [
        {
            path: '/advertisingManagement/materialManagement',
            component: () => import('@/views/advertisingManagement/materialManagement/index'),
            name: '素材管理',
            meta: {title: '素材管理', noCache: false, affix: false}
        },
        {
            path: '/advertisingManagement/advertisingPlan',
            component: () => import('@/views/advertisingManagement/advertisingPlan/index'),
            name: '广告计划',
            meta: {title: '广告计划', noCache: false, affix: false},

        },
        {
            path: '/advertisingManagement/advertisingPlan/opiModel',
            component: () => import('@/views/advertisingManagement/advertisingPlan/opiModel'),
            hidden:true,
            name: '计划增加/查看',
            meta: {title: '广告计划增加/查看', noCache: false, affix: false},

        }
    ]
};

export default advertisingManagement
