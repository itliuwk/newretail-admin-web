import request from '@/utils/request'


/**
 *  todo 优惠券API 
 */

/**
 * 优惠券 -- 列表
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_couponManagement_LIST(params) {
    return request({
        url: "/api/admin/coupons",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 优惠券 -- 新建
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function POST_coupons(params) {
    return request({
        url: "/api/admin/coupons",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 优惠券 -- 更新
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PUT_coupons(params) {
    return request({
        url: "/api/admin/coupons?id=" + params.id,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}

/**
 * 优惠券 -- 详情
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_coupons(params) {
    return request({
        url: "/api/admin/coupons/detail?id=" + params,
        method: 'get',
        data: params
    }).then(res => res.data.data)
}

/**
 * 优惠券 -- 删除
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DELETE_coupons(params) {
    return request({
        url: "/api/admin/coupons?id=" + params,
        method: 'delete',
        data: params
    }).then(res => res.data.data)
}


/**
 * 优惠券 -- 总数
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function COUNT_coupons(params) {
    return request({
        url: "/api/admin/coupons/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}

/**
 * 优惠券 -- 开始投放
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function ENABLE_coupons(params) {
    return request({
        url: "/api/admin/coupons/enable?id=" + params,
        method: 'post'
    }).then(res => res.data.data)
}

/**
 * 优惠券 -- 暂停投放
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DISABLE_coupons(params) {
    return request({
        url: "/api/admin/coupons/disable?id=" + params,
        method: 'post'
    }).then(res => res.data.data)
}

/**
 * 优惠券 -- 调整库存
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function updateStock_coupons(params) {
    return request({
        url: "/api/admin/coupons/updateStock",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 *  TODO 新手有礼API
 */


/**
 * 新手有礼 -- 列表
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_couponOffers_LIST(params) {
    return request({
        url: "/api/admin/couponOffers",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 新手有礼 -- 新建
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function POST_couponOffers(params) {
    return request({
        url: "/api/admin/couponOffers",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 新手有礼 -- 更新
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PUT_couponOffers(params) {
    return request({
        url: "/api/admin/couponOffers?id=" + params.id,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}

/**
 * 新手有礼 -- 详情
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_couponOffers(params) {
    return request({
        url: "/api/admin/couponOffers/detail?id=" + params,
        method: 'get',
        data: params
    }).then(res => res.data.data)
}

/**
 * 新手有礼 -- 删除
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DELETE_couponOffers(params) {
    return request({
        url: "/api/admin/couponOffers?id=" + params,
        method: 'delete'
    }).then(res => res.data.data)
}


/**
 * 新手有礼 -- 总数
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function COUNT_couponOffers(params) {
    return request({
        url: "/api/admin/couponOffers/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 新手有礼 -- 失效
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function disable_couponOffers(params) {
    return request({
        url: "/api/admin/couponOffers/disable?id=" + params,
        method: 'post'
    }).then(res => res.data.data)
}


/**
 *  TODO 支付有礼API
 */


/**
 * 支付有礼 -- 列表
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_payGiftOffers_LIST(params) {
    return request({
        url: "/api/admin/payGiftOffers",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 支付有礼 -- 新建
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function POST_payGiftOffers(params) {
    return request({
        url: "/api/admin/payGiftOffers",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 支付有礼 -- 更新
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PUT_payGiftOffers(params) {
    return request({
        url: "/api/admin/payGiftOffers?id="+ params.id,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}

/**
 * 支付有礼 -- 详情
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_payGiftOffers(params) {
    return request({
        url: "/api/admin/payGiftOffers/detail?id=" + params,
        method: 'get',
        data: params
    }).then(res => res.data.data)
}

/**
 * 支付有礼 -- 删除
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DELETE_payGiftOffers(params) {
    return request({
        url: "/api/admin/payGiftOffers?id=" + params,
        method: 'delete'
    }).then(res => res.data.data)
}


/**
 * 支付有礼 -- 总数
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function COUNT_payGiftOffers(params) {
    return request({
        url: "/api/admin/payGiftOffers/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}



/**
 * 支付有礼 -- 失效
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function disable_payGiftOffers(params) {
    return request({
        url: "/api/admin/payGiftOffers/disable?id=" + params,
        method: 'post'
    }).then(res => res.data.data)
}





/**
 *  TODO 促销活动API
 */


/**
 * 促销活动 -- 列表
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_discountOffers_LIST(params) {
    return request({
        url: "/api/admin/discountOffers",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 促销活动 -- 新建
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function POST_discountOffers(params) {
    return request({
        url: "/api/admin/discountOffers",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 促销活动 -- 更新
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PUT_discountOffers(params) {
    return request({
        url: "/api/admin/discountOffers?id="+ params.id,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}

/**
 * 促销活动 -- 详情
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_discountOffers(params) {
    return request({
        url: "/api/admin/discountOffers/detail?id=" + params,
        method: 'get',
        data: params
    }).then(res => res.data.data)
}

/**
 * 促销活动 -- 删除
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DELETE_discountOffers(params) {
    return request({
        url: "/api/admin/discountOffers?id=" + params,
        method: 'delete'
    }).then(res => res.data.data)
}


/**
 * 促销活动 -- 总数
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function COUNT_discountOffers(params) {
    return request({
        url: "/api/admin/discountOffers/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}



/**
 * 促销活动 -- 失效
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function disable_discountOffers(params) {
    return request({
        url: "/api/admin/discountOffers/disable?id=" + params,
        method: 'post'
    }).then(res => res.data.data)
}





/**
 *  TODO 幸运免单API
 */


/**
 * 幸运免单 -- 列表
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_luckfree_LIST(params) {
    return request({
        url: "/api/admin/luckfree",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 幸运免单 -- 新建
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function POST_luckfree(params) {
    return request({
        url: "/api/admin/luckfree",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 幸运免单 -- 更新
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PUT_luckfree(params) {
    return request({
        url: "/api/admin/luckfree?id="+ params.id,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}

/**
 * 幸运免单 -- 详情
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_luckfree(params) {
    return request({
        url: "/api/admin/luckfree/detail?id=" + params,
        method: 'get',
        data: params
    }).then(res => res.data.data)
}

/**
 * 幸运免单 -- 删除
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DELETE_luckfree(params) {
    return request({
        url: "/api/admin/luckfree?id=" + params,
        method: 'delete'
    }).then(res => res.data.data)
}


/**
 * 幸运免单 -- 总数
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function COUNT_luckfree(params) {
    return request({
        url: "/api/admin/luckfree/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}



/**
 * 幸运免单 -- 失效
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function disable_luckfree(params) {
    return request({
        url: "/api/admin/luckfree/disable?id=" + params,
        method: 'post'
    }).then(res => res.data.data)
}




/**
 * 幸运免单 -- 计算
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function luckfree_calculate(params) {
    return request({
        url: "/api/admin/luckfree/calculate",
        method: 'post',
        data:params
    }).then(res => res.data.data)
}






/**
 *  TODO 抽奖活动API
 */


/**
 * 抽奖活动 -- 列表
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_lottery_LIST(params) {
    return request({
        url: "/api/admin/lottery",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 抽奖活动 -- 新建
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function POST_lottery(params) {
    return request({
        url: "/api/admin/lottery",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 抽奖活动 -- 更新
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PUT_lottery(params) {
    return request({
        url: "/api/admin/lottery?id="+ params.id,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}

/**
 * 抽奖活动 -- 详情
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_lottery(params) {
    return request({
        url: "/api/admin/lottery/detail?id=" + params,
        method: 'get',
        data: params
    }).then(res => res.data.data)
}

/**
 * 抽奖活动 -- 删除
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DELETE_lottery(params) {
    return request({
        url: "/api/admin/lottery?id=" + params,
        method: 'delete'
    }).then(res => res.data.data)
}


/**
 * 抽奖活动 -- 总数
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function COUNT_lottery(params) {
    return request({
        url: "/api/admin/lottery/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}



/**
 * 抽奖活动 -- 失效
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function disable_lottery(params) {
    return request({
        url: "/api/admin/lottery/disable?id=" + params,
        method: 'post'
    }).then(res => res.data.data)
}



