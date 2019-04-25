import {
    GET_DEVICE_DETAIL,
    UPDATE_DEVICE
} from '@/api/devices'

const deviceStore = {
    namespaced: true,
    state: {
        loading: false,
        device: {
            "groupName": "",
            "locationName": "",
            "locationId": '',
            "groupId": '',
            "name": "",
            "active": false,
            "id": "",
            "type": ""
        }
    },
    mutations: {
        SET_LOADING: (state, payload) => {
            state.loading = payload
        },
        SET_DEVICE: (state, payload) => {
            state.device = payload
        },
    },
    actions: {
        getDeviceDetail: async ({ commit, state, dispatch }, params) => {
            commit('SET_LOADING', true)
            var device = await GET_DEVICE_DETAIL(params).catch(e => {
                console.error(e)
                commit('SET_LOADING', false)
            })
            commit('SET_LOADING', false)
            commit('SET_DEVICE', device)
        },
        updateDevice: async ({ commit, state, dispatch }, params) => {
            commit('SET_LOADING', true)
            var device = await UPDATE_DEVICE(params).then(res => {
                return { success: true }
            }).catch(e => {
                commit('SET_LOADING', false)
                return { success: false, message: e }
            })
            commit('SET_LOADING', false)
            if (device.success) {
                return { success: true, message: "添加成功" }
            } else {
                return device
            }

        },
        resetForm: async ({ commit, state, dispatch }, params) => {
            return dispatch('getDeviceDetail', state.device)
        },
    }

}
export default deviceStore