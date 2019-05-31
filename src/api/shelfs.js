import request from '@/utils/request'

export function getShelfs(params) {
    return request({
        url: '/api/admin/shelfs',
        method: 'get',
        params
    }).then(res => res.data.data)
}
export function getShelfDetail(id) {
    return request({
        url: '/api/admin/shelfs/detail',
        method: 'get',
        params: { id }
    }).then(res => res.data.data)
}

export function postShelfApply(params) {
    return request({
        url: `/api/admin/shelfs/apply?id=${params.id}`,
        method: 'post',
        data: params
    }).then(res => res.data.data)
}

export function postShelf(params) {
    return request({
        url: '/api/admin/shelfs',
        method: 'post',
        data: params
    }).then(res => res.data.data)
}
export function postShelfvm(params) {
    return request({
        url: '/api/admin/shelfs/vm',
        method: 'post',
        data: params
    }).then(res => res.data.data)
}
export function deleteShelf(id) {
    return request({
        url: '/api/admin/shelfs',
        method: 'delete',
        data: { id },
        params: { id }
    }).then(res => res.data.data)
}
export function putShelf(params) {
    return request({
        url: `/api/admin/shelfs?id=${params.id}`,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}
export function putShelfvm(params) {
    return request({
        url: `/api/admin/shelfs/vm?id=${params.id}`,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}

export function getShelfCount(params) {
    return request({
        url: '/api/admin/shelfs/count',
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function getShelfAppliedData(id) {
    return request({
        url: '/api/admin/shelfs/appliedData',
        method: 'get',
        params: { id }
    }).then(res => res.data.data).then(lists => {
        lists.map(item => {
            item.disabled = false
            item.checked = false
        })
        return lists
    })
}

