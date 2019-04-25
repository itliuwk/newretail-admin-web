import Layout from '@/views/layout/Layout'

const finance = {
    path: '/finance',
    component: Layout,
    redirect: '/finance/index',
    meta: {title: '财务', icon: 'caiwu', noCache: true, affix: false},
    children: [
        {
            path: '/finance/index',
            component: () => import('@/views/finance/index'),
            name: "finance_list",
            meta: {title: '财务', icon: 'caiwu', noCache: true, affix: false},
        },
    ]
};

export default finance
