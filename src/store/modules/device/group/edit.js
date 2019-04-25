import {UPDATE_DEVICE_GROUPS} from "@/api/devices";
import _map from "lodash.map"

const Store = {
    namespaced: true,
    state: {
        editRow: {}
    },
    mutations: {
        INIT_EDIT_ROW: (state, editRow) => {
            state.editRow = editRow
        },
        UPDATE_DEVICE_GROUP: (state, editRow) => {
            state.editRow = editRow
        },
    },
    actions: {
        initEditRow: async ({commit, state}, editRow) => {
            commit("INIT_EDIT_ROW", editRow)
        },
        updateDeviceGroup: async ({rootState, commit, state, dispatch}, editRow) => {
            var result = await UPDATE_DEVICE_GROUPS(editRow).catch(e => {
                return {message: e, success: false}
            })
            //修改
            var lists = rootState.device.group.list.lists
            var _index = lists.findIndex(item => item.id == editRow.id)

            _map(editRow, (value, key) => {
                lists[_index][key] = value
            })
            // commit("UPDATE_DEVICE_GROUP", editRow)
            dispatch('device/group/list/setDeviceList', lists, {root: true})

            return {message: "修改成功", success: true}
        },
    },
}
export default Store