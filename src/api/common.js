import request from '@/utils/request'

export function GET_DEVICE_TYPES(params) {
    return request({
        url: "/api/admin/devices/types",
        method: 'get',
        params
    }).then(res => res.data.data)
}


export function GET_DEVICE_DEVICEGROUPS(params) {
    return request({
        url: "/api/admin/deviceGroups/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function GET_LOCATIONS(params) {
    return request({
        url: "/api/admin/locations/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}


export function GET_COUPONS(params) {
    return request({
        url: "/api/admin/coupons/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}


export function GET_VIPVARDS(params) {
    return request({
        url: "/api/admin/vipCards/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}


export function GET_ROLES(params) {
    return request({
        url: "/api/admin/roles/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function GET_DEVICE_GROUPS_TOTAL(params) {
    return request({
        url: "/api/admin/deviceGroups/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function GET_DEIVCE_GROUPS_ALL(total) {
    return request({
        url: "/api/admin/deviceGroups",
        method: 'get',
        params: {
            from: 0,
            size: total
        }
    }).then(res => res.data.data)
}

export function GET_LOCALTION_TYPE(params) {
    return request({
        url: "/api/admin/locations/types",
        method: 'get',
        params
    }).then(res => res.data.data)
}



export function GET_clientsSel(params) {
    return request({
        url: "/api/admin/clients/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}
