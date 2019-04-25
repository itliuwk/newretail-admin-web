import {
    GET_DEVICE_TYPES, GET_LOCATIONS,
    GET_DEVICE_GROUPS_TOTAL, GET_DEIVCE_GROUPS_ALL,
    GET_ROLES, GET_LOCALTION_TYPE
} from '@/api/common'

const store = {
    state: {
        //select 的options
        deviceTypes: [],
        locations: [],
        roles: [],
        deviceGroups: [],
        locationTypes: []
    },
    mutations: {
        SET_DEVICE_TYPE: (state, payload) => {
            state.deviceTypes = payload
        },
        SET_LOCALTIONS: (state, payload) => {
            state.locations = payload
        },
        SET_ROLE: (state, payload) => {
            state.roles = payload
        },
        SET_DEVICE_GROUPS: (state, payload) => {
            state.deviceGroups = payload
        },
        SET_LOCATION_TYPE: (state, payload) => {
            state.locationTypes = payload
        },
    },
    actions: {
        getDeviceTypes: async ({ commit, state }, params) => {
            var lists = await GET_DEVICE_TYPES()
            commit("SET_DEVICE_TYPE", lists)
        },
        getLocations: async ({ commit, state }, params) => {
            var lists = await GET_LOCATIONS()
            commit("SET_LOCALTIONS", lists)
        },
        getDeviceGroups: async ({ commit, state }, params) => {
            //1.获取groups总数
            //2.调取所有的groups
            var total = await GET_DEVICE_GROUPS_TOTAL()
            var lists = await GET_DEIVCE_GROUPS_ALL(total)
            commit("SET_DEVICE_GROUPS", lists)
        },
        getRoles: async ({ commit, state }, params) => {
            var lists = await GET_ROLES()
            commit("SET_ROLE", lists)
        },
        getLocationTypes: async ({ commit, state }, params) => {
            var lists = await GET_LOCALTION_TYPE(params)
            commit("SET_LOCATION_TYPE", lists)
        },
    },
}
export default store