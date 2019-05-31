<template>
    <div class="table">

        <h4>渠道详情</h4>
        <div class="table-layout">

            <el-row>
                <el-col :span="5" class="table-cell-title">增值渠道</el-col>
                <el-col :span="5" class="table-cell-title">设备编号</el-col>
                <el-col :span="4" class="table-cell-title">设备类型</el-col>
                <el-col :span="4" class="table-cell-title">使用场地</el-col>
                <el-col :span="6" class="table-cell-title">使用地址</el-col>
            </el-row>
            <el-row>
                <el-col :span="5" class="table-cell">{{details.type|filterType}}</el-col>
                <el-col :span="5" class="table-cell">{{details.deviceId}}</el-col>
                <el-col :span="4" class="table-cell">{{details.deviceTypeName}}</el-col>
                <el-col :span="4" class="table-cell">{{details.locationName}}</el-col>
                <el-col :span="6" class="table-cell">{{details.province + details.city + details.district + details.street}}</el-col>
            </el-row>
        </div>


        <h4>费用明细</h4>
        <div class="table-layout">

            <el-row>
                <el-col :span="6" class="table-cell-title">商品数量</el-col>
                <el-col :span="6" class="table-cell-title">支付方式</el-col>
                <el-col :span="6" class="table-cell-title">订单总价</el-col>
                <el-col :span="6" class="table-cell-title">支付时间</el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="table-cell">{{details.totalQuantity}}</el-col>
                <el-col :span="6" class="table-cell">{{details.paymentGateway}}</el-col>
                <el-col :span="6" class="table-cell">{{details.orderTotal}}</el-col>
                <el-col :span="6" class="table-cell">{{details.createdDate}}</el-col>
            </el-row>
        </div>

        <h4>商品数据</h4>
        <div>
            <el-table
                    border
                    :data="details.items"
                    style="width: 100%">
                <el-table-column
                        label="图片"
                        width="180">
                    <template slot-scope="scope">
                        <img :src="scope.row.productImage" width="100" height="100" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="productName"
                        label="商品名称">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="单价">
                </el-table-column>

                <el-table-column
                        prop="quantity"
                        label="数量">
                </el-table-column>
                <el-table-column
                        prop="total"
                        label="总价">
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    import {GET_LIST_ORDERS_DETAIL} from '@/api/valueAddedManagement';
    import moment from 'moment';

    export default {
        name: "orderDetails",
        data(){
            return{
                details:{}
            }
        },
        mounted() {
            GET_LIST_ORDERS_DETAIL({id:this.$route.query.id}).then(res=>{
                res.createdDate = moment(res.createdDate).format('YYYY-MM-DD HH:mm:ss');
                if (res.paymentGateway.toLowerCase() == 'wx') {
                    res.paymentGateway = '微信'
                } else {
                    res.paymentGateway = '其他'
                }
                this.details =res
            })
        },
        filters: {
            filterType(val) {
                switch (val) {
                    case "QINGQU":
                        return '情趣用品';
                        break;
                    case "TOURISM":
                        return '旅游商品';
                        break;
                    case "PINTUAN":
                        return '拼团商城';
                        break;
                    case "TECHAN":
                        return '平价特产';
                        break;
                    case '':
                        return '';
                        break;
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .table{
        padding: 20px;
        background: #fff;
    }
    .table-layout {
        margin-top: 20px;
        border-left: 1px solid #DCDFE6;
        border-top: 1px solid #DCDFE6;
    }

    .table-cell {
        height: 60px;
        line-height: 40px;
        border-right: 1px solid #DCDFE6;
        border-bottom: 1px solid #DCDFE6;
        padding: 10px;
        font-size: 14px;
        color: #606266;
        text-align: center;
        overflow: hidden;
    }

    .table-cell-title {
        border-right: 1px solid #DCDFE6;
        border-bottom: 1px solid #DCDFE6;
        padding: 10px;
        background: #F2F6FC;
        text-align: center;
        font-size: 14px;
        color: #303133;
    }
</style>
