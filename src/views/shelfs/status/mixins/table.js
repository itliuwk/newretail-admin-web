import { get_shelfs_device_summary, get_shelfs_device_lists } from '../../../../api/devicesStatus';
export default {
    methods: {
        search(formdata) {
            this.dataForm = { ...this.dataForm, ...formdata }
            this.getLeftData()
        },
        async getLeftData() {
            this.loading = true;
            var params = { ...this.dataForm };
            var { devices, outOfStockDevices } = await get_shelfs_device_summary(
                params
            );
            var tableData = await get_shelfs_device_lists(params);
            this.leftTableData = tableData;
            this.devices = devices;
            this.outOfStockDevices = outOfStockDevices;
            this.loading = false;
        },
        clickrowleft(row) {
            this.isEdit = false
            this.leftSelectRow = row
            this.$nextTick(() => {
                this.isEdit = true
            })
        },
        changePaginationleft(page) {
            this.dataForm.from = (page - 1) * this.dataForm.size
            this.getLeftData()
        }
    },
    mounted() {
        this.getLeftData()
    }
}