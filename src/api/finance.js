import request from '@/utils/request'


/**
 * 财务 -- 概览
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function SUMMARY(params) {
    return request({
        url: "/api/admin/settlement/summary",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 财务 -- 交易记录
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function TRANSACTIONS(params) {
    return request({
        url: "/api/admin/settlement/transactions",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 财务 -- 交易记录总数
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function TRANSACTIONS_COUNT(params) {
    return request({
        url: "/api/admin/settlement/transactions/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}

