<template>
    <div class="valueAddedAtatistics">
        <div class="row">
            <span>增值渠道：</span>
            <el-select v-model="params.channelId" @change="selChange" clearable placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in channel" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>

            <div class="item1">
                <div :class="`item ${type=='today'?'active':'none'}`" @click="selectTime('today')">今日</div>
                <div :class="`item ${type=='week'?'active':'none'}`" @click="selectTime('week')">本周</div>
                <div :class="`item ${type=='mouth'?'active':'none'}`" @click="selectTime('mouth')">本月</div>
                <div :class="`item ${type=='cumulative'?'active':'none'}`" @click="selectTime('cumulative')">累计</div>
            </div>
            <div class="item2">
                <el-date-picker
                        style="width:250px;"
                        v-model="dates"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始"
                        end-placeholder="结束"
                        @change="dateChange"
                ></el-date-picker>
            </div>
        </div>

        <div class="profile">
            <div class="item">
                <div class="strong">{{summary.income==null?'0':summary.income}} 元</div>
                <div class="small">收入</div>
            </div>
            <div class="item">
                <div class="strong">{{summary.sales==null?'0':summary.sales}} 元</div>
                <div class="small">销售额</div>
            </div>
            <div class="item">
                <div class="strong">{{summary.orders==null?'0':summary.orders}} 单</div>
                <div class="small">订单数</div>
            </div>
        </div>


        <div class="table">
            <el-table
                    :data="listData"
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="增值渠道"
                        width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.type |filterType}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="deviceId"
                        label="设备ID"
                        width="180">
                </el-table-column>

                <el-table-column
                        prop="totalQuantity"
                        label="商品数"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="orderTotal"
                        label="金额"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="locationName"
                        label="场地名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="场地地址">
                    <template slot-scope="scope">
                        {{scope.row.province + scope.row.city + scope.row.district + scope.row.street}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createdDate"
                        label="下单时间">
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template slot-scope="scope">
                        <span @click="itemDetail(scope.row.id)" style="color: #409EFF; cursor: pointer;">详情</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="pagination">
            <el-pagination
                    background
                    :page-size="params.size"
                    layout="prev, pager, next"
                    :total="count"
                    @current-change="currentChange"
            >
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import {getToday, getLastWeek, getLastMonth, dateFormate} from "@/utils/date";
    import {GET_SUMMARY, GET_LIST_ORDERS, GET_SELECT,GET_ORDERS_COUNT} from '@/api/valueAddedManagement';
    import moment from 'moment';
    import {pageSize} from '../../../config';



    export default {
        name: "index",
        data() {
            return {
                type: "cumulative",
                value4: '',
                channel: [],
                params: {
                    channelId: '',
                    start: '',
                    end: '',
                    form: 0,
                    size:pageSize
                },
                dates: [],
                listData: [],
                summary:{},
                count:0
            }
        },
        mounted() {
            GET_SELECT().then(res => {
                this.channel = res;
            });
            this.get_list();
        },
        methods: {

            get_list() {
                GET_LIST_ORDERS({...this.params}).then(res => {
                    res.map(item => {
                        item.createdDate = moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')
                    });
                    this.listData = res;
                });

                GET_SUMMARY({...this.params}).then(res=>{
                    this.summary = res;
                });


                GET_ORDERS_COUNT({...this.params}).then(res=>{
                    this.count =res;
                })
            },
            selChange(val) {
                this.params = {
                    ...this.params,
                    channelId: val
                };
                this.get_list();
            },
            selectTime(val) {
                this.type = val;
                let start, end;
                this.dates = [];
                if (this.type == "today") {
                    start = getToday().start;
                    end = getToday().end;
                }
                if (this.type == "week") {
                    start = getLastWeek().start;
                    end = getLastWeek().end;
                }
                if (this.type == "mouth") {
                    start = getLastMonth().start;
                    end = getLastMonth().end;
                }

                if (this.type == 'cumulative') {
                    start = '';
                    end = '';
                }

                this.params = {
                    ...this.params,
                    start,
                    end,
                };
                this.get_list();
            },
            dateChange(value) {
                if (value) {
                    this.params = {
                        ...this.params,
                        start:dateFormate(value[0]),
                        end:dateFormate(value[1])
                    };
                    this.get_list();
                } else {
                    this.selectTime("today");
                }

            },

            /**
             * 翻页
             */
            currentChange(res) {
                this.params = {
                    ...this.params,
                    from: parseInt(res - 1) * this.params.size,
                    size: pageSize,
                };
                this.get_list()
            },

            itemDetail(id){
                this.$router.push('/advertisingManagement/orderDetails?id='+id);
            }
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
    .valueAddedAtatistics {
        padding: 20px;
        background: #fff;

        .row {
            display: flex;
            align-items: center;
        }

        .item1 {
            width: 220px;

            display: inline-block;
            margin-left: 50px;

            .item {
                display: inline-block;
                text-align: center;
                margin-top: 10px;
                margin-left: 5px;
                margin-right: 15px;
                padding-bottom: 5px;
                cursor: pointer;
            }

            .active {
                border-bottom: 2px solid #409EFF;
            }
        }

        .profile {
            display: flex;
            justify-content: space-around;
            margin: 50px 0;
            border-bottom: 1px solid #ddd;
            padding-bottom: 20px;

            .item {
                width: 100%;
                text-align: center;
                border-right: 1px solid #ddd;

                &:last-child {
                    border-right: none;
                }

                .strong {
                    margin-bottom: 10px;
                    font-size: 20px;
                    font-weight: bolder;
                }
            }
        }
    }
</style>
