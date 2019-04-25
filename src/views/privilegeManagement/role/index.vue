<template>
    <div class="roles">
        <form-container label="名称" @submit="submitForm" @resetForm="resetForm"></form-container>
        <div class="role">
            <el-row>
                <el-col :span="4" :xs="6" :md="5">
                    <div class="grid-content bg-purple">
                        <router-link :to="`/privilegeManagement/role/permissions?add=true`">
                            <el-button type="primary">
                                新增角色
                            </el-button>
                        </router-link>
                        <el-table @row-click="openDetails"
                                  :data="lists"
                                  style="width: 100%">
                            <el-table-column
                                    label="名称">
                                <template slot-scope="lists">
                                   <span :class="{'select':lists.row.isSel}"
                                         type="text"
                                         size="small"
                                   >
                                        {{lists.row.name}}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                            >
                                <template slot-scope="lists">
                                   <span
                                           :class="{'select':lists.row.isSel}"
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
                    </div>
                </el-col>
                <el-col :span="20" :xs="18" :md="19" style="border-left: 1px solid #d9d9d9">
                    <Permissions :currId="id" :name="name" :permissions="permissions" @success="success"></Permissions>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    const FormContainer = () => import('../form.vue');
    const Permissions = () => import('./permissions.vue');
    import {ROLES_LIST, ROLES_DELETE} from '@/api/privilegeManagement'
    import Alert from "@/utils/alert";
    import {pageSize} from '../../../config';

    export default {
        name: "index",
        components: {
            FormContainer,
            Permissions
        },
        data() {
            return {
                id: '',
                name: '',
                permissions: '',

                index: 0,
                params: {
                    from: 0,
                    size: pageSize,
                    query: ''
                },
                lists: []
            }
        },
        mounted() {
            this.getList()
        },
        methods: {

            /**
             * 获取列表数据
             */
            getList() {
                let idx = this.index;
                ROLES_LIST(this.params).then(res => {
                    res.map((item, index) => {
                        item.edit = false;
                        item.isSel = false;
                        if (index === idx) {
                            item.isSel = true;
                        }
                        return item
                    });
                    this.lists = res;
                    this.id = this.lists[idx].id;
                    this.permissions = this.lists[idx].permissions;
                    this.name = this.lists[idx].name;
                });
            },

            success() {
                this.getList()
            },

            /**
             * 表格行事件
             */
            openDetails(row) {
                let lists = this.lists.map((item, index) => {
                    item.isSel = false;
                    if (row.id == item.id) {
                        item.isSel = true;
                        this.index = index;
                    }
                    return item
                });
                this.id = row.id;
                this.name = row.name;
                this.permissions = row.permissions;
                this.lists = lists;
            },

            removeItem(id) {
                let params = {
                    id
                };
                this.$confirm('确定删除此角色嘛？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id: id
                    };
                    ROLES_DELETE(params).then((res) => {
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
                    this.getList()
                }).catch(() => {

                })
            },


            /**
             * 查询
             */
            submitForm(res) {
                this.params = {
                    ...this.params,
                    query: res.name
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
                    query: ''
                };
                this.getList()
            },

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .roles {
        height: 100%;

        .option-span {
            color: #409EFF;
            cursor: pointer;
        }

        .role {
            margin-top: 20px;
        }

        > .grid-content {
            background: #fff;
            padding: 20px;
            border-right: 1px solid #d9d9d9;

            .option-span {
                color: #409EFF;
                cursor: pointer;
            }
        }

        .detail {
            padding: 15px 10px;
            position: relative;
            border-bottom: 1px solid #d9d9d9;

            span {
                font-weight: bold;
            }

            div {
                position: absolute;
                top: 0px;
                right: 0;
            }


        }

        .grid-content {
            background: #fff;
            padding: 12px;

            .rowBg:nth-child(2n+1) .bg-purple-dark {
                background: rgba(233, 233, 233, 1);
                padding: 12px;
            }

            .bg-purple-dark {
                > .el-switch {
                    min-width: 134px;
                }
            }
        }

        .child-item {
            display: inline-block;
            margin: 0 35px;
        }

        .cell .select {
            font-size: 18px;
            font-weight: bold;
        }
    }

</style>
