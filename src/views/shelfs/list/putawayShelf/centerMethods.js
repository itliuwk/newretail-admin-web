import { mergeArray } from '../../../../utils/lodash';
import { clone } from '../../../../filters';
export default {
    click_right() {
        //合并
        this.selectData = mergeArray(
            clone(this.leftTableSelect),
            this.selectData
        );
        this.clickwhat = ""
        // this.$refs['lefttable'].$refs['table'].clearSelection()
        //让已经选择的左侧 变成 disabled
        this.leftTableList.map(item => {
            this.leftTableSelect.map(item2 => {
                if (item.id == item2.id) {
                    item.disabled = true
                }
            })
        })
        this.leftTableSelect = []
        this.$data.selectData.map(item => {
            item.checked = false
        })
        this.clickwhat = ""
    },
    click_left() {
        //合并
        this.$data.selectData = this.$data.selectData.filter(item => {
            var arra = this.rightTableSelect.filter(
                item2 => item.id == item2.id
            );
            return arra.length == 0;
        });
        //让已经选择的左侧 变成 !disabled
        this.leftTableList.map(item => {
            this.rightTableSelect.map(item2 => {
                if (item2.id == item.id) {
                    item.disabled = false
                    item.checked = false
                }
            })
        })
        this.rightTableSelect = []
        this.clickwhat = ""
    }
}