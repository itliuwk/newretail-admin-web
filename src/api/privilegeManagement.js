import request from '@/utils/request'


/**
 * 账户管理 -- 账户列表
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_ACCOUNT_LIST(params) {
    return request({
        url: "/api/admin/accounts",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 账户管理 -- 新建账号
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function ADD_ACCOUNT_LIST(params) {
    return request({
        url: "/api/admin/accounts",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 账户管理 -- 更新账号
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function UPDATE_ACCOUNT_LIST(params) {
    return request({
        url: "/api/admin/accounts?id=" + params.id,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}


/**
 * 账户管理 -- 启用账号
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function ENABLE_ACCOUNT_LIST(params) {
    return request({
        url: "/api/admin/accounts/enable?id=" + params.id,
        method: 'POST',
        data: params
    }).then(res => res.data.data)
}


/**
 * 账户管理 -- 禁用账号
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DISABLE_ACCOUNT_LIST(params) {
    return request({
        url: "/api/admin/accounts/disable?id=" + params.id,
        method: 'POST',
        data: params
    }).then(res => res.data.data)
}


/**
 * 账户管理 -- 删除账号
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DELETE_ACCOUNT_LIST(params) {
    return request({
        url: "/api/admin/accounts",
        method: 'delete',
        params
    }).then(res => res.data.data)
}


/**
 * 账户管理 -- 账号详情
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_ACCOUNT_LIST(params) {
    return request({
        url: "/api/admin/accounts/detail",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 账户管理 -- 修改密码
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PASSWORD_ACCOUNT_LIST(params) {
    return request({
        url: "/api/admin/accounts/changePassword?id=" + params.id + '&password=' + params.password,
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 账户管理 -- 列表总数
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function COUNT_ACCOUNT_LIST(params) {
    return request({
        url: "/api/admin/accounts/count?clientId=" + params,
        method: 'get',
        data: params
    }).then(res => res.data.data)
}


/**
 * 角色管理 -- 列表
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function ROLES_LIST(params) {
    return request({
        url: "/api/admin/roles",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 角色管理 -- 列表筛选
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function ROLES_SEL(params) {
    return request({
        url: "/api/admin/roles/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 角色管理 -- 新建角色
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function ROLES_POST(params) {
    return request({
        url: "/api/admin/roles",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 角色管理 -- 更新角色
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function ROLES_PUT(params) {
    return request({
        url: "/api/admin/roles?id=" + params.id,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}


/**
 * 角色管理 -- 删除角色
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function ROLES_DELETE(params) {
    return request({
        url: "/api/admin/roles",
        method: 'delete',
        params
    }).then(res => res.data.data)
}






