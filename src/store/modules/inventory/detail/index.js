//detail
import map from 'lodash.map'
import { pageSize } from '@/config';
const store = {
    namespaced: true,
    state: {
        editRow: {},//目前选着的数据
        form: {
            from: 0,
            size: pageSize
        },
        total: 0,
        lists: [],
        loading: false,


        tablelist1: [],
        //stockshow
        stockshow: false,
        transfershow: false,
        returnshow: false,
        editRow2: {}
    },
    mutations: {
        SET_DATA: (state, payload) => {
            map(payload, (value, key) => {
                state[key] = payload[key]
            })
        },
    },
    actions: {
        setEditRow: async ({ commit, state }, row) => {
            commit("SET_DATA", { editRow: row })
            commit("SET_DATA", { form: { ...state.form, id: row.id } })
        },
        setStore: async ({ commit, state, dispatch }, payload) => {
            map(payload, (value, key) => {
                commit("SET_DATA", { [key]: value })
            })
            return payload
        },
        search: async ({ commit, state, dispatch }, form) => {
            var _form = { ...state.form, ...form }
            commit("SET_DATA", { form: _form })
            dispatch("getLists")
        },

    },
}
export default store