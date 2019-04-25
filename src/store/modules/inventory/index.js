import list from './list'
import detail from './detail'
import audits from './detail/audits'

const store = {
    namespaced: true,
    modules: {
        list,
        detail,
        audits
    }
}
export default store