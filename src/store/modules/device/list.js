import {
    GET_DEVICE_LISTS, GET_LIST_TOTAL,
    GET_DEVICES_NUM, ADD_DEVICE
} from '@/api/devices';
import { pageSize } from '@/config';


const formData = {
    id: "",
    locationId: "",
    active: "",
    typeId: "",
    groupId: "",
    query: ""
};
const addParams = {
    "id": "",
    deviceTypeId: "",
    "note": "",
    "locationId": "",
    "planId": "",
    "name": ""
}
const store = {
    namespaced: true,
    state: {
        lists: [],
        tableLoading: false,
        /* params */
        params: JSON.parse(JSON.stringify(formData)),
        page: {
            from: 0,
            size: pageSize,
        },
        //在线机器 离线机器
        devicesNum: {
            "devices": 0,
            "activeDevices": 0
        },
        //list total 用来分页，
        list_total: 0,
        //add params
        addParams: JSON.parse(JSON.stringify(addParams))

    },
    mutations: {
        SET_LIST: (state, payload) => {
            state.lists = payload
        },
        SET_TABLE_LOADING: (state, payload) => {
            state.tableLoading = payload
        },
        SET_TABLE_PAGE: (state, payload) => {
            state.page = payload
        },
        SET_TABLE_FILTER: (state, payload) => {
            state.params = payload
        },

        SET_LIST_TOTAL: (state, payload) => {
            state.list_total = payload
        },
        SET_DEVICES_NUM: (state, payload) => {
            state.devicesNum = payload
        },
        RESET_ADD_MODAL_PARAMS: (state, payload) => {
            state.addParams = JSON.parse(JSON.stringify(addParams))
        },
    },
    actions: {
        setDevicesNum: async ({ commit, state }, params) => {
            var devicesNum = await GET_DEVICES_NUM(params)
            commit("SET_DEVICES_NUM", devicesNum)
        },
        getListTotal: async ({ commit, state }, params) => {
            var { activeDevices, devices } = await GET_DEVICES_NUM(params)
            commit("SET_LIST_TOTAL", devices)
        },

        getDeviceList: async ({ commit, state }, params) => {
            commit("SET_TABLE_LOADING", true)
            commit("SET_TABLE_FILTER", params)
            commit("SET_TABLE_PAGE", { from: 0, size: 10 })
            var _params = { ...params, ...state.page }
            var lists = await GET_DEVICE_LISTS(_params)
            commit("SET_TABLE_LOADING", false)
            commit("SET_LIST", lists)
        },
        changeDeviceListPage: async ({ commit, state }, page) => {
            var _params = { ...page, ...state.params }
            commit("SET_TABLE_LOADING", true)
            commit("SET_TABLE_PAGE", page)
            var lists = await GET_DEVICE_LISTS(_params)
            commit("SET_TABLE_LOADING", false)
            commit("SET_LIST", lists)
        },
        resetForm: async ({ commit, state, dispatch }, page) => {
            var params = JSON.parse(JSON.stringify(formData))
            dispatch("getDeviceList", params)
        },
        addDeivce: async ({ commit, state, dispatch }, params) => {
            var data = await ADD_DEVICE(state.addParams)
            //更新 list
            var _params = { ...state.params, ...state.page }
            dispatch("getDeviceList", _params)
            commit('RESET_ADD_MODAL_PARAMS')
            return { success: true }
        },

    },
}
export default store