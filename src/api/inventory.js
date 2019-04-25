import request from '@/utils/request'

export function get_list(params) {
    return request({
        url: "/api/admin/inventory",
        method: 'get',
        params
    }).then(res => res.data.data)
}
export function get_list_total(params) {
    return request({
        url: "/api/admin/inventory/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function get_total_stock(params) {
    return request({
        url: "/api/admin/inventory/totalStock",
        method: 'get',
        params
    }).then(res => res.data.data)
}
export function get_list_in_locations(params) {
    return request({
        url: "/api/admin/inventory/stockLocations",
        method: 'get',
        params
    }).then(res => res.data.data)
}
export function get_list_in_locations_total(params) {
    return request({
        url: "/api/admin/inventory/stockLocations/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function post_stockin(params) {
    return request({
        url: "/api/admin/inventory/stockin",
        method: 'post',
        data: params,
    }).then(res => res.data.data)
}
export function post_return(params) {
    return request({
        url: "/api/admin/inventory/return",
        method: 'post',
        data: params,
    }).then(res => res.data.data)
}
export function post_transfer(params) {
    return request({
        url: "/api/admin/inventory/transfer",
        method: 'post',
        data: params,
    }).then(res => res.data.data)
}

export function get_list_audits(params) {
    return request({
        url: "/api/admin/inventory/audits",
        method: 'get',
        params,
    }).then(res => res.data.data)
}
export function get_list_audits_total(params) {
    return request({
        url: "/api/admin/inventory/audits/count",
        method: 'get',
        params,
    }).then(res => res.data.data)
}

export function get_audits_detail(id) {
    return request({
        url: `/api/admin/inventory/audits/detail?id=${id}`,
        method: 'get',
        // params,
    }).then(res => res.data.data)
}

