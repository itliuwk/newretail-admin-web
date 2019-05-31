import Layout from '@/views/layout/Layout'

const valueAddedManagement = {
    path: '/valueAddedManagement',
    component: Layout,
    meta: {title: '增值管理', icon: 'guanggaoguanli', noCache: true, affix: false},
    children: [
        {
            path: '/valueAddedAtatistics/index',
            component: () => import('@/views/valueAddedManagement/valueAddedAtatistics/index'),
            name: '增值统计',
            meta: {title: '增值统计', noCache: false, affix: false}
        },
        {
            path: '/valueAddedAtatistics/channelDetails',
            component: () => import('@/views/valueAddedManagement/valueAddedAtatistics/channelDetails'),
            hidden:true,
            name: '渠道详情',
            meta: {title: '渠道详情', noCache: false, affix: false},

        },
        {
            path: '/advertisingManagement/orderDetails',
            component: () => import('@/views/valueAddedManagement/valueAddedAtatistics/orderDetails'),
            hidden:true,
            name: '订单详情',
            meta: {title: '订单详情', noCache: false, affix: false},

        },
        {
            path: '/distributionSettings/index',
            component: () => import('@/views/valueAddedManagement/distributionSettings/index'),
            name: '分润设置',
            meta: {title: '分润设置', noCache: false, affix: false},

        },
    ]
};

export default valueAddedManagement
