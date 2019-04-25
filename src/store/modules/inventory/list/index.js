//list
import map from 'lodash.map'
const store = {
    namespaced: true,
    state: {
        editRow: {
            availableStock: "",
        },//目前选着的数据

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
        },


    },
}
export default store