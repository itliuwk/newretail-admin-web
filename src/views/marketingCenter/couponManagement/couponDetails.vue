<template>
    <div class="form">
        <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="优惠券名称" prop="name" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="优惠形式" prop="type">
                <el-radio-group v-model="ruleForm.type" :disabled="disabled" @change="typeChange">
                    <el-radio label="AMOUNT_OFF">减免</el-radio>
                    <el-radio label="DISCOUNT_RATE">打折</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="优惠额度" prop="amount" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <div v-if="ruleForm.type=='AMOUNT_OFF'">
                    <span style="margin-right: 10px;">减免</span>
                    <el-input type="number" style="width: 100px" :disabled="disabled"
                              v-model="ruleForm.amount"></el-input>
                    <span style="margin-left: 10px;">元</span>
                </div>
                <div v-else>
                    <span style="margin-right: 10px;">打</span>
                    <el-input type="number" style="width: 100px" :disabled="disabled"
                              v-model="ruleForm.amount"></el-input>
                    <span style="margin-left: 10px;">折</span>
                </div>
            </el-form-item>


            <el-form-item label="使用门槛" prop="minAmount" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">

                <el-checkbox v-model="noThreshold" :disabled="disabled" @change="noThresholdFun">无门槛</el-checkbox>

                <div style="display: inline-block" v-if="!noThreshold">
                    <span style="margin:0 10px 0 30px;">订单满</span>
                    <el-input style="width: 100px" :disabled="disabled" v-model="ruleForm.minAmount"></el-input>
                    <span style="margin-left: 10px;">元使用</span>
                </div>
            </el-form-item>


            <el-form-item label="有效期">
                <el-radio-group v-model="ruleForm.dateRule" :disabled="disabled">
                    <el-radio label="FIXED">固定时间</el-radio>
                    <el-radio label="AFTER_ACQUIRED">领取后*天有效</el-radio>
                </el-radio-group>
            </el-form-item>


            <el-form-item label="" v-if="ruleForm.dateRule=='FIXED'" prop="date"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-date-picker
                        v-model="date"
                        :disabled="disabled"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>


            <el-form-item label=" " v-else prop="validDays"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input type="number" style="width: 100px" :disabled="disabled"
                          v-model="ruleForm.validDays"></el-input>
                <span style="margin-left: 10px;">天</span>
                <span style="margin-left: 10px;font-size: 12px;color: #999;">有效期最后一天23:59</span>
            </el-form-item>


            <el-form-item label="发放总量" prop="maxStock" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input style="width: 100px" :disabled="disabled" v-model="ruleForm.maxStock"></el-input>
                <span style="margin-left: 10px;">张</span>
                <span style="margin-left: 10px;font-size: 12px;color: #999;">修改优惠券总量时,只能增加不能减少,请谨慎选择</span>
            </el-form-item>


            <el-form-item label="领取限制">
                <el-checkbox v-model="noRestriction" :disabled="disabled" @change="noRestrictionFun">不限制</el-checkbox>
            </el-form-item>


            <el-form-item label="" prop="limitPerCustomer" v-if="!noRestriction"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <span style="margin-right:10px;">每位用户可领取</span>
                <el-input style="width: 100px" :disabled="disabled" v-model="ruleForm.limitPerCustomer"></el-input>
                <span style="margin-left: 10px;">张优惠券</span>
            </el-form-item>


            <el-form-item label="选择场地">
                <el-select v-model="ruleForm.locationIds" :disabled="disabled" placeholder="选择场地" multiple
                           :clearable="true">
                    <el-option v-for="item in locationIds" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item style="text-align: center;">
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="isLoading">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>


        </el-form>


    </div>
</template>
<script>
    import {GET_LIST_CATEGORIES} from '@/api/commodityManagement'
    import {GET_LOCATIONS} from '@/api/common'
    import Alert from "@/utils/alert";

    import {mapActions} from "vuex";
    import {
        POST_coupons as ADD_ITEM,
        PUT_coupons as UPDATE_ITEM,
        DETAIL_coupons as DETAIL_ITEM,
    } from '@/api/marketingCenter'

    import {FormateYYMMDD} from "@/filters/index";

    export default {
        data() {
            return {
                noThreshold: false, // 无门槛
                noRestriction: false, // 不限制
                isLoading: false,
                disabled: false,
                date: [],
                locationIds: [],
                ruleForm: {
                    id: '',
                    name: '',
                    type: 'AMOUNT_OFF',
                    amount: '',
                    minAmount: '',
                    dateRule: 'FIXED',
                    validDays: '',
                    maxStock: '',
                    limitPerCustomer: '',
                    startDate: '',
                    endDate: '',
                    date: '',
                    locationIds: ''
                }
            };
        },
        props: ['currId'],
        computed: {
            id() {
                return this.$route.query.id
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
                if (this.id) {
                    res.unshift({
                        id: 9587,
                        name: '全部场地'
                    });
                }
                this.locationIds = res
            })


        },
        watch: {
            date(val) {
                this.ruleForm = {
                    ...this.ruleForm,
                    date: val,
                    startDate: FormateYYMMDD(val[0]),
                    endDate: FormateYYMMDD(val[1])
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
                    if (res.minAmount === 0 || !res.minAmount) {
                        this.noThreshold = true;
                        res.minAmount = 666
                    }
                    if (res.limitPerCustomer === 0) {
                        this.noRestriction = true
                    }
                    if (res.locationIds.length === 0) {
                        res.locationIds.unshift(9587);
                    }
                    this.disabled = true;
                    this.ruleForm = res;
                })
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
                        minAmount: ''
                    }
                }

            },

            typeChange(val) {
                this.ruleForm = {
                    ...this.ruleForm,
                    amount: ''
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
                let couponDetails = this.$refs['ruleForm'];
                couponDetails.validate((val) => {
                    if (val) {
                        that.isLoading = true;
                        if (!that.ruleForm.id) {

                            ADD_ITEM({...that.ruleForm}).then(res => {
                                setTimeout(() => {
                                    Alert.success('新建成功');
                                    that.isLoading = false;
                                    that.delVisitedView(that.$route).then(res => {
                                        that.$router.go(-1);
                                    });
                                }, 1500);

                            }).catch(err=>{
                                that.isLoading = false;
                            })
                        } else {
                            if (that.ruleForm.minAmount == 666) {
                                that.ruleForm.minAmount = ''
                            }

                            if (that.ruleForm.locationIds[0] == 9587) {
                                that.ruleForm.locationIds = []
                            }
                            UPDATE_ITEM({...that.ruleForm}).then(res => {
                                setTimeout(() => {
                                    Alert.success('更新成功');
                                    that.isLoading = false;
                                    that.delVisitedView(that.$route).then(res => {
                                        that.$router.go(-1);
                                    });
                                }, 1500);

                            }).catch(err=>{
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
