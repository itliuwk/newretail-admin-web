<template>
    <div class="form">
        <el-form :model="ruleForm" ref="ruleForm" :rules="rule2" label-width="120px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input v-model="ruleForm.name"></el-input>
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

            <el-form-item label="活动规则" prop="note" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input type="textarea" v-model="ruleForm.note"></el-input>
            </el-form-item>

            <el-form-item label="次数限制" prop="isLimit">
                <div>
                    每人每天可抽取
                    <el-input style="width: 100px" type="text" v-model="ruleForm.maxTrys"></el-input>
                    次,共
                    <el-input type="text" style="width: 100px" v-model="ruleForm.maxTrysDaily"></el-input>
                </div>
                <div style="margin: 10px 0">
                    每人每天可中奖
                    <el-input style="width: 100px" type="text" v-model="ruleForm.maxRewards"></el-input>
                    次,共
                    <el-input type="text" style="width: 100px" v-model="ruleForm.maxRewardsDaily"></el-input>
                </div>
            </el-form-item>


            <el-form-item label="漂浮显示">
                <el-switch
                        v-model="ruleForm.float">
                </el-switch>
            </el-form-item>


            <el-form-item label="适用方式">
                <el-select v-model="ruleForm.entryType" placeholder="">
                    <el-option label="支付" value="PAY"></el-option>
                </el-select>
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

            <div class="winningSettings">
                <el-button type="primary" @click="addAwards">
                    添加奖项
                </el-button>
                <el-table
                        class="table"
                        border
                        type="index"
                        :data="ruleForm.prizes"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="奖项名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="stock"
                            label="数量"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            width="80"
                            prop="probability"
                            label="概率">
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
                                @click="editItem(lists.row)">
                            编辑
                        </span>
                            <span
                                    type="text"
                                    size="small"
                                    style="margin: 0 5px;"
                                    class="option-span"
                                    @click="removeItem(lists.row,lists.$index)"
                            >
                            删除
                        </span>


                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="bText">
                <p>未中奖设置</p>
            </div>

            <el-form-item label="标题" prop="missTitle" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input v-model="ruleForm.missTitle"></el-input>
            </el-form-item>

            <el-form-item label="提示语" prop="missDescription"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input v-model="ruleForm.missDescription"></el-input>
            </el-form-item>

            <el-form-item style="text-align: center;">
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="isLoading">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <el-dialog
                :visible.sync="dialogVisible"
                :show-close="false"
                :before-close="beforeClose"
                width="600px">
            <winning-settings ref="winningSettings" :row="row"></winning-settings>
            <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="winningSettings">确 定</el-button>
  </span>
        </el-dialog>


    </div>
</template>
<script>

    import {GET_LOCATIONS} from '@/api/common'
    import Alert from "@/utils/alert";

    import {mapActions} from "vuex";
    import {
        POST_lottery as ADD_ITEM,
        PUT_lottery as UPDATE_ITEM,
        DETAIL_lottery as DETAIL_ITEM
    } from '@/api/marketingCenter'

    import {FormateYYMMDD} from "@/filters/index";

    const WinningSettings = () => import('./winningSettings');

    export default {
        data() {
            let validatePass = (rule, value, callback) => {
                if (this.isLimit) {
                    callback()
                }
                if (!value) {
                    return callback(new Error('不能为空'));
                }


            };
            return {
                date: [],
                row: {},
                locationIds: [],
                disabled: false,
                isLoading: false,
                dialogVisible: false,
                ruleForm: {
                    id: '',
                    name: '',
                    permanent: false,
                    startDate: '',
                    endDate: '',
                    date: '',
                    isLimit: '',
                    note: '',
                    float: false,
                    maxTrys: '',
                    maxTrysDaily: '',
                    maxRewards: '',
                    missTitle: '',
                    maxRewardsDaily: '',
                    missDescription: '',
                    entryType: 'PAY',
                    locationIds: [],
                    prizes: [],
                },
                rule2: {
                    isLimit: [
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
            },
            isLimit() {
                let value = this.ruleForm;
                let flag = false;
                if (value.maxTrys && value.maxTrysDaily && value.maxRewards && value.maxRewardsDaily) {
                    return !flag
                }
            }
        },
        components: {
            WinningSettings
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

            addAwards() {
                let row = {
                    edit: 'add',
                    type: 'COUPON',
                    name: '',
                    stock: '',
                    itemId: '',
                    probability: '',
                };
                this.row = row;
                this.dialogVisible = true
            },

            winningSettings() {
                let winningSettings = this.$refs['winningSettings'].$refs['form'];
                winningSettings.validate(valid => {
                    if (valid) {
                        this.dialogVisible = false;
                        let prizes = JSON.parse(JSON.stringify(this.ruleForm.prizes));
                        let model = winningSettings.model;
                        prizes.map(item => {
                            if (item.edit == 'edit') {
                                item.name = model.name;
                                item.stock = model.stock;
                                item.type = model.type;
                                item.itemId = model.coupon || model.card;
                                item.probability = model.probability;
                                item.edit = '';
                            }
                            return item;
                        });

                        if (model.edit == 'add') {
                            prizes.push(model)
                        }

                        this.ruleForm = {
                            ...this.ruleForm,
                            prizes
                        };
                    }
                })
            },
            cancel() {
                this.dialogVisible = false;
                this.$refs['winningSettings'].$refs['form'].resetFields();
            },

            beforeClose() {
                this.dialogVisible = false;
                this.$refs['winningSettings'].$refs['form'].resetFields();
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


            editItem(row, index) {
                this.dialogVisible = true;
                row.edit = 'edit';
                this.row = row;
            },

            removeItem(row, index) {
                let prizes = JSON.parse(JSON.stringify(this.ruleForm.prizes));
                let newArr = [];
                prizes.map((item, idx) => {
                    if (index != idx) {
                        newArr.push(item)
                    }
                    return item;
                });
                this.ruleForm = {
                    ...this.ruleForm,
                    prizes: newArr
                };
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
                let luckyDrawDetails = this.$refs['ruleForm'];


                luckyDrawDetails.validate((val) => {
                    if (val) {
                        if (!this.ruleForm.prizes.length) {
                            Alert.fail('中奖设置不能为空');
                            return false
                        }
                        that.isLoading = true;
                        if (!that.ruleForm.id) {
                            console.log(that.ruleForm);
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

    .option-span {
        color: #409EFF;
        cursor: pointer;
    }

    .winningSettings {
        border-radius: 10px;
        max-width: 500px;
        margin-left: 120px;

        .table {
            margin-top: 20px;
        }

        .el-table {
            border-radius: 4px;
        }
    }


</style>
