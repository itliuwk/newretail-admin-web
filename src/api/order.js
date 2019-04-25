import request from '@/utils/request'


/**
 * 销售订单 -- 列表
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_ORDER_LIST(params) {
    return request({
        url: "/api/admin/orders",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 销售订单 -- 订单详情
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_ORDER(params) {
    return request({
        url: "/api/admin/orders/detail",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 销售订单 -- 订单总数
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function COUNT_ORDER(params) {
    return request({
        url: "/api/admin/orders/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}

