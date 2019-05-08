<template>
    <div class="form">
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules2" label-width="120px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input v-model="ruleForm.name" :disabled="DISABLED"></el-input>
            </el-form-item>


            <el-form-item label="门槛">
                <el-switch
                        :disabled="DISABLED"
                        v-model="ruleForm.applyRule"
                        active-text="无门槛">
                </el-switch>
            </el-form-item>

            <el-form-item label="" v-if="!ruleForm.applyRule" prop="isFull">
                <el-radio-group v-model="ruleForm.isMinQuantity" :disabled="DISABLED" @change="applyRuleFun">
                    <el-radio label="minQuantity">
                        满
                        <el-input style="width: 80px" :disabled="DISABLED || !isMinQuantity"
                                  @change="minQuantityFun" v-model="ruleForm.minQuantity"></el-input>
                        件
                    </el-radio>
                    <el-radio label="minAmount">
                        满
                        <el-input style="width: 80px" :disabled="DISABLED || isMinQuantity"
                                  @change="minAmountFun" v-model="ruleForm.minAmount"></el-input>
                        元
                    </el-radio>
                </el-radio-group>
            </el-form-item>


            <el-form-item label="参与次数">
                <el-switch
                        :disabled="DISABLED"
                        v-model="ruleForm.isUnlimited"
                        active-text="无限制">
                </el-switch>
            </el-form-item>

            <el-form-item v-if="!ruleForm.isUnlimited" prop="limitPerCustomer"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                每人参与
                <el-input style="width: 80px" :disabled="DISABLED" v-model="ruleForm.limitPerCustomer"></el-input>
                次
            </el-form-item>


            <el-form-item label="活动时间">
                <el-switch :disabled="disabled"
                           v-model="ruleForm.permanent"
                           active-text="永久有效">
                </el-switch>
            </el-form-item>

            <el-form-item label="" v-if="!ruleForm.permanent" prop="date"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-date-picker
                        :disabled="disabled"
                        v-model="date"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>


            <el-form-item label="选择优惠券" prop="couponId" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-select v-model="ruleForm.couponId" :disabled="DISABLED" placeholder="选择优惠券">
                    <el-option v-for="item in coupons" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="选择场地">
                <el-select v-model="ruleForm.locationIds" :disabled="DISABLED" placeholder="选择场地" multiple
                           :clearable="true">
                    <el-option v-for="item in locationIds" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item style="text-align: center;" v-if="!DISABLED">
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="isLoading">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>


        </el-form>


    </div>
</template>
<script>

    import {GET_LOCATIONS, GET_COUPONS} from '@/api/common'
    import Alert from "@/utils/alert";

    import {mapActions} from "vuex";
    import {
        POST_payGiftOffers as ADD_ITEM,
        PUT_payGiftOffers as UPDATE_ITEM,
        DETAIL_payGiftOffers as DETAIL_ITEM
    } from '@/api/marketingCenter'

    import {FormateYYMMDD, dateTimeFormateHHmm} from "@/filters/index";

    export default {
        data() {
            let validatePass = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                callback()
            };
            return {
                isLoading: false,
                noThreshold: false, // 无门槛
                noRestriction: false, // 不限制
                disabled: false,
                DISABLED: false,
                isMinQuantity: true,
                date: [],
                locationIds: [],
                coupons: [],
                ruleForm: {
                    id: '',
                    name: '',
                    isFull: '',
                    permanent: false,
                    startDate: '',
                    endDate: '',
                    date: '',
                    isMinQuantity: 'minQuantity',
                    limitPerCustomer: '',
                    applyRule: false,
                    isUnlimited: false,
                    locationIds: [],
                    couponId: ''
                },
                rules2: {
                    isFull: [
                        {validator: validatePass, trigger: 'blur'}
                    ]
                }
            };
        },
        computed: {
            id() {
                return this.$route.query.id
            },
            state() {
                return this.$route.query.state
            }
        },
        mounted() {
            if (this.id) {
                this.getDetailItem();
                this.ruleForm = {
                    ...this.ruleForm,
                    id: this.id
                }
            }

            GET_LOCATIONS().then(res => {
                this.locationIds = res
            });

            GET_COUPONS().then(res => {
                this.coupons = res
            })
        },
        watch: {
            date(val) {
                this.ruleForm = {
                    ...this.ruleForm,
                    date: val,
                    startDate: val[0],
                    endDate: val[1]
                };
            }
        },
        methods: {
            ...mapActions([
                "delVisitedView"
            ]),
            /**
             * 获取商品详情
             */
            getDetailItem() {
                DETAIL_ITEM(this.id).then(res => {
                    this.date.push(res.startDate);
                    this.date.push(res.endDate);
                    this.disabled = true;

                    if (this.state == 'DISABLED') {
                        this.DISABLED = true
                        Alert.fail('已失效的活动不能编辑,只能查看');
                    }

                    if (res.limitPerCustomer === 0) {
                        res.isUnlimited = true
                    }
                    res.isFull = res.minQuantity || res.minAmount;
                    this.ruleForm = res;


                    if (res.minQuantity) {
                        this.ruleForm = {
                            ...this.ruleForm,
                            isMinQuantity: 'minQuantity'
                        };
                        this.isMinQuantity = true
                    } else {
                        this.ruleForm = {
                            ...this.ruleForm,
                            isMinQuantity: 'minAmount'
                        };
                        this.isMinQuantity = false
                    }
                })
            },


            minQuantityFun(val) {
                this.ruleForm = {
                    ...this.ruleForm,
                    isFull: val
                }
            },

            minAmountFun(val) {
                this.ruleForm = {
                    ...this.ruleForm,
                    isFull: val
                }
            },


            applyRuleFun(val) {
                if (val = 'minQuantity') {
                    this.ruleForm = {
                        ...this.ruleForm,
                        minAmount: '',
                        minQuantity: ''
                    };
                    this.isMinQuantity = !this.isMinQuantity
                } else {
                    this.ruleForm = {
                        ...this.ruleForm,
                        minQuantity: '',
                        minAmount: ''
                    };
                    this.isMinQuantity = !this.isMinQuantity
                }
            },
            /**
             * 无门槛
             */
            noThresholdFun(val) {
                this.noThreshold = val;
                if (val) {
                    this.ruleForm = {
                        ...this.ruleForm,
                        minAmount: ' '
                    }
                } else {
                    this.ruleForm = {
                        ...this.ruleForm,
                        minAmount: '',
                        startDate: '',
                        endDate: ''
                    }
                }

            },

            /**
             * 不限制
             */
            noRestrictionFun(val) {
                this.noRestriction = val;
            },

            /**
             * 重置
             */
            resetForm() {
                this.$refs['ruleForm'].resetFields();
            },

            /**
             * 提交
             */
            submitForm() {
                let that = this;
                let paymentOfCourtesyDetails = this.$refs['ruleForm'];
                paymentOfCourtesyDetails.validate((val) => {

                    if (val) {
                        that.isLoading = true;
                        if (that.ruleForm.isUnlimited) {
                            that.ruleForm = {
                                ...that.ruleForm,
                                limitPerCustomer: 0
                            }
                        }
                        if (!that.ruleForm.id) {
                            ADD_ITEM({...that.ruleForm}).then(res => {
                                setTimeout(() => {
                                    Alert.success('新建成功');
                                    that.isLoading = false;
                                    that.delVisitedView(that.$route).then(res => {
                                        that.$router.go(-1);
                                    });
                                }, 1500);

                            }).catch(err => {
                                Alert.fail(err);
                                that.isLoading = false;
                            })
                        } else {
                            UPDATE_ITEM({...that.ruleForm}).then(res => {
                                setTimeout(() => {
                                    Alert.success('更新成功');
                                    that.isLoading = false;
                                    that.delVisitedView(that.$route).then(res => {
                                        that.$router.go(-1);
                                    });
                                }, 1500);

                            }).catch(err => {
                                Alert.fail(err);
                                that.isLoading = false;
                            })
                        }


                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form {
        height: 100%;
        background: #fff;
        padding: 30px 30px 30px 0;
    }

    .file {
        position: relative;
        top: 0;
        display: inline-block;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        width: 110px;
        height: 140px;
        text-align: center;
        line-height: 85px;
        font-size: 40px;

        input {
            position: absolute;
            font-size: 100px;
            right: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
        }
    }

    .image {
        width: 110px;
        height: 140px;
        position: relative;

        img {
            width: 100%;
            height: 100%;
        }

        i {
            position: absolute;
            top: -6px;
            right: -6px;
            display: inline-block;
            width: 15px;
            height: 15px;
            line-height: 15px;
            text-align: center;
            background: red;
            border-radius: 50%;
            color: #fff;
            cursor: pointer;
        }
    }

    .el-textarea {
        width: 400px;
        height: 80px;
        resize: none;

        &.el-textarea__inner {
            resize: none;
        }
    }

    .el-form-item__content {
        position: relative;

        .info {
            position: absolute;
            font-size: 12px;
            top: 48px;
            color: #ccc;
            line-height: normal;
        }
    }

</style>
