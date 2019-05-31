<template>
    <div>
        <form-container label="名称" @submit="submitForm" @resetForm="resetForm"></form-container>
        <div class="table">
            <el-row>
                <router-link :to="`/privilegeManagement/account/opiModel`">
                    <el-button type="primary">
                        新增用户
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
                        label="用户名">
                    <template slot-scope="lists">
                        <router-link class="option-span"
                                     :to="`/privilegeManagement/account/opiModel?id=${lists.row.id}`">
                            {{lists.row.username}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="联系方式">
                </el-table-column>
                <el-table-column
                        prop="clientName"
                        label="所属组织">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="账号状态">
                </el-table-column>
                <el-table-column
                        prop="createdDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="lists">
                        <span
                                type="text"
                                size="small"
                                class="option-span"
                                @click="suspensionOfRelease(lists.row.id,lists.row.enabled)"
                        >
                            <span>{{lists.row.enabled?"禁用":"启用"}}</span>
                        </span>
                        <span
                                size="small"
                                class="option-span"
                                style="margin: 0 5px;"
                                @click="changePassword(lists.row.id)">
                            修改密码
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
                title="修改密码"
                width="300px"
                :visible.sync="isPassword">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="密码" prop="password" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword"
                              :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                    <el-input type="password" v-model="ruleForm.confirmPassword"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isPassword = false">取消</el-button>
                <el-button type="primary" @click="determine('ruleForm')">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {
        GET_ACCOUNT_LIST,
        COUNT_ACCOUNT_LIST,
        PASSWORD_ACCOUNT_LIST,
        DELETE_ACCOUNT_LIST,
        ENABLE_ACCOUNT_LIST,
        DISABLE_ACCOUNT_LIST
    } from '@/api/privilegeManagement'

    import {GET_clientsSel} from '@/api/common'

    import Alert from "@/utils/alert";
    import {pageSize} from '../../../config';
    import {dateTimeFormate} from "@/filters/index";

    const FormContainer = () => import('./form.vue');

    export default {
        name: "productList",
        data() {
            return {
                isLoading: false,
                hackReset: true,
                isPassword: false,
                lists: [],
                count: 0,
                id: '',
                params: {
                    from: 0,
                    size: pageSize,
                    query: ''
                },
                ruleForm: {
                    password: '',
                    confirmPassword: '',
                }
            }
        },
        mounted() {
            this.params={
                ...this.params,
                clientId:this.$route.query.clientId
            };
            this.getList();
            this.getCount();
        },
        components: {
            FormContainer
        },
        methods: {

            /**
             * 获取列表数据
             */
            getList() {
                GET_ACCOUNT_LIST(this.params).then(res => {
                    res.map((item) => {
                        item.state = item.enabled == true ? '启用' : '禁用';
                        item.createdDate = dateTimeFormate(item.createdDate);
                        return item
                    });
                    this.lists = res
                });
            },


            /**
             * 获取总数
             */
            getCount() {
                COUNT_ACCOUNT_LIST(this.$route.query.clientId).then(res => {
                    this.count = res
                });
            },

            /**
             * 查询
             */
            submitForm(res) {
                console.log(res);
                this.params = {
                    ...this.params,
                    query: res.name,
                    clientId: res.clientId
                };
                this.getList()
            },

            /**
             * 重置
             */
            resetForm() {
                this.params = {
                    from: 0,
                    size: pageSize,
                    query: '',
                    clientId: ''
                };
                this.getList()
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
                    let params = {
                        id
                    };
                    DELETE_ACCOUNT_LIST(params).then((res) => {
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

            /**
             * 编辑商品
             */
            editItem(id) {
                this.hackReset = true;
                this.id = id
            },

            suspensionOfRelease(id, enabled) {
                if (enabled) {
                    this.PUBLISHED(id)
                } else {
                    this.PAUSEDANDPENDING(id)
                }
            },
            /**
             * 已发布
             * @constructor
             */
            PUBLISHED(id) {
                let params = {
                    id
                };
                DISABLE_ACCOUNT_LIST(params).then((res) => {
                    let lists = [];
                    this.lists.map((item) => {
                        if (item.id == id) {
                            item.state = '禁用';
                            item.enabled = false;
                        }
                        lists.push(item);
                        return item;
                    });
                    this.lists = lists;
                    Alert.success("已禁用");
                });
            },
            /**
             * 已暂停或者待发布
             * @constructor
             */
            PAUSEDANDPENDING(id) {
                let params = {
                    id
                };
                ENABLE_ACCOUNT_LIST(params).then((res) => {
                    let lists = [];
                    this.lists.map((item) => {
                        if (item.id == id) {
                            item.state = '启用';
                            item.enabled = true;
                        }
                        lists.push(item);
                        return item;
                    });
                    this.lists = lists;
                    Alert.success("已启用");
                });
            },

            changePassword(id) {
                this.isPassword = true;
                this.id = id
            },

            /**
             * 确定保存
             */
            determine(formName) {
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        if (that.ruleForm.password.length < 6) {
                            Alert.fail("密码至少6位");
                            return false;
                        }
                        if (that.ruleForm.password != that.ruleForm.confirmPassword) {
                            Alert.fail("密码不一致");
                            return false;
                        }
                        let params = {
                            id: that.id,
                            password: that.ruleForm.password
                        };

                        PASSWORD_ACCOUNT_LIST(params).then(res => {
                            Alert.success("修改成功");
                        });
                        that.isPassword = false;
                    }
                });


            },

            /**
             * 取消弹层
             */
            resetFormDialog() {
                this.hackReset = false;//销毁组件
                this.$refs['commodityDetails'].$refs['ruleForm'].resetFields();
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

    .pagination {
        margin-top: 20px;
    }
</style>
