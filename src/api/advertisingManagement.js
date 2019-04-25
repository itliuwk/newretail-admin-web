import request from '@/utils/request'

const url = '/api/admin';

/**
 * 广告计划--获取列表
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_LIST(params) {
    return request({
        url: url + "/ad/plans",
        method: 'get',
        params
    }).then(res => res.data.data)

}


/**
 * 广告计划--新建广告
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function POST_LIST(params) {
    return request({
        url: url + "/ad/plans",
        method: 'post',
        data:params
    }).then(res => res.data.data)


}

/**
 * 广告计划--更新广告
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PUT_LIST(params) {
    return request({
        url: url + "/ad/plans?id=" + params.id,
        method: 'put',
        data:params
    }).then(res => res.data.data)

}


/**
 * 广告计划--广告详情 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_LIST(params) {
    return request({
        url: url + "/ad/plans/detail",
        method: 'get',
        params
    }).then(res => res.data.data)

}


/**
 * 广告计划--删除某项
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DELETE_ITEM(params) {
    return request({
        url: url + "/ad/plans",
        method: 'delete',
        params: {
            id: params
        }
    }).then(res => res.data.data)

}

/**
 * 广告计划--发布广告
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PUBLISH(params) {
    return request({
        url: url + "/ad/plans/publish",
        method: 'post',
        params
    }).then(res => res.data.data)
}


/**
 * 广告计划--暂停
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PAUSEDANDPENDING(params) {
    return request({
        url: url + "/ad/plans/pause",
        method: 'post',
        params
    }).then(res => res.data.data)
}

/**
 * 广告计划--获取设备类型
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function EQUIPMENTTYPE(params) {
    return request({
        url: url + "/devices/types",
        method: 'get',
        params
    }).then(res => res.data.data)
}



/**
 * 广告计划--获取广告位类型
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function ADVERTISINGSPACETYPE(params) {
    return request({
        url: url + "/ad/plans/adSpaces",
        method: 'get',
        params
    }).then(res => res.data.data)
}



/**
 * 广告计划--获取设备
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function EQUIPMENT(params) {
    return request({
        url: url + "/devices",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 广告计划-- 列表总数
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DEVICES_COUNT(params) {
    return request({
        url: url + "/ad/plans/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}




/**
 * 素材管理--列表
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_RESOURCES(params) {
    return request({
        url: url + "/ad/resources",
        method: 'get',
        params
    }).then(res => res.data.data)
}




/**
 * 素材管理--上传
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function POST_RESOURCES(params) {
    return request({
        url: url + "/ad/resources",
        method: 'post',
        data:params
    }).then(res => res.data.data)
}



/**
 * 素材管理--删除
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DELETE_RESOURCES(params) {
    return request({
        url: url + "/ad/resources",
        method: 'delete',
        data:params
    }).then(res => res.data.data)
}


