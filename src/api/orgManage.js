import request from '@/utils/request'


/**
 * 组织管理 --  组织列表
 * @param params
 * @returns {Q.Promise<any>}
 * @constructor
 */
export function GET_clients(params) {
    return request({
        url: "/api/admin/clients",
        method: 'get',
        params
    }).then(res => res.data.data)
}




/**
 * 组织管理 --  新建组织
 * @param params
 * @returns {Q.Promise<any>}
 * @constructor
 */
export function POST_clients(params) {
    return request({
        url: "/api/admin/clients",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}

/**
 * 组织管理 --  更新组织
 * @param params
 * @returns {Q.Promise<any>}
 * @constructor
 */
export function PUT_clients(params) {
    return request({
        url: "/api/admin/clients?id=" + params.id,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}

/**
 * 组织管理 --  组织详情
 * @param params
 * @returns {Q.Promise<any>}
 * @constructor
 */
export function DETAIL_clients(params) {
    return request({
        url: "/api/admin/clients/detail?id=" + params,
        method: 'get'
    }).then(res => res.data.data)
}
