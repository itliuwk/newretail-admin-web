import { ADD_DEVICE_GROUPS } from '@/api/devices';


const Store = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        addDeviceGroup: async ({ commit, state }, { name }) => {
            var result = await ADD_DEVICE_GROUPS({ name }).catch(e => {
                return { success: false, message: e }
            })
            return { success: true, message: result }
        }
    },
}
export default Store