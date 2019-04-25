<template>
    <div class="grid-content">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item v-if="!add" label="角色名称">
                <el-input v-model="ruleName" :disabled="!isEdit" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item v-else label="角色名称">
                <el-input v-model="ruleName"  placeholder="名称"></el-input>
            </el-form-item>
        </el-form>

        <div class="detail">
            <span style="font-weight: bold;">{{title}}</span>
            <div style="text-align: right;display: inline-block">
                <el-button v-show="!add" @click="editPermission">编辑</el-button>
            </div>
        </div>
        <div v-if="!add">
            <el-row class="rowBg" v-for="(items,index) in permissionsList">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <el-checkbox @change="handleCheckedChange(index,items.permission.checked)"
                                     v-model="items.permission.checked"
                                     :disabled="!isEdit"
                                     :active-text="items.permission.name">{{items.permission.name}}
                        </el-checkbox>
                        <div v-for="(item,idx) in items.subpermissions" class="child-item">
                            <el-checkbox @change="handleCheckedChangeChild(index,idx,item.checked)"
                                         v-model="item.checked"
                                         :disabled="!isEdit || !items.permission.checked"
                                         :active-text="item.name">{{item.name}}
                            </el-checkbox>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-else>
            <el-row class="rowBg" v-for="(items,index) in permissionsList">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <el-checkbox @change="handleCheckedChange(index,items.permission.checked)"
                                     v-model="items.permission.checked"
                                     :disabled="isEdit"
                                     :active-text="items.permission.name">{{items.permission.name}}
                        </el-checkbox>
                        <div v-for="(item,idx) in items.subpermissions" class="child-item">
                            <el-checkbox @change="handleCheckedChangeChild(index,idx,item.checked)"
                                         v-model="item.checked"
                                         :disabled="isEdit || !items.permission.checked"
                                         :active-text="item.name">{{item.name}}
                            </el-checkbox>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-show="isEdit || add" class="detail" style="border-top: 1px solid #d9d9d9">
            <el-checkbox v-model="checkedAll" @change="handleCheckAllChange">选择全部</el-checkbox>
            <div style="text-align: right;display: inline-block;top: 7px;">
                <el-button v-show="!add" @click="cancelEdit">取消</el-button>
                <el-button type="primary" @click="confirmEdit">确认</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Alert from "@/utils/alert";
    import {ROLES_POST, ROLES_PUT} from '@/api/privilegeManagement'
    import {mapActions} from 'vuex'

    export default {
        name: "permissions",
        props: ['currId', 'name', 'permissions'],
        data() {
            return {
                ruleName: '',
                title: '权限详情',
                add: false,
                isEdit: false,
                permissionsList: [
                    {
                        permission: {name: '设备管理', value: '7'},
                        subpermissions: [
                            {name: '设备列表', value: '8'},
                            {name: '设备授权', value: '9'},
                            {name: '设备编辑', value: '10'}
                        ]
                    },
                    {
                        permission: {name: '场地管理', value: '15'},
                        subpermissions: [
                            {name: '场地列表', value: '16'},
                            {name: '新增场地', value: '17'},
                            {name: '场地编辑', value: '18'}
                        ]
                    },
                    {
                        permission: {name: '商品资料管理', value: '23'},
                        subpermissions: [
                            {name: '商品列表', value: '24'},
                            {name: "商品分类管理", value: '91'},
                            {name: '新建商品', value: '25'},
                            {name: '编辑商品', value: '26'}
                        ]
                    },
                    {
                        permission: {name: '货道管理', value: '27'},
                        subpermissions: [
                            // { name: '货道方案列表', value: '28' },
                            {name: "货道配货", value: '28'},
                            {name: '新建货道方案', value: '29'},
                            {name: '编辑货道方案', value: '30'},
                            {name: '货道状态', value: '54'}
                        ]
                    },
                    {
                        permission: {name: '库存管理', value: '31'},
                        subpermissions: [
                            {name: '库存列表', value: '32'},
                            {name: '入库', value: '33'},
                            {name: '退货', value: '34'},
                            {name: '发货', value: '35'},
                            {name: '库存记录', value: '36'}
                        ]
                    },
                    {
                        permission: {name: '分润管理', value: '37'},
                        subpermissions: [
                            {name: '设备分润', value: '38'},
                            {name: '场地分润', value: '38'},
                            {name: '新建分润方案', value: '39'},
                            {name: '编辑分润方案', value: '40'}
                        ]
                    },
                    {
                        permission: {name: '补货管理', value: '41'},
                        subpermissions: [
                            {name: '补货记录', value: '42'},
                            {name: '补货', value: '43'}
                        ]
                    },
                    {
                        permission: {name: '广告管理', value: '55'},
                        subpermissions: [
                            {name: '素材管理', value: '56'},
                            {name: '广告投放', value: '57'}
                        ]
                    },
                    {
                        permission: {name: '子账号管理', value: '44'},
                        subpermissions: [
                            {name: '角色列表', value: '45'},
                            {name: '新建角色', value: '46'},
                            {name: '编辑角色', value: '47'},
                            {name: '子账号列表', value: '48'},
                            {name: '新建子账号', value: '49'},
                            {name: '编辑子账号', value: '50'}
                        ]
                    },
                    {
                        permission: {name: '财务模块', value: ''},
                        subpermissions: [
                            {name: '钱包', value: '51'},
                            {name: '提现', value: '52'}
                        ]
                    }
                ],
                checkedAll: false,
                isIndeterminate: true,
                //permission: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52]
                // permission: []
            }
        },
        beforeMount() {
            if (this.$route.query.add) {
                console.log(15654);
                this.isEdit = false;
                this.add = true;
                this.title = '设置权限';
            }
        },
        mounted() {
            this.getPermissions();

        },
        watch: {
            currId() {
                this.getPermissions();
            },
            name() {
                this.ruleName = this.name
            },
            permissions() {
            }
        },
        methods: {

            ...mapActions(["delVisitedView"]),
            /**
             * 权限
             */
            getPermissions() {
                this.ruleName = this.name;
                this.isEdit = false;
                let permissionsList = this.permissionsList;
                let permissions = this.permissions;
                if (permissions == undefined) {
                    return false;
                }
                let newpermissionsList = permissionsList.map(item => {
                    item.permission.checked = false;
                    let permission = {
                        name: item.permission.name,
                        value: item.permission.value,
                        checked: permissions.includes(Number(item.permission.value))
                    };

                    let subpermissions = item.subpermissions.map(subpermission => {
                        subpermission.checked = false;
                        if (permissions.includes(Number(subpermission.value))) {
                            subpermission.checked = true;
                        }
                        return subpermission;
                    });

                    return {
                        permission: permission,
                        subpermissions: subpermissions
                    }
                });
                this.permissionsList = newpermissionsList
            },

            /**
             * 编辑权限
             */
            editPermission() {
                this.isEdit = true
            },

            /**
             * 取消编辑
             */
            cancelEdit() {
                this.isEdit = false
            },


            /**
             * 确定编辑
             */
            confirmEdit() {
                let permissions = [];
                this.permissionsList.map((items) => {
                    if (items.permission.checked) {
                        permissions.push(items.permission.value)
                    }
                    items.subpermissions.map((item) => {
                        if (item.checked) {
                            permissions.push(item.value)
                        }
                        return item;
                    });

                    return items;
                });

                let ruleName = this.ruleName;
                if (this.add) {
                    if (!ruleName) {
                        Alert.fail('角色名称不能为空');
                        return false;
                    }
                }

                let params = {
                    id: this.currId,
                    name: ruleName,
                    permissions
                };

                if (!this.currId) {
                    ROLES_POST(params).then(res => {
                        Alert.success('新增成功');
                        this.isEdit = false;
                        this.$emit('success');
                        setTimeout(() => {
                            this.delVisitedView(this.$route).then(res => {
                                this.$router.go(-1);
                            });
                        }, 1000)
                    })
                } else {
                    ROLES_PUT(params).then(res => {
                        Alert.success('更新成功');
                        this.isEdit = false;
                        this.$emit('success');
                    })
                }
            },

            /**
             * 全选
             */
            handleCheckAllChange(val) {
                if (val) {
                    let permissionsList = this.permissionsList.map((items, index) => {
                        items.permission.checked = true;
                        items.subpermissions.map((item) => {
                            item.checked = true;
                            return item;
                        });

                        return items;
                    });
                    this.permissionsList = permissionsList;
                } else {
                    let permissionsList = this.permissionsList.map((items, index) => {
                        items.permission.checked = false;
                        items.subpermissions.map((item) => {
                            item.checked = false;
                            return item;
                        });

                        return items;
                    });
                    this.permissionsList = permissionsList;
                }

            },


            /**
             *  主permission 的选中
             * @param idx
             * @param checked
             */
            handleCheckedChange(idx, checked) {
                let permissionsList = this.permissionsList.map((items, index) => {
                    if (idx == index) {
                        if (!checked) {
                            items.permission.checked = false;
                            items.subpermissions.map((item) => {
                                item.checked = false;
                                return item;
                            });
                        } else {
                            items.permission.checked = true;
                        }
                    }
                    return items;
                });
                this.permissionsList = permissionsList;
            },

            /**
             * 子 subpermissions  的选中
             * @param index
             * @param idxChild
             * @param checked
             */
            handleCheckedChangeChild(index, idxChild, checked) {
                let permissionsList = this.permissionsList.map((items, indexs) => {
                    if (index == indexs) {
                        items.subpermissions.map((item, idx) => {
                            if (idxChild == idx) {
                                if (!checked) {
                                    item.checked = false;
                                    return item;
                                } else {
                                    item.checked = true;
                                    return item;
                                }
                            }
                        });
                    }
                    return items;
                });
                this.permissionsList = permissionsList;
            },


        }
    }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>

    .grid-content {
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

</style>
