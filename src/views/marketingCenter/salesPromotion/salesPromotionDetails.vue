<template>
    <div class="form">
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules2" label-width="120px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input :disabled="DISABLED" v-model="ruleForm.name"></el-input>
            </el-form-item>


            <el-form-item label="门槛">
                <el-switch
                        :disabled="DISABLED"
                        v-model="ruleForm.applyRule"
                        active-text="无门槛">
                </el-switch>
            </el-form-item>

            <el-form-item label="" v-if="!ruleForm.applyRule" prop="isFull">
                <el-radio-group v-model="ruleForm.isMinQuantity" @change="applyRuleFun">
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


            <el-form-item label="优惠方式" prop="isDiscount">
                <el-radio-group v-model="ruleForm.discountType" :disabled="DISABLED" @change="discountTypeFun">
                    <el-radio label="DISCOUNT_RATE">
                        打
                        <el-input style="width: 80px" :disabled="DISABLED || !isDISCOUNT_RATE"
                                  @change="discountFun" v-model="ruleForm.discount"></el-input>
                        折
                    </el-radio>
                    <el-radio label="AMOUNT_OFF">
                        减
                        <el-input style="width: 80px" :disabled="DISABLED || isDISCOUNT_RATE"
                                  @change="reduceMoneyFun" v-model="ruleForm.reduceMoney"></el-input>
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

            <el-form-item label="" v-if="!ruleForm.isUnlimited" prop="limitPerCustomer"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                每人参与
                <el-input style="width: 80px" :disabled="DISABLED" v-model="ruleForm.limitPerCustomer"></el-input>
                次
            </el-form-item>


            <el-form-item label="活动时间">
                <el-switch
                        :disabled="disabled"
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

    import {GET_LOCATIONS} from '@/api/common'
    import Alert from "@/utils/alert";

    import {mapActions} from "vuex";
    import {
        POST_discountOffers as ADD_ITEM,
        PUT_discountOffers as UPDATE_ITEM,
        DETAIL_discountOffers as DETAIL_ITEM
    } from '@/api/marketingCenter'

    import {FormateYYMMDD} from "@/filters/index";

    export default {
        data() {
            let validatePass = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                callback()
            };
            let isDiscount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                callback()
            };
            return {

                isMinQuantity: true,
                isDISCOUNT_RATE: true,
                DISABLED: false,
                disabled: false,
                isLoading: false,
                date: [],
                locationIds: [],
                ruleForm: {
                    id: '',
                    name: '',
                    permanent: false,
                    startDate: '',
                    endDate: '',
                    date: '',
                    isFull: '',
                    isDiscount: '',
                    limitPerCustomer: '',
                    isMinQuantity: 'minQuantity',
                    applyRule: false,
                    discountType: 'DISCOUNT_RATE',
                    isUnlimited: false,
                    discount: '',
                    reduceMoney: '',
                    isPiece: '',
                    locationIds: []
                },
                rules2: {
                    isFull: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    isDiscount: [
                        {validator: isDiscount, trigger: 'blur'}
                    ]
                },
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
                        this.DISABLED = true;
                        Alert.fail('已失效的活动不能编辑,只能查看');
                    }

                    if (res.limitPerCustomer === 0) {
                        res.isUnlimited = true
                    }

                    res.isFull = res.minQuantity || res.minAmount;
                    res.isDiscount = res.discount || res.reduceMoney;
                    this.ruleForm = res;


                    if (res.discountType == 'AMOUNT_OFF') {
                        this.ruleForm = {
                            ...this.ruleForm,
                            reduceMoney: res.discount,
                            discount: '',
                            isDiscount: res.reduceMoney || res.discount
                        }
                    }

                    if (this.ruleForm.reduceMoney) {
                        this.isDISCOUNT_RATE = false
                    } else {
                        this.isDISCOUNT_RATE = true
                    }

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

            discountFun(val) {
                this.ruleForm = {
                    ...this.ruleForm,
                    isDiscount: val
                }
            },

            reduceMoneyFun(val) {
                this.ruleForm = {
                    ...this.ruleForm,
                    isDiscount: val
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

            discountTypeFun(val) {
                if (val = 'DISCOUNT_RATE') {
                    this.ruleForm = {
                        ...this.ruleForm,
                        discount: '',
                        reduceMoney: ''
                    };
                    this.isDISCOUNT_RATE = !this.isDISCOUNT_RATE
                } else {
                    this.ruleForm = {
                        ...this.ruleForm,
                        discount: '',
                        reduceMoney: ''
                    };
                    this.isDISCOUNT_RATE = !this.isDISCOUNT_RATE
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
                let salesPromotionDetails = this.$refs['ruleForm'];
                salesPromotionDetails.validate((val) => {
                    if (val) {
                        that.isLoading = true;
                        if (that.ruleForm.isUnlimited) {
                            that.ruleForm = {
                                ...that.ruleForm,
                                limitPerCustomer: 0
                            }
                        }

                        if (this.ruleForm.discountType == 'AMOUNT_OFF') {
                            that.ruleForm = {
                                ...that.ruleForm,
                                discount: this.ruleForm.reduceMoney
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
