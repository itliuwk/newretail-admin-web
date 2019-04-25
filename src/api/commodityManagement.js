import request from '@/utils/request'


/**
 * 商品列表--获取列表
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_LIST(params) {
    return request({
        url: "/api/admin/products",
        method: 'get',
        params
    }).then(res => res.data.data)

}


/**
 * 商品列表--新建商品
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function ADD_ITEM(params) {
    return request({
        url: "/api/admin/products",
        method: 'post',
        data: params
    }).then(res => res.data.data)

}


/**
 * 商品列表--更新商品
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function UPDATE_ITEM(params) {
    return request({
        url: "/api/admin/products?id=" + params.id,
        method: 'put',
        data: params
    }).then(res => res.data.data)

}


/**
 * 商品列表--商品详情
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_ITEM(params) {
    return request({
        url: "/api/admin/products/detail",
        method: 'get',
        params
    }).then(res => res.data.data)

}


/**
 * 商品列表--删除
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DELETE_ITEM(params) {
    return request({
        url: "/api/admin/products",
        method: 'delete',
        params
    }).then(res => res.data.data)

}


/**
 * 商品列表--总数
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function COUNT(params) {
    return request({
        url: "/api/admin/products/count",
        method: 'get',
        params
    }).then(res => res.data.data)

}


/**
 * 商品分类--列表
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_LIST_CATEGORIES(params) {
    return request({
        url: "/api/admin/categories",
        method: 'get',
        params
    }).then(res => res.data.data)

}


/**
 * 商品分类--新建分类
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function POST_CATEGORIES(params) {
    return request({
        url: "/api/admin/categories",
        method: 'post',
        data: params
    }).then(res => res.data.data)

}


/**
 * 商品分类--更新分类
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function UPDATE_CATEGORIES(params) {
    return request({
        url: "/api/admin/categories?id=" + params.id,
        method: 'put',
        data: params
    }).then(res => res.data.data)

}


/**
 * 商品分类--更新分类顺序
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function ORDERS_CATEGORIES(params) {
    return request({
        url: "/api/admin/categories/orders?ids=" + params.ids.toString(),
        method: 'POST',
        data: params
    }).then(res => res.data.data)

}


/**
 * 商品分类--设置分类商品
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PRODUCTS_CATEGORIES(params) {
    return request({
        url: "/api/admin/categories/products",
        method: 'POST',
        data: params
    }).then(res => res.data.data)

}


/**
 * 商品分类--删除分类
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DELETE_CATEGORIES(params) {
    return request({
        url: "/api/admin/categories",
        method: 'delete',
        params
    }).then(res => res.data.data)

}


/**
 * 商品分类--删除分类商品
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DELETE_CATEGORIES_PRODUCTS(params) {
    return request({
        url: "/api/admin/categories/products",
        method: 'delete',
        params
    }).then(res => res.data.data)

}






