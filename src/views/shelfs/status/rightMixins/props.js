import initStore from "./initStore";
export default {
    props: {
        storex: {
            type: Object,
            default: () => initStore
        }
    },

    computed: {
        right_loading() {
            return this.storex.right_loading
        },
        right_detail() {
            return this.storex.right_detail
        },
        right_editItem() {
            return this.storex.right_editItem
        },
        right_editModalState() {
            return this.storex.right_editModalState
        },

    }
}