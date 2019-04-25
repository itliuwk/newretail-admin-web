import request from '@/utils/request'

/**
 *  设备分润 -- 列表
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function GET_EQUIPMENT_LIST(params) {
    return request({
        url: "/api/admin/deviceRoyalties",
        method: 'get',
        params
    }).then(res => res.data.data)
}

/**
 *  设备分润 -- 保存分润
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function POST_EQUIPMENT_LIST(params) {
    return request({
        url: "/api/admin/deviceRoyalties",
        method: 'post',
        data:params
    }).then(res => res.data.data)
}

/**
 *  设备分润 -- 分润详情
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function DETAIL_EQUIPMENT_LIST(params) {
    return request({
        url: "/api/admin/deviceRoyalties/detail",
        method: 'get',
        params
    }).then(res => res.data.data)
}

/**
 *  设备分润 -- 分润总数
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function COUNT_EQUIPMENT_LIST(params) {
    return request({
        url: "/api/admin/deviceRoyalties/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 *  设备分润 -- 生效
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function ENABLE_EQUIPMENT_LIST(params) {
    return request({
        url: "/api/admin/deviceRoyalties/enable",
        method: 'post',
        params
    }).then(res => res.data.data)
}


/**
 *  设备分润 -- 失效
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function DISABLE_EQUIPMENT_LIST(params) {
    return request({
        url: "/api/admin/deviceRoyalties/disable",
        method: 'post',
        params
    }).then(res => res.data.data)
}





/**
 *  场地分润 -- 列表
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function GET_FIELD_LIST(params) {
    return request({
        url: "/api/admin/locationRoyalties",
        method: 'get',
        params
    }).then(res => res.data.data)
}

/**
 *  场地分润 -- 保存分润
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function POST_FIELD_LIST(params) {
    return request({
        url: "/api/admin/locationRoyalties",
        method: 'post',
        data:params
    }).then(res => res.data.data)
}

/**
 *  场地分润 -- 分润总数
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function COUNT_FIELD_LIST(params) {
    return request({
        url: "/api/admin/locationRoyalties/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}

/**
 *  场地分润 -- 分润详情
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function DETAIL_FIELD_LIST(params) {
    return request({
        url: "/api/admin/locationRoyalties/detail",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 *  场地分润 -- 生效
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function ENABLE_FIELD_LIST(params) {
    return request({
        url: "/api/admin/locationRoyalties/enable",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 *  场地分润 -- 失效
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function DISABLE_FIELD_LIST(params) {
    return request({
        url: "/api/admin/locationRoyalties/disable",
        method: 'get',
        params
    }).then(res => res.data.data)
}





