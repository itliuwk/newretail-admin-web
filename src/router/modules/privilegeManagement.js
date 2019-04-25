import Layout from '@/views/layout/Layout'

const commodityManagement = {
    path: '/privilegeManagement',
    component: Layout,
    meta: {title: '权限管理', icon: 'shouquanguanli', noCache: true, affix: false},
    children: [
        {
            path: '/privilegeManagement/account',
            component: () => import('@/views/privilegeManagement/account/index'),
            name: '账户管理',
            meta: {title: '账户管理', noCache: false, affix: false}
        },
        {
            path: '/privilegeManagement/role',
            component: () => import('@/views/privilegeManagement/role/index'),
            name: '角色管理',
            meta: {title: '角色管理', noCache: false, affix: false},

        },
        {
            path: '/privilegeManagement/role/permissions',
            component: () => import('@/views/privilegeManagement/role/permissions'),
            hidden:true,
            name: '新增角色',
            meta: {title: '新增角色', noCache: false, affix: false},

        },
        {
            path: '/privilegeManagement/account/opiModel',
            component: () => import('@/views/privilegeManagement/account/opiModel'),
            hidden:true,
            name: '用户增加/查看',
            meta: {title: '用户增加/查看', noCache: false, affix: false},

        }
    ]
};

export default commodityManagement
