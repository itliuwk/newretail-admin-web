<template>
    <div class="form">
        <el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="设为管理员" prop="admin">
                <el-switch
                        v-model="ruleForm.admin"
                        active-color="#13ce66"
                        @change="isAdmin"
                        inactive-color="#ccc">
                </el-switch>
            </el-form-item>
            <el-form-item v-if="!ruleForm.admin" label="角色" prop="roleId"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-select v-model="ruleForm.roleId" placeholder="">
                    <el-option v-for="item in roles" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="!ruleForm.admin" label="场地" prop="locationIds">
                <span style="cursor: pointer;" v-if="!ruleForm.locationIds.length"
                      @click="addLocationIds=true,isSel=true">选择场地</span>
                <span style="cursor: pointer;" v-else
                      @click="addLocationIds=true,isSel=true">{{ruleForm.locationIds.length}}个场地</span>
                <div v-show="isLocationIds" class="el-form-item__error">
                    不能为空
                </div>
            </el-form-item>
            <el-form-item v-if="!isView" label="密码" prop="password"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item v-if="!isView" label="确认密码" prop="confirmPassword"
                          :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                <el-input v-model="ruleForm.confirmPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center;">
                <el-button type="primary" @click="submitForm('ruleForm')">{{submitInfo}}</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>


        <el-dialog
                width="300px"
                :visible.sync="addLocationIds">
            <add-equipment v-if="isSel" ref="transfer" :locationIds="ruleForm.locationIds"></add-equipment>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addLocationIds = false,isSel=false">取消</el-button>
                <el-button type="primary" @click="determine">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import Alert from "@/utils/alert";
    import AddEquipment from "./addEquipment.vue"
    import {
        ADD_ACCOUNT_LIST,
        DETAIL_ACCOUNT_LIST,
        ROLES_SEL,
        UPDATE_ACCOUNT_LIST
    } from '@/api/privilegeManagement'
    import {mapActions} from 'vuex'


    export default {
        data() {
            return {
                isLocationIds: false,
                isSel: true,
                isView: false,
                submitInfo: '立即创建',
                addLocationIds: false,
                addSourceMaterial: false,
                ruleForm: {
                    name: '',
                    username: '',
                    mobile: '',
                    roleId: '',
                    admin: false,
                    locationIds: [],
                    password: '',
                    confirmPassword: ''
                },
                roles: []
            };
        },
        components: {
            AddEquipment
        },
        mounted() {
            this.getDetail();
            this.getRolesList();
        },
        methods: {
            ...mapActions(["delVisitedView"]),
            /**
             * 获取列表数据
             */
            getDetail() {
                let id = this.$route.query.id;
                if (id != undefined) {
                    this.isView = true;
                    this.submitInfo = '立即更新';
                    let params = {
                        id
                    };
                    DETAIL_ACCOUNT_LIST(params).then(res => {
                        res.locationIds = res.locationIds == null ? [] : res.locationIds;
                        this.ruleForm = res
                    });
                }

            },

            getRolesList() {
                ROLES_SEL().then(res => {
                    this.roles = res
                });
            },

            /**
             * 是否管理员
             */
            isAdmin(val) {
                console.log(val);
            },

            /**
             * 确定
             */
            submitForm(formName) {
                let that = this;
                let id = this.$route.query.id;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!that.ruleForm.admin) {
                            if (!that.ruleForm.locationIds.length) {
                                that.isLocationIds = true;
                                return false;
                            }
                        }

                        if (id != undefined) {
                            that.UPDATE_ACCOUNT_LIST(that.ruleForm, id)
                        } else {
                            if (that.ruleForm.password.length < 6) {
                                Alert.fail('密码不能小于6位');
                                return false
                            }


                            if (that.ruleForm.password != that.ruleForm.confirmPassword) {
                                Alert.fail('密码不一致,请重新输入');
                                return false
                            }

                            that.ADD_ACCOUNT_LIST(that.ruleForm)
                        }


                    }
                });
            },

            /**
             * 新增角色
             */
            ADD_ACCOUNT_LIST(ruleForm) {
                let that = this;
                ADD_ACCOUNT_LIST(ruleForm).then(res => {
                    Alert.success('创建成功');
                    setTimeout(() => {
                        that.delVisitedView(that.$route).then(res => {
                            that.$router.go(-1);
                        });
                    }, 1000)
                }).catch(res => {
                    Alert.fail('姓名或用户名重复，请重新输入')
                })
            },

            /**
             * 更新角色
             */
            UPDATE_ACCOUNT_LIST(ruleForm, id) {
                let that = this;
                console.log(ruleForm);
                ruleForm.id = id;
                UPDATE_ACCOUNT_LIST(ruleForm).then(res => {
                    Alert.success('更新成功');
                    setTimeout(() => {
                        that.delVisitedView(that.$route).then(res => {
                            that.$router.go(-1);
                        });
                    }, 1000)
                })
            },

            /**
             * 重置
             */

            resetForm(formName) {
                this.ruleForm = {
                    name: '',
                    username: '',
                    mobile: '',
                    roleId: '',
                    admin: false,
                    locationIds: [],
                    password: '',
                    confirmPassword: ''
                };
                this.getDetail();
            },

            determine() {
                let childList = [];
                this.$refs.transfer.list.map((item) => {
                    if (item.checked) {
                        childList.push(item.id)
                    }
                    return item
                });
                this.addLocationIds = false;
                this.isSel = false;
                if (!this.ruleForm.admin) {
                    if (childList.length) {
                        this.isLocationIds = false
                    }
                }


                this.ruleForm = {
                    ...this.ruleForm,
                    locationIds: childList
                }

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
</style>
