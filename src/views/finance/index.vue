<template>
    <div class="finance">
        <form-con @onSubmit="onSubmit"></form-con>
        <profile class="profile" :moneyNum="moneyNum"></profile>
        <div class="tabs">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="all"></el-tab-pane>
                <el-tab-pane label="收入" name="INCOME"></el-tab-pane>
                <el-tab-pane label="提现" name="WITHDRAW"></el-tab-pane>
            </el-tabs>
            <el-table
                    :data="lists"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="账单流水号">
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="金额(元)">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="类型">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="状态">
                </el-table-column>
                <el-table-column
                        prop="createdDate"
                        label="交易时间">
                </el-table-column>
            </el-table>
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
    </div>
</template>

<script>
    import profile from './profile'
    import {dateTimeFormateHHmm} from '@/filters'
    import moment from 'moment'
    import formCon from './form'
    import {SUMMARY, TRANSACTIONS, TRANSACTIONS_COUNT} from '@/api/finance'
    import {pageSize} from '../../config';

    export default {
        name: "index",
        data() {
            return {
                count: 0,
                moneyNum: {
                    balance: 0,
                    income: 0,
                    cashWithdrawal: 0
                },
                params: {
                    from: 0,
                    size: pageSize,
                    type: '',
                    start: '',
                    end: ''
                },
                activeName: 'all',
                lists: []
            }
        },
        components: {
            profile,
            formCon
        },
        mounted() {
            this.getSUMMARY();
            this.getTRANSACTIONS();
            this.getTRANSACTIONS_COUNT();
        },
        methods: {
            getSUMMARY() {
                SUMMARY().then(res => {
                    this.moneyNum = {
                        balance: res.balance || 0,
                        income: res.totalIncome || 0,
                        cashWithdrawal: res.totalExpense || 0
                    }
                })
            },
            getTRANSACTIONS() {
                TRANSACTIONS(this.params).then(res => {
                    res.map((item) => {
                        item.state = item.state == 'SUCCEEDED' ? '交易成功' : '交易失败';
                        item.type = item.type == 'INCOME' ? '收入' : '提现';
                        item.createdDate = moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss');
                        return item
                    });
                    this.lists = res
                })
            },
            getTRANSACTIONS_COUNT() {
                TRANSACTIONS_COUNT(this.params).then(res => {
                    this.count = res
                })
            },
            handleClick() {
                let activeName = this.activeName == 'all' ? '' : this.activeName;
                this.params = {
                    ...this.params,
                    type: activeName,
                };
                this.getTRANSACTIONS_COUNT();
                this.getTRANSACTIONS();
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
                this.getTRANSACTIONS();
            },
            onSubmit(val) {
                this.params = {
                    ...this.params,
                    start: val.start,
                    end: val.end,
                };
                this.getTRANSACTIONS();
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .finance {
        .profile {
            margin-top: 20px;
        }

        .tabs {
            padding: 20px;
            background: #fff;
        }
    }
</style>
