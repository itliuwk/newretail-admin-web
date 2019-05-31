import request from '@/utils/request'

export function GET_DEVICE_LISTS(params) {
    return request({
        url: "/api/admin/devices",
        method: 'get',
        params
    }).then(res => res.data.data).then(array => {
        return array.map(item => {
            item.checked = false;
            item.disabled = false;
            return item
        })
    })
}

export function GET_LIST_TOTAL(params) {
    return request({
        url: "/api/admin/devices/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function GET_DEVICES_NUM(params) {
    return request({
        url: "/api/admin/devices/summary",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function ADD_DEVICE(data) {
    //deviceTypeId =>typeId
    if (data.deviceTypeId) { data.typeId = data.deviceTypeId }
    return request({
        url: "/api/admin/devices",
        method: 'post',
        data,
    }).then(res => res.data.data)
}

export function GET_DEVICE_DETAIL(params) {
    return request({
        url: "/api/admin/devices/detail",
        method: 'get',
        params: {
            id: params.id
        }
    }).then(res => res.data.data)
}



export function UPDATE_DEVICE(params) {
    return request({
        url: `/api/admin/devices/update?id=${params.id}`,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}

export function GET_CODE(id) {
    return request({
        url: "/api/admin/devices/qrcodeText",
        method: 'get',
        params: { deviceId: id }
    }).then(res => res.data.data)
}
export function GET_wxCODE(id) {
    return request({
        url: "/api/admin/devices/qrcode",
        method: 'get',
        params: { deviceId: id }
    }).then(res => res.data.data)
}

//设备分组
export function GET_DEVICE_GROUPS(params) {
    return request({
        url: "/api/admin/deviceGroups",
        method: 'get',
        params
    }).then(res => res.data.data)
}

//设备分组 总数
export function GET_DEVICE_GROUPS_TOTAL(query) {
    return request({
        url: "/api/admin/deviceGroups/count",
        method: 'get',
        params: {
            query
        }
    }).then(res => res.data.data)
}

//add new groups
export function ADD_DEVICE_GROUPS(params) {
    return request({
        url: "/api/admin/deviceGroups",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}

//delete   groups
export function DELETE_DEVICE_GROUPS(params) {
    return request({
        url: "/api/admin/deviceGroups",
        method: 'delete',
        data: params,
        params: params
    }).then(res => res.data.data)
}

//update   groups
export function UPDATE_DEVICE_GROUPS(params) {
    return request({
        url: "/api/admin/deviceGroups",
        method: 'put',
        data: params,
        params
    }).then(res => res.data.data)
}

//add device into groups
export function ADD_DEVICES_INTO_GROUP(params) {
    return request({
        url: "/api/admin/deviceGroups/addDevices",
        method: 'post',
        data: params,
    }).then(res => res.data.data)
}