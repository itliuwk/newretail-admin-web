<template>
    <div class="tableContainer">
        <el-table
                :data="leftTableData"
                v-loading="loading"
                :row-class-name="tableRowClassName"
                @row-click="(row)=>{$emit('clickrow',row)}"
        >
            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="名字" prop="name">
                <template slot-scope="scope">
                    <div>{{scope.row.name}}</div>
                </template>
            </el-table-column>
            <el-table-column label="地址" prop="locationName"></el-table-column>
            <el-table-column label="类型" prop="typeId">
                <template slot-scope="scope">
                    <div v-if="scope.row.typeId=='quxia'">酒店售货机</div>
                    <div v-else="!scope.row.typeId=='quxia-vm'">自助售货机</div>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="active">
                <template slot-scope="scope">
                    <div v-if="scope.row.active">在线</div>
                    <div v-if="!scope.row.active">离线</div>
                </template>
            </el-table-column>

            <el-table-column label="库存状态" prop="stockState">
                <template slot-scope="scope">
                    <div>{{scope.row.stockState| filterStockState(scope.row)}}</div>
                </template>
            </el-table-column>

            <el-table-column label="操作" prop="active">
                <template slot-scope="scope">
                    <span style="color: rgb(64, 158, 255);cursor: pointer;" @click="replenishment(scope.row)">补货</span>
                    <span v-if="scope.row.typeId=='quxia'"
                          style="color: rgb(64, 158, 255);cursor: pointer;margin: 0 20px"
                          @click="replenishment(scope.row,'stock')">调整库存</span>
                </template>
            </el-table-column>

        </el-table>

        <div class="paginationContainer" style="padding-top:20px">
            <el-pagination
                    background
                    :page-size="dataForm.size"
                    layout="prev, pager, next"
                    :total="devices"
                    @current-change="(page)=>$emit('changePagination',page)"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
    import {
        getShelfs,
        getShelfDetail,
        postShelfApply,
        postShelf,
        deleteShelf,
        putShelf,
        getShelfCount
    } from "@/api/shelfs";
    import {mapState, mapActions} from "vuex";
    import myalert from "../../../utils/alert";
    import {
        get_shelfs_device_lists,
        get_shelfs_device_summary
    } from "../../../api/devicesStatus";
    import props1 from "./mixins/props";

    export default {
        mixins: [props1],
        data() {
            return {};
        },
        mounted() {
        },
        methods: {
            ...mapActions(["getDeviceTypes"]),
            tableRowClassName({row, rowIndex}) {
                if (row.id === this.leftSelectRow.id) {
                    return "success-row";
                }
                return "";
            },
            postShelfApply1(item) {
                this.$router.push(`/shelfs/putaway?id=${item.id}&name=${item.name}`);
            },
            go2add() {
                this.$router.push(`/shelfs/add`);
            },
            deleteShelf1(row) {
                var self = this;
                myalert.confirm("确定要删除吗？").then(res => {
                    self.$data.tableLoading = true;
                    deleteShelf(row.id).then(res => {
                        self.$data.tableLoading = false;
                        myalert.success("删除成功");
                        self.getTableData();
                    });
                });
            },
            replenishment(row, stock) {
                if (stock) {
                    stock = true
                } else {
                    stock = false
                }
                this.$emit('replenishment', row, stock)
            }
        },
        filters: {
            filterStockState(val, row) {
                switch (val) {
                    case 'NORMAL':
                        return '正常';
                        break;
                    case 'OUT_OF_STOCK':
                        return '全部售罄';
                        break;
                    case 'ALERT':
                        return row.alertCount + '个缺货,' + row.soldoutCount + '个售罄';
                        break;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .tableContainer {
        background: #fff;

        .btns {
            margin-bottom: 10px;
        }
    }

    header {
        width: 100%;
        align-items: center;
        display: flex;
        padding: 10px;
        border-bottom: 1px solid #ddd;

        .smnallbtns {
            padding-left: 20px;
            flex: 1;
            display: flex;

            .item {
                padding-right: 20px;
                display: flex;
            }
        }
    }
</style>

