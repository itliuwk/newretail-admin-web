import request from '@/utils/request'

/**
 *  货道补货 -- 酒店售货机 and  自助售货机 详情
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function GET_DEVICEINFO(params) {
    return request({
        url: "/api/admin/restocks/deviceInfo?deviceId=" + params,
        method: 'get',
    }).then(res => res.data.data)
}


/**
 *  货道补货 -- 酒店售货机 and 自助售货机 开门补货
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function POST_RESTOCKS(params) {
    return request({
        url: "/api/admin/restocks?deviceId=" + params.deviceId,
        method: 'post',
        data:params
    }).then(res => res.data.data)
}


/**
 *  货道补货 --   一键开门
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function POST_OPENDOOR(params) {
    return request({
        url: "/api/admin/quxia/remote/openDoors?deviceId=" + params.deviceId,
        method: 'post',
        data:params
    }).then(res => res.data.data)
}



/**
 *  货道补货 --   酒店售货机 确认补货
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function POST_RESTOCKS_UPDATE(params) {
    return request({
        url: "/api/admin/restocks/update?deviceId=" + params.deviceId,
        method: 'post',
        data:params
    }).then(res => res.data.data)
}










