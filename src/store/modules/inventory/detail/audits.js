//detail
import map from 'lodash.map'
import { pageSize } from '@/config';
const store = {
    namespaced: true,
    state: {
        form: {
            from: 0,
            size: pageSize
        },
        total: 0,
        lists: [],
        loading: false,
    },
    mutations: {
        SET_DATA: (state, payload) => {
            map(payload, (value, key) => {
                state[key] = payload[key]
            })
        },
    },
    actions: {

        setStore: async ({ commit, state, dispatch }, payload) => {
            map(payload, (value, key) => {
                commit("SET_DATA", { [key]: value })
            })
            return payload
        },

    },
}
export default store