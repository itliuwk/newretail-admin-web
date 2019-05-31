import request from '@/utils/request'

export function get_shelfs_device_lists(params) {
    return request({
        url: "/api/admin/shelfs/devices",
        method: 'get',
        params
    }).then(res => res.data.data)
}



export function get_shelfs_device_summary(params) {
    return request({
        url: "/api/admin/shelfs/devices/summary",
        method: 'get',
        params
    }).then(res => res.data.data)
}


export function get_shelfs_device_detail(id) {
    return request({
        url: "/api/admin/shelfs/devices/detail",
        method: 'get',
        params: { id }
    }).then(res => res.data.data)
}

export function get_shelfs_device_detail_vm(id) {
    return request({
        url: "/api/admin/shelfs/devices/vmDetail",
        method: 'get',
        params: { id }
    }).then(res => res.data.data)
}
export function put_shelfs_device_detail(params) {
    return request({
        url: `/api/admin/shelfs/devices?deviceId=${params.deviceId}`,
        method: 'post',
        data: params
    }).then(res => res.data.data)
}
export function put_shelfs_device_detail_vm(params) {
    return request({
        url: `/api/admin/shelfs/devices/vm?deviceId=${params.deviceId}`,
        method: 'post',
        data: params
    }).then(res => res.data.data)
}



// api/admin/shelfs/devices/vmDetail
export function shelfs_devices_vmDetail(id) {
    return request({
        url: `/api/admin/shelfs/devices/vmDetail?id=${id}`,
        method: 'get',
        data: { id }
    }).then(res => res.data.data.rows)
}
//修改 大售货机状态/
export function post_shelfs_devices_vmDetail(params) {
    return request({
        url: `/api/admin/shelfs/devices/vm?deviceId=${params.deviceId}`,
        method: 'post',
        data: params
    }).then(res => res.data.data)
}