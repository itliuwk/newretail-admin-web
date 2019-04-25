import list from './list'
import add from './add'
import edit from './edit'

const Store = {
    namespaced: true,
    modules: {
        list,
        add, edit
    }
}
export default Store