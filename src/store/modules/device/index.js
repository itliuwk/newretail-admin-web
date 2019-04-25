import list from './list'
import edit from './edit'
import group from './group'

const deviceStore = {
    namespaced: true,
    modules: {
        list,
        edit,
        group
    }
}
export default deviceStore