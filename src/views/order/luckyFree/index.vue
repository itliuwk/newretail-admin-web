<template>
    <div>
        <!--<form-container  @submit="submitForm" @resetForm="resetForm"></form-container>-->
        <div class="table">
            <el-row>
                <span>订单记录： {{count}}</span>
            </el-row>
            <el-table
                    :data="lists"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="订单编号">
                </el-table-column>
                <el-table-column
                        label="场地名称"
                        prop="locationName">
                </el-table-column>
                <el-table-column
                        label="设备名称"
                        prop="deviceName">
                </el-table-column>
                <el-table-column
                        prop="total"
                        label="订单总价">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="支付状态">
                </el-table-column>
                <el-table-column
                        prop="paymentGatewayType"
                        label="支付方式">
                </el-table-column>
                <el-table-column
                        prop="createdDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="lists">
                        <span
                                type="text"
                                size="small"
                                class="option-span"
                                @click="detailOrder(lists.row.id)"
                        >
                            详情
                        </span>


                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="50"
                        @current-change="currentChange"
                >
                </el-pagination>
            </div>
        </div>

        <el-dialog :visible.sync="isDetail" title="订单详细" @close="close" >
            <detail-container :currId="id" v-if="isDetail"></detail-container>
        </el-dialog>
    </div>
</template>

<script>
    import {GET_ORDER_LIST, COUNT_ORDER} from '@/api/order'
    import {dateTimeFormateHHmm} from  '@/filters/index'

    const FormContainer = () => import('../form.vue');
    const DetailContainer = () => import('../detail.vue');
    export default {
        name: "index",
        components: {
            FormContainer,
            DetailContainer
        },
        data() {
            return {
                isDetail:false,
                id:'',
                count: 0,
                lists: []
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                GET_ORDER_LIST().then(res => {
                    let lists = res.map((item) => {
                        item.state = item.state == "COMPLETED" ? "支付成功" : "支付失败";
                        item.paymentGatewayType = item.paymentGatewayType == "wx" ? "微信" : "支付宝";
                        item.createdDate = dateTimeFormateHHmm(item.createdDate);
                        return item;
                    });
                    this.lists = lists
                });

                COUNT_ORDER().then(res => {
                    this.count = res
                })
            },
            /**
             * 查询
             */
            submitForm(res) {
                this.params = {
                    ...this.params,
                    query: res.name
                };
                this.getList()
            },

            /**
             * 重置
             */
            resetForm() {
                this.params = {
                    from: 0,
                    size: 10,
                    query: ''
                };
                this.getList()
            },
            /**
             * 翻页
             */
            currentChange(res) {

            },

            detailOrder(id){
                this.id = id;
                this.isDetail = true
            },
            close(){
                this.isDetail = false
            }
        }
    }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
    .table {
        margin-top: 20px;
        padding: 30px;
        background: #fff;

        .option-span {
            color: #409EFF;
            cursor: pointer;
        }
    }

    .pagination {
        margin-top: 20px;
    }
</style>
