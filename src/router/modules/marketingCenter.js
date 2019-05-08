import Layout from '@/views/layout/Layout'

const marketingCenter = {
    path: '/marketingCenter',
    component: Layout,
    meta: {title: '营销中心', icon: 'yunyingguanli', noCache: true, affix: false},
    children: [
        {
            path: '/marketingCenter/couponManagement',
            component: () => import('@/views/marketingCenter/couponManagement/index'),
            name: '优惠券管理',
            /* affix: true 一直固定不关闭 */
            meta: {title: '优惠券管理', noCache: false, affix: false}
        },
        {
            path: '/marketingCenter/couponManagement/couponDetails',
            component: () => import('@/views/marketingCenter/couponManagement/couponDetails'),
            name: '优惠券新增/编辑',
            hidden: true,
            /* affix: true 一直固定不关闭 */
            meta: {title: '优惠券新增/编辑', noCache: false, affix: false}
        },
        {
            path: '/marketingCenter/noviceCourtesy',
            component: () => import('@/views/marketingCenter/noviceCourtesy/index'),
            name: '新手有礼',
            /* affix: true 一直固定不关闭 */
            meta: {title: '新手有礼', noCache: false, affix: false}
        },
        {
            path: '/marketingCenter/noviceCourtesy/noviceCourtesyDetails',
            component: () => import('@/views/marketingCenter/noviceCourtesy/noviceCourtesyDetails'),
            name: '新手有礼新增/编辑',
            hidden: true,
            /* affix: true 一直固定不关闭 */
            meta: {title: '新手有礼新增/编辑', noCache: false, affix: false}
        },
        {
            path: '/marketingCenter/paymentOfCourtesy',
            component: () => import('@/views/marketingCenter/paymentOfCourtesy/index'),
            name: '支付有礼',
            /* affix: true 一直固定不关闭 */
            meta: {title: '支付有礼', noCache: false, affix: false}
        },
        {
            path: '/marketingCenter/paymentOfCourtesy/paymentOfCourtesyDetails',
            component: () => import('@/views/marketingCenter/paymentOfCourtesy/paymentOfCourtesyDetails'),
            name: '支付有礼新增/编辑',
            hidden: true,
            /* affix: true 一直固定不关闭 */
            meta: {title: '支付有礼新增/编辑', noCache: false, affix: false}
        },
        {
            path: '/marketingCenter/salesPromotion',
            component: () => import('@/views/marketingCenter/salesPromotion/index'),
            name: '促销活动',
            /* affix: true 一直固定不关闭 */
            meta: {title: '促销活动', noCache: false, affix: false}
        },
        {
            path: '/marketingCenter/salesPromotion/salesPromotionDetails',
            component: () => import('@/views/marketingCenter/salesPromotion/salesPromotionDetails'),
            name: '促销活动新增/编辑',
            hidden: true,
            /* affix: true 一直固定不关闭 */
            meta: {title: '促销活动新增/编辑', noCache: false, affix: false}
        },
        {
            path: '/marketingCenter/luckyFree',
            component: () => import('@/views/marketingCenter/luckyFree/index'),
            name: '幸运免单',
            /* affix: true 一直固定不关闭 */
            meta: {title: '幸运免单', noCache: false, affix: false}
        },
        {
            path: '/marketingCenter/luckyFree/luckyFreeDetails',
            component: () => import('@/views/marketingCenter/luckyFree/luckyFreeDetails'),
            name: '幸运免单新增/编辑',
            hidden: true,
            /* affix: true 一直固定不关闭 */
            meta: {title: '幸运免单新增/编辑', noCache: false, affix: false}
        },
        {
            path: '/marketingCenter/luckyDraw',
            component: () => import('@/views/marketingCenter/luckyDraw/index'),
            name: '抽奖活动',
            /* affix: true 一直固定不关闭 */
            meta: {title: '抽奖活动', noCache: false, affix: false}
        },
        {
            path: '/marketingCenter/luckyDraw/luckyDrawDetails',
            component: () => import('@/views/marketingCenter/luckyDraw/luckyDrawDetails'),
            name: '抽奖活动新增/编辑',
            hidden: true,
            /* affix: true 一直固定不关闭 */
            meta: {title: '抽奖活动新增/编辑', noCache: false, affix: false}
        },
    ]
};
export default marketingCenter
