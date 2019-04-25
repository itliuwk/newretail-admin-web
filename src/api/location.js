import request from '@/utils/request'

export function getLocationList(params) {
    return request({
        url: '/api/admin/locations',
        method: 'get',
        params
    }).then(res => res.data.data)
}
export function addLocaltion(params) {
    return request({
        url: '/api/admin/locations',
        method: 'post',
        data: params
    }).then(res => res.data.data)
}
export function updateLocaltion(params) {
    return request({
        url: `/api/admin/locations?id=${params.id}`,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}
export function deleteLocaltion(params) {
    return request({
        url: '/api/admin/locations',
        method: 'delete',
        data: params,
        params
    }).then(res => res.data.data)
}
export function localtionDetail(id) {
    return request({
        url: '/api/admin/locations/detail',
        method: 'get',
        params: { id }
    }).then(res => res.data.data)
}
export function addDevices2localtion(params) {
    return request({
        url: '/api/admin/locations/addDevices',
        method: 'post',
        data: params
    }).then(res => res.data.data)
}
export function deleteDevices2localtion(params) {
    return request({
        url: '/api/admin/locations/deleteDevice',
        method: 'post',
        data: params,
        params
    }).then(res => res.data.data)
}
export function getLocaltionTotal(params) {
    return request({
        url: '/api/admin/locations/count',
        method: 'get',
        params
    }).then(res => res.data.data)
}