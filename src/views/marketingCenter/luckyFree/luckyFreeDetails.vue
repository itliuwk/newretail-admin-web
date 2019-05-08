<template>
    <div class="form">
        <el-form :model="ruleForm" ref="ruleForm" label-position="center" label-width="120px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input style="min-width: 120px;width: 400px;" v-model="ruleForm.name"></el-input>
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

            <el-form-item label="活动规则"  prop="note" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input type="textarea" v-model="ruleForm.note"></el-input>
            </el-form-item>

            <el-form-item label="选择场地">
                <el-select v-model="ruleForm.locationIds" placeholder="选择场地" multiple :clearable="true">
                    <el-option v-for="item in locationIds" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <div class="bText">
                <p>中奖设置</p>
            </div>

            <el-form-item label="中奖浮动比例">
                <el-tooltip class="item" placement="top">
                    <div slot="content">注意事项:<br/>A.抽奖档位有三个档次:<br/> “1元”、“x3倍”、“x5倍”,<br/> 具体档位由该笔订单总金额决定; <br/>如:<br/>订单总金额
                        > 5元, 会出现三个大乐购档次;<br/> B.中奖概率 = 抽奖档次 / 订单金额 + (抽奖档次 / 订单金额 * 中奖浮动比例
                    </div>
                    <svg-icon icon-class="wen"
                              style="position: relative;right:10px;cursor: pointer;color: #188ae2;"></svg-icon>
                </el-tooltip>

                <el-switch
                        v-model="ruleForm.enableProbabilityAdjustment"
                        active-text="不设置">
                </el-switch>
            </el-form-item>

            <el-form-item label=""  prop="probabilityAdjustment" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]" v-if="!ruleForm.enableProbabilityAdjustment">
                中奖概率上浮
                <el-input style="width: 80px" v-model="ruleForm.probabilityAdjustment"></el-input>
                %
            </el-form-item>

            <el-form-item  label="显示真实概率" v-if="!ruleForm.enableProbabilityAdjustment">
                <el-switch
                        v-model="ruleForm.showRealProbability"
                        active-text="显示">
                </el-switch>
            </el-form-item>

            <el-form-item label="中奖阈值" prop="maxRate" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]" >
                <el-tooltip class="item" placement="top">
                    <div slot="content">中奖阀值 - 累计收入大于等于订单金额 + （中奖阀值百分比 × 订单金额）， 必中奖。<br/> 举例：<br/> 假设订单金额20元，
                        抽奖档次为1元/1倍， 不设置中奖浮动比例， 则单次中奖概率为1 / 20 = 5%<br/> 如果中奖阀值设置成10%， 则累计收入大于等于 20 + （10% × 20） = 22时，
                        必中奖。
                    </div>
                    <svg-icon icon-class="wen"
                              style="position: relative;right:10px;cursor: pointer;color: #188ae2;"></svg-icon>
                </el-tooltip>
                <el-input style="width: 80px" v-model="ruleForm.maxRate"></el-input>
                %
            </el-form-item>

            <el-form-item label="中奖保底值" prop="minRate" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-tooltip class="item" placement="top">
                    <div slot="content">中奖保底值 - 累计收入若小于订单金额 × 中奖保底值%， 必定不中奖， 保证最低收入。<br/> 举例：<br/> 假设订单金额20元，
                        抽奖档次为1元/1倍， 不设置中奖浮动比例， 则单次中奖概率为1 / 20 = 5% <br/>如果中奖保底值设置成10%， 则累计收入小于 20 × 10% = 2时， 必定不中奖。
                    </div>
                    <svg-icon icon-class="wen"
                              style="position: relative;right:10px;cursor: pointer;color: #188ae2;"></svg-icon>
                </el-tooltip>
                <el-input style="width: 80px" v-model="ruleForm.minRate"></el-input>
                %
            </el-form-item>

            <div class="bText">
                <p>概率计算</p>
            </div>


            <el-form-item label="订单金额">
                <el-input style="width: 150px" v-model="ruleForm.orderTotal"></el-input>
            </el-form-item>

            <el-form-item label="档次">
                <el-select v-model="ruleForm.times" placeholder="请选择档次">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="5" value="5"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="success" @click="calculation">计算</el-button>
            </el-form-item>

            <div class="bText">
                <p>计算结果</p>
            </div>

            <div class="result">
                <div>

                    <p>真实概率 <span>{{calculationResults.realProbability||0}}</span> %</p>
                    <p>抽奖最多 <span>{{calculationResults.maxCount||0}}</span> 次必中,收入最高 <span>{{calculationResults.paidMax||0}}</span>
                        元</p>
                </div>
                <div>
                    <p>显示概率 <span>{{calculationResults.probability||0}}</span> %</p>
                    <p>抽奖最少 <span>{{calculationResults.minCount||0}}</span> 次才有机会中奖,收入最底 <span>{{calculationResults.paidMin||0}}</span>
                        元</p>
                </div>
                <div>
                    <p>中奖金额 <span>{{calculationResults.price||0}}</span> 元</p>
                </div>
            </div>


            <el-form-item style="text-align: center;">
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
        POST_luckfree as ADD_ITEM,
        PUT_luckfree as UPDATE_ITEM,
        DETAIL_luckfree as DETAIL_ITEM,
        luckfree_calculate
    } from '@/api/marketingCenter'

    import {FormateYYMMDD} from "@/filters/index";

    export default {
        data() {
            return {
                date: [],
                isLoading: false,
                disabled: false,
                locationIds: [],
                calculationResults: {},
                ruleForm: {
                    id: '',
                    name: '',
                    permanent: false,
                    enableProbabilityAdjustment: false,
                    showRealProbability: false,
                    startDate: '',
                    endDate: '',
                    date: '',
                    probabilityAdjustment: '',
                    maxRate: '',
                    minRate: '',
                    note: '',
                    orderTotal: '',
                    times: '',
                    locationIds: []
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
                    this.ruleForm = res;
                })
            },


            /**
             * 计算
             */
            calculation() {
                if (!this.ruleForm.orderTotal) {
                    Alert.fail('订单金额必填');
                    return false;
                }
                if (!this.ruleForm.times) {
                    Alert.fail('档次必填');
                    return false;
                }
                let obj  ={
                    times: this.ruleForm.times,
                    orderTotal:this.ruleForm.orderTotal,
                    probabilityAdjustment: this.ruleForm.probabilityAdjustment,
                    showRealProbability: this.ruleForm.showRealProbability,
                    minRate: this.ruleForm.minRate,
                    maxRate: this.ruleForm.maxRate,
                };
                luckfree_calculate({...obj}).then(res => {
                    console.log(res);
                    this.calculationResults = res
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
                let luckyFreeDetails = this.$refs['ruleForm'];
                luckyFreeDetails.validate((val) => {
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

                            }).catch(err=>{
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
        padding-top: 30px;
    }


    .bText {
        border-top: 1px solid #d9d9d9;
        position: relative;
        margin: 30px 0;

        p {
            position: absolute;
            top: -25px;
            left: 40px;
            background: #fff;
            font-weight: bolder;
            padding: 0 10px;
        }
    }

    .result {
        padding-left: 30px;

        div {
            display: flex;

            p:nth-child(1) {
                min-width: 150px;
            }

            p:nth-child(2) {
                position: relative;
                top: 20px;
            }

            span {
                color: #188ae2;
            }
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
