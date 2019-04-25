<template>
    <div class="detail">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <div class="detailsOfCharges">
                        <p style="margin-top: 0;">费用明细</p>
                        <ul>
                            <li>
                                <span>商品数量</span>
                                <span>1</span>
                            </li>
                            <li>
                                <span>支付方式</span>
                                <span>{{ details.paymentGateway == 'wx' ? "微信":"支付宝" }}</span>
                            </li>
                            <li v-if="details.subTotal">
                                <span>订单总价</span>
                                <span> ￥{{ details.subTotal }}元</span>
                            </li>
                            <li v-if="details.vip">
                                <span>会员折扣</span>
                                <span>￥{{ details.vip.discount}}元</span>
                            </li>
                            <li v-if="details.coupon">
                                <span>优惠券({{ details.coupon.couponName}})</span>
                                <span>￥{{ details.coupon.discount}}元</span>
                            </li>
                            <li v-if="details.offer">
                                <span>促销活动({{ details.offer.offerName}})</span>
                                <span>￥{{ details.offer.discount}}元</span>
                            </li>
                            <li v-if="details.totalPrice">
                                <span>小计</span>
                                <span>￥{{ details.totalPrice}}元</span>
                            </li>
                            <li v-if="details.paidBalance">
                                <span>余额抵消:</span>
                                <span>￥{{ details.paidBalance}}元</span>
                            </li>
                            <li>
                                <span>支付时间</span>
                                <span>{{details.createdDate}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <div class="usageSituation">
                        <p>使用情况</p>
                        <ul>
                            <li>
                                <span>订单编号</span>
                                <span>{{details.id}}</span>
                            </li>
                            <li>
                                <span>设备编号</span>
                                <span>{{details.deviceId}}</span>
                            </li>
                            <li>
                                <span>设备名称</span>
                                <span>{{details.deviceName}}</span>
                            </li>
                            <li>
                                <span>使用场地</span>
                                <span>{{details.province + details.city + details.district + details.street}}</span>
                            </li>
                            <li>
                                <span>使用地址</span>
                                <span>{{details.locationName}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="grid-content bg-purple-light grid-content1">
                    <p style="  font-size: 18px; font-weight: bold;">商品数据</p>
                    <el-table
                            :data="details.items"
                            style="width: 100%">
                        <el-table-column
                                label="图片">
                            <template slot-scope="scope">
                                <img :src="scope.row.image" min-width="70" width="70" height="70"/>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="商品名">
                        </el-table-column>
                        <el-table-column
                                prop="price"
                                label="价格">
                        </el-table-column>
                        <el-table-column
                                prop="quantity"
                                label="数量">
                        </el-table-column>
                        <el-table-column
                                prop="totalPrice"
                                label="总价">
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    import {DETAIL_ORDER} from '@/api/order'
    import {dateTimeFormateHHmm} from  '@/filters/index'

    export default {
        name: "detail",
        props: {
            currId: Number
        },
        data() {
            return {
                details:{ },
                tableData: []
            }
        },
        mounted() {
            this.getDetail(this.currId);
        },
        methods: {
            getDetail(id) {
                let params = {
                    id
                };
                DETAIL_ORDER(params).then(res => {
                    res.createdDate  = dateTimeFormateHHmm(res.createdDate);
                    this.details = res
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .detail {
        padding: 20px;
        background: #fff;

        .detailsOfCharges, .usageSituation {
            font-size: 18px;
            font-weight: bold;

            p {
                margin: 15px 0;
            }

            ul {
                display: flex;
                li {
                    margin: 5px 0;
                    font-size: 14px;
                    float: left;
                    border: 1px solid #d9d9d9;
                    border-right: none;
                    flex: 1;
                    span {
                        font-weight: normal;
                        display: block;
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                    }

                    span:nth-child(1) {
                        font-weight: bold;
                        background: rgba(250,250,250,1);
                    }

                    span:nth-child(2) {
                        border-top: 1px solid #d9d9d9;
                    }
                }

                li:last-child{
                    border-right: 1px solid #d9d9d9;
                }
            }
        }
        .grid-content1{
            margin-top: 20px;
        }
    }
</style>
