import request from '@/utils/request'

export function get_analytics_summary(params) {
    return request({
        url: "/api/admin/analytics/summary",
        method: 'get',
        params
    }).then(res => res.data.data || 0)
}
export function get_analytics_sale(params) {
    return request({
        url: "/api/admin/analytics/sale",
        method: 'get',
        params
    }).then(res => res.data.data || 0)
}

export function get_analytics_income(params) {
    return request({
        url: "/api/admin/analytics/income",
        method: 'get',
        params
    }).then(res => res.data.data || 0)
}

export function get_analytics_orders(params) {
    return request({
        url: "/api/admin/analytics/orders",
        method: 'get',
        params
    }).then(res => res.data.data || 0)
}
export function get_analytics_profits(params) {
    return request({
        url: "/api/admin/analytics/profit",
        method: 'get',
        params
    }).then(res => res.data.data || 0)
}
// / 运营分析 - 销售额折线图
export function get_analytics_trend_sale(params) {
    return request({
        url: "/api/admin/analytics/trend/sale",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function get_analytics_trend_income(params) {
    return request({
        url: "/api/admin/analytics/trend/income",
        method: 'get',
        params
    }).then(res => res.data.data)
}
export function get_analytics_trend_orders(params) {
    return request({
        url: "/api/admin/analytics/trend/orders",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function get_analytics_trend_profits(params) {
    return request({
        url: "/api/admin/analytics/trend/profit",
        method: 'get',
        params
    }).then(res => res.data.data)
}

// /首页 / 场地销售排行
export function get_analytics_locations(params) {
    return request({
        url: "/api/admin/analytics/locations",
        method: 'get',
        params
    }).then(res => res.data.data)
}
export function get_analytics_categories(params) {
    return request({
        url: "/api/admin/analytics/categories",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function get_analytics_producsts(params) {
    return request({
        url: "/api/admin/analytics/products",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function get_analytics_devices(params) {
    return request({
        url: "/api/admin/analytics/devices",
        method: 'get',
        params
    }).then(res => res.data.data)
}