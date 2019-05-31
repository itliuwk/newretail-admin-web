import initStore from "./initStore";
export default {
    props: {
        storex: {
            type: Object,
            default: () => initStore
        }
    },

    computed: {
        leftSelectRow() {
            return this.storex.leftSelectRow
        },
        dataForm() {
            return this.storex.dataForm
        },
        isEdit() {
            return this.storex.isEdit
        },
        isPostSelf() {
            return this.storex.isPostSelf
        },
        loading() {
            return this.storex.loading
        },
        leftTableData() {
            return this.storex.leftTableData
        },
        outOfStockDevices() {
            return this.storex.outOfStockDevices
        },
        devices() {
            return this.storex.outOfStockDevices
        },
    }
}