import request from '@/utils/request'

const url = '/api/admin';

/**
 * 增值功能-数据统计 / 数据汇总
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_SUMMARY(params) {
    return request({
        url: url + "/channels/analytics/summary",
        method: 'get',
        params
    }).then(res => res.data.data)

}


/**
 * 增值功能-数据统计 / 增值渠道订单列表
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_LIST_ORDERS(params) {
    return request({
        url: url + "/channels/orders",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 *  增值功能-数据统计 / 增值渠道列表
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_SELECT(params) {
    return request({
        url: url + "/channels/select",
        method: 'get',
        params
    }).then(res => res.data.data)

}




/**
 *  增值功能-数据统计 / 增值订单详情
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_LIST_ORDERS_DETAIL(params) {
    return request({
        url: url + "/channels/orders/detail",
        method: 'get',
        params
    }).then(res => res.data.data)

}


/**
 *  增值功能-数据统计 / 增值渠道订单总数
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_ORDERS_COUNT(params) {
    return request({
        url: url + "/channels/orders/count",
        method: 'get',
        params
    }).then(res => res.data.data)

}

