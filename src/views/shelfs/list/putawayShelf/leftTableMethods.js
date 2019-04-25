import { GET_DEVICES_NUM, GET_DEVICE_LISTS } from '../../../../api/devices';
import { mergeArray } from '@/utils/lodash';
export default {
    async getData() {
        var self = this
        self.tableLoading = true
        var { activeDevices, devices } = await GET_DEVICES_NUM(this.formdata);
        var lists = await GET_DEVICE_LISTS(this.formdata);
        self.tableLoading = false
        this.leftTableList = lists
        this.activeDevices = activeDevices
        this.devices = devices
        //匹配 相同的就disabled
        self.leftTableList.map(item => {
            self.selectData.map(item2 => {
                if (item.id == item2.id) {
                    item.disabled = true
                }
            })
        })
    },
    leftChangePage(page) {
        this.formdata.from = (page - 1) * this.formdata.size
        this.getData()
    },
    leftSelectRow(row) {
        if (row.disabled) { this.clickwhat = ""; return false }
        row.checked = !row.checked
        if (row.checked) {
            this.leftTableSelect = mergeArray(this.leftTableSelect, [row])
        } else {
            this.leftTableSelect = this.leftTableSelect.filter(item => item.id !== row.id)
        }
        // this.leftTableSelect = rows
        this.clickwhat = "clickleft"
        if (this.leftTableSelect.length == 0) {
            this.clickwhat = ""
        }

    },
    rightSelectRow(row) {
        row.checked = !row.checked
        if (row.checked) {
            this.rightTableSelect = mergeArray(this.rightTableSelect, [row])
        } else {
            this.rightTableSelect = this.rightTableSelect.filter(item => item.id !== row.id)
        }
        this.clickwhat = "clickright"
        if (this.rightTableSelect.length == 0) {
            this.clickwhat = ""
        }

    }
}