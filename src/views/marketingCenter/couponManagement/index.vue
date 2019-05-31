<template>
    <div>
        <form-container label="名称" @submit="submitForm" @resetForm="resetForm"></form-container>
        <div class="table">
            <el-row>
                <router-link :to="`/marketingCenter/couponManagement/couponDetails`" class="resetWH">
                    <el-button type="primary">
                        添加优惠券
                    </el-button>
                </router-link>
            </el-row>
            <el-table
                    :data="lists"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        width="100"
                        label="类型">
                    <template slot-scope="lists">
                        {{lists.row.type | filterType}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="有效期">
                </el-table-column>
                <el-table-column
                        prop="createdDate"
                        label="创建时间">
                    <template slot-scope="lists">
                        {{lists.row.createdDate | filterCreatedDate}}
                    </template>
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="enabled"
                        label="状态">
                    <template slot-scope="lists">
                        {{lists.row.enabled | filterEnabled}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="enabled"
                        label="库存">
                    <template slot-scope="lists">
                        <p>总库存 {{lists.row.maxStock}} 张</p>
                        <p>领取 {{lists.row.acquired}} 张</p>
                        <p>库存 {{lists.row.stock}} 张</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="enabled"
                        label="数据统计">
                    <template slot-scope="lists">
                        <p>累计消费 {{lists.row.orderTotal}} 元</p>
                        <p>累计优惠 {{lists.row.totalDiscount}} 元</p>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="lists">
                        <span
                                size="small"
                                class="option-span"
                                style="margin: 0 5px;"
                                @click="editItem(lists.row.id)">
                            编辑
                        </span>
                        <span
                                size="small"
                                class="option-span"
                                style="margin: 0 5px;"
                                @click="adjustment(lists.row)">
                            调整库存
                        </span>
                        <span
                                size="small"
                                class="option-span"
                                style="margin: 0 5px;"
                                @click="enabledItem(lists.row)">
                            {{lists.row.enabled | filterEnable}}
                        </span>
                        <span
                                type="text"
                                size="small"
                                class="option-span"
                                @click="removeItem(lists.row.id)"
                        >
                            删除
                        </span>


                    </template>
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

        <el-dialog
                width="815px"
                :show-close="false"
                top="30px"
                :visible.sync="addMerchandise">
            <coupon-details ref="couponDetails"></coupon-details>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetFormDialog('ruleForm'), addMerchandise = false">取消</el-button>
                <el-button type="primary" @click="determine" :loading="isLoading">确定</el-button>
            </div>
        </el-dialog>


        <el-dialog
                width="400px"
                title="调整库存"
                :show-close="false"
                :visible.sync="isAdjustment">

            <div class="adjustment">
                <div>
                    <p class="fwb">{{adjustStock.name}}</p>
                    <p>有效期: {{adjustStock.date}}</p>
                </div>
                <div>
                    <p>剩余 <span class="fwb">{{adjustStock.stock}}</span> 张 </p>
                </div>
                <div>
                    <span style="margin-right: 10px;">调整库存: </span>
                    <el-input-number v-model="adjustStock.value" style="width: 150px"
                                     label="调整库存"></el-input-number>
                    <span style="margin-left: 10px;">当前 <span
                            class="fwb">{{adjustStock.stock + adjustStock.value}}</span> 张</span>
                </div>
                <div>
                    <span style="margin:10px 0 20px 0;display: inline-block;">修改原因: </span>
                    <el-input type="textarea" v-model="adjustStock.note"></el-input>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isAdjustment = false">取消</el-button>
                <el-button type="primary" @click="ajustmentDetermine" :loading="isLoading">确定</el-button>
            </div>

        </el-dialog>

    </div>
</template>

<script>
    import {
        GET_couponManagement_LIST as GET_LIST,
        DELETE_coupons as DELETE_ITEM,
        COUNT_coupons as COUNT,
        ENABLE_coupons,
        DISABLE_coupons,
        POST_coupons as ADD_ITEM,
        PUT_coupons as UPDATE_ITEM,
        updateStock_coupons
    } from '@/api/marketingCenter'


    import Alert from "@/utils/alert";
    import {pageSize} from '../../../config';
    import {FormateYYMMDD, dateTimeFormate} from "@/filters/index";

    const FormContainer = () => import('./form.vue');
    const CouponDetails = () => import('./couponDetails.vue');


    export default {
        name: "index",
        data() {
            return {
                num: 0,
                isLoading: false,
                hackReset: true,
                isAdjustment: false,
                addMerchandise: false,
                lists: [],
                count: 0,
                id: '',
                params: {
                    from: 0,
                    size: pageSize,
                    query: '',
                    type: '',
                    enabled: '',
                },

                adjustStock: {
                    id: '',
                    name: '',
                    date: '',
                    stock: '',
                    value: '',
                    note: ''
                }
            }
        },
        mounted() {
            this.getList();
            this.getCount();
        },
        components: {
            FormContainer,
            CouponDetails
        },
        methods: {

            /**
             * 获取列表数据
             */
            getList() {
                GET_LIST(this.params).then(res => {
                    res.map((item) => {
                        if (item.dateRule == 'AFTER_ACQUIRED') {
                            item.date = '领取后' + item.validDays + '天有效';
                        } else {

                            item.date = FormateYYMMDD(item.startDate) + ' 至 ' + FormateYYMMDD(item.endDate);
                        }
                        return item
                    });
                    this.lists = res
                });

            },


            /**
             * 获取总数
             */
            getCount() {
                COUNT(this.params).then(res => {
                    this.count = res
                });
            },

            /**
             * 查询
             */
            submitForm(res) {
                this.params = {
                    ...this.params,
                    query: res.name,
                    type: res.type,
                    enabled: res.enabled,
                };
                this.getList();
                this.getCount();
            },

            /**
             * 重置
             */
            resetForm() {
                this.params = {
                    from: 0,
                    size: pageSize,
                    query: '',
                    type: '',
                    enabled: '',
                };
                this.getList();
                this.getCount();
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
                this.getList()
            },

            /**
             * 删除商品
             */
            removeItem(id) {
                this.$confirm('确定删除此商品嘛？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    DELETE_ITEM(id).then((res) => {
                        let lists = [];
                        this.lists.map((item) => {
                            if (item.id != id) {
                                lists.push(item)
                            }
                            return item;
                        });
                        this.lists = lists;
                    });
                    Alert.success("删除成功");
                }).catch(() => {

                })
            },

            enabledItem(row) {
                if (row.enadled) {
                    DISABLE_coupons(row.id).then(res => {
                        Alert.success("操作成功");
                        this.getList();
                    });
                } else {
                    ENABLE_coupons(row.id).then(res => {
                        Alert.success("操作成功");
                        this.getList();
                    });
                }
            },

            /**
             * 编辑商品
             */
            editItem(id) {
                this.$router.push('/marketingCenter/couponManagement/couponDetails?id=' + id);
            },

            /**
             * 调整库存
             */
            adjustment(row) {
                this.adjustStock = {
                    id: row.id,
                    name: row.name,
                    date: row.date,
                    stock: row.stock,
                    value: '',
                    note: ''
                };
                this.isAdjustment = true;
            },


            /**
             * 确定调整库存
             */
            ajustmentDetermine() {
                let that = this;
                if (!this.adjustStock.note) {
                    Alert.fail('修改原因不能为空');
                    return;
                }
                that.isLoading = true;
                updateStock_coupons({...this.adjustStock}).then(res => {
                    Alert.success('修改成功');
                    setTimeout(() => {
                        that.adjustStock = {
                            id: '',
                            name: '',
                            date: '',
                            stock: '',
                            value: '',
                            note: ''
                        };
                        that.isAdjustment = false;
                        that.isLoading = false;
                        this.getList();
                    }, 1000);

                });

            },

            /**
             * 确定保存
             */
            determine() {
                let that = this;
                let couponDetails = this.$refs['couponDetails'].$refs['ruleForm'];
                couponDetails.validate((val) => {
                    if (val) {
                        that.isLoading = true;
                        let list = this.$refs['couponDetails'].ruleForm;
                        console.log(list);
                        return false;
                        if (!list.id) {
                            ADD_ITEM(list).then(res => {
                                setTimeout(() => {
                                    Alert.success('新建成功');
                                    that.addMerchandise = false;
                                    that.hackReset = false;
                                    that.isLoading = false;
                                }, 1500);

                            })
                        } else {
                            UPDATE_ITEM(list).then(res => {
                                setTimeout(() => {
                                    Alert.success('更新成功');
                                    that.addMerchandise = false;
                                    that.hackReset = false;
                                    that.isLoading = false;
                                }, 1500);

                            })
                        }
                        setTimeout(() => {
                            that.getList();
                            that.isLoading = false;
                        }, 1500);


                    }
                });
            },

            /**
             * 取消弹层
             */
            resetFormDialog() {
                this.hackReset = false;//销毁组件
                this.$refs['couponDetails'].$refs['ruleForm'].resetFields();
            }
        },
        filters: {
            filterType(val) {
                switch (val) {
                    case 'AMOUNT_OFF':
                        return '减免卷';
                    case 'DISCOUNT_RATE':
                        return '折扣卷';
                }
            },
            filterEnabled(val) {
                switch (val) {
                    case true:
                        return '投放中';
                    case false:
                        return '暂停中';
                }
            },
            filterEnable(val) {
                switch (val) {
                    case true:
                        return '暂停投放';
                    case false:
                        return '开始投放';
                }
            },
            filterCreatedDate(val) {
                return dateTimeFormate(val)
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

    .fwb {
        font-weight: bold;
    }

    .pagination {
        margin-top: 20px;
    }

    .adjustment {

    }
</style>
