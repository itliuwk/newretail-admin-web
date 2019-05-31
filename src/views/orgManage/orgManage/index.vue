<template>
    <div class="orgManage">
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple orgTree">
                    <el-tree :data="treeData"
                             :props="defaultProps"
                             accordion
                             node-key="id"
                             :default-expanded-keys="[currTreeId]"
                             :default-checked-keys="[currTreeId]"
                             :highlight-current="true"
                             @current-change="currentChange"
                    ></el-tree>
                    <!--@node-click="handleNodeClick"-->
                </div>
            </el-col>
            <el-col :span="19">
                <div class="grid-content bg-purple-light orgInfo">
                    <el-row class="infoTit">
                        <el-col :span="24">
                            <div>组织信息</div>
                        </el-col>
                    </el-row>
                    <div class="infoDetail">
                        <div class="infoDetailTit">
                            <span>组织名称:</span>
                            <span>{{orgInfo.name}}</span>
                        </div>
                        <div class="infoDetailTit" v-if="orgInfo.idNumber">
                            <span>身份证号码:</span>
                            <span>{{orgInfo.idNumber}}</span>
                        </div>
                        <div class="infoDetailTit" v-if="orgInfo.contactName">
                            <span>联系人:</span>
                            <span>{{orgInfo.contactName}}</span>
                        </div>
                        <div class="infoDetailTit" v-if="orgInfo.contactName">
                            <span>联系方式:</span>
                            <span>{{orgInfo.mobile}}</span>
                        </div>
                        <div class="infoDetailTit" v-if="orgInfo.createdDate">
                            <span>创建时间:</span>
                            <span>{{orgInfo.createdDate |filterCreatedDate}}</span>
                        </div>
                        <div class="infoDetailTit" v-if="orgInfo.activeDevices">
                            <span>机器数量:</span>
                            <span>共{{orgInfo.activeDevices + orgInfo.devices}}(在线：{{orgInfo.activeDevices}},离线：{{orgInfo.devices}})</span>
                        </div>
                        <el-row class="detailAdd">
                            <el-col :span="24">
                                <el-button size="small" @click="orgOpi = true,orgOpiEdit=false;form={}">新增组织</el-button>
                                <el-button size="small" @click="orgOpiFun" type="primary">编辑</el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="orgMembers">
                        <el-row class="orgMembersTit">
                            <el-col :span="12">
                                <div>组织成员:</div>
                            </el-col>
                            <el-col :span="12" style="text-align: right;">
                                <el-button size="small" @click="memberManagement" type="primary">
                                    成员管理
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="table">
                        <el-table
                                :data="listData"
                                style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="名称">
                            </el-table-column>
                            <el-table-column
                                    prop="username"
                                    label="用户名"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="clientName"
                                    label="所属组织">
                            </el-table-column>
                            <el-table-column
                                    prop="mobile"
                                    label="联系方式">
                            </el-table-column>
                            <el-table-column
                                    prop="state"
                                    label="账号状态">
                            </el-table-column>
                            <el-table-column
                                    prop="createdDate"
                                    label="创建时间">
                                <template slot-scope="lists">
                                    <span>{{lists.row.createdDate |filterCreatedDate}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="pagination">
                        <el-pagination
                                background
                                :page-size="listParams.size"
                                layout="prev, pager, next"
                                :total="count"
                                @current-change="currentChange1"
                        >
                        </el-pagination>
                    </div>
                </div>
            </el-col>
        </el-row>


        <el-dialog
                title="新增组织"
                :show-close="false"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                :visible.sync="orgOpi"
                width="400px">
            <el-form ref="ruleForm" :model="form" label-width="100px">
                <el-form-item label="机构名称" prop="name" :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                    <el-input v-model="form.name" placeholder="请输入机构名称"></el-input>
                </el-form-item>
                <el-form-item label="管理员账号" v-if="!orgOpiEdit" prop="username"
                              :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                    <el-input v-model="form.username" placeholder="请输入管理员账号"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码" v-if="!orgOpiEdit" prop="password"
                              :rules="[{required: true, message: '不能为空', trigger: 'blur'}]">
                    <el-input type="password" placeholder="请输入管理员密码" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="form.idNumber" placeholder="请输入身份证号"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="form.contactName" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.mobile" placeholder="请输入联系方式"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="orgOptCancel">取 消</el-button>
                <el-button type="primary" @click="orgOptConfirm" :loading="isLoading">确 定</el-button>
          </span>
        </el-dialog>


    </div>
</template>

<script>
    import {GET_clients, POST_clients, PUT_clients, DETAIL_clients} from '@/api/orgManage'
    import {GET_ACCOUNT_LIST} from '@/api/privilegeManagement'
    import {dateTimeFormate} from "@/filters/index";
    import {pageSize} from "../../../config";


    import {
        COUNT_ACCOUNT_LIST
    } from '@/api/privilegeManagement'

    import Alert from "@/utils/alert";

    export default {
        data() {
            return {
                orgOpi: false,
                isLoading: false,
                orgOpiEdit: false,
                currTreeId: '',
                count:0,
                listParams: {
                    size: pageSize,
                    from: 0,
                    clientId: ''
                },
                orgInfo: {},
                form: {
                    id: '',
                    name: '',
                    username: '',
                    password: '',
                    parentId: '',
                    contactName: '',
                    mobile: '',
                    idNumber: ''
                },
                treeData: [],
                listData: [],
                defaultProps: {
                    children: 'subs',
                    label: 'name'
                }
            };
        },
        mounted() {
            this.GET_clients();
        },
        watch: {
            currTreeId() {
                this.DETAIL_clients();
                this.GET_ACCOUNT_LIST();
                this.COUNT_ACCOUNT_LIST();
            }
        },
        methods: {

            /**
             * 树列表初始化
             */
            GET_clients() {
                GET_clients().then(res => {
                    res.map((item, index) => {
                        if (index === 0) {
                            this.currTreeId = item.id
                        }
                        return item;
                    });
                    this.treeData = res;
                })
            },
            /**
             * 组织信息
             */
            DETAIL_clients() {
                DETAIL_clients(this.currTreeId).then(res => {
                    res.id = this.currTreeId;
                    this.orgInfo = res;
                })
            },
            /**
             * 成员列表
             */

            GET_ACCOUNT_LIST() {
                this.listParams.clientId = this.currTreeId;
                GET_ACCOUNT_LIST(this.listParams).then(res => {
                    res.map((item) => {
                        item.state = item.enabled == true ? '启用' : '禁用';
                        return item
                    });
                    this.listData = res;
                })
            },

            COUNT_ACCOUNT_LIST(){
                COUNT_ACCOUNT_LIST(this.currTreeId).then(res=>{
                    this.count = res;
                })
            },

            /**
             * 成员管理
             */

            memberManagement(data) {
                this.$router.push('/privilegeManagement/account?clientId='+ this.currTreeId)
            },

            /**
             * 翻页
             */
            currentChange1(res) {
                this.listParams = {
                    ...this.listParams,
                    from: parseInt(res - 1) * this.listParams.size,
                    size: pageSize,
                };
                this.GET_ACCOUNT_LIST();
            },

            currentChange(data) {
                this.currTreeId = data.id;
            },
            /**
             * 编辑组织
             */
            orgOpiFun() {
                this.orgOpiEdit = true;
                this.orgOpi = true;
                this.form = this.orgInfo
            },

            /**
             *
             * 取消
             */

            orgOptCancel() {
                this.orgOpi = false;
                this.DETAIL_clients()
            },

            /**
             * 确定 新增/编辑 组织
             */
            orgOptConfirm() {
                let orgManage = this.$refs['ruleForm'];
                orgManage.validate((val) => {
                    if (val) {
                        this.isLoading = true;
                        if (this.orgOpiEdit) {
                            let obj = {
                                id: this.orgInfo.id,
                                name: this.form.name,
                                mobile: this.form.mobile,
                                contactName: this.form.contactName,
                                idNumber: this.form.idNumber,
                            };
                            PUT_clients({...obj}).then(res => {
                                this.orgOpi = false;
                                this.isLoading = false;
                                this.GET_clients();
                                this.DETAIL_clients()
                            }).catch(err => {
                                this.isLoading = false;
                            })
                        } else {
                            this.form.parentId = this.currTreeId;
                            POST_clients({...this.form}).then(res => {

                                this.orgOpi = false;
                                this.isLoading = false;
                                this.GET_clients();
                                this.DETAIL_clients()
                            }).catch(err => {
                                Alert.fail('管理员账号不能重复');
                                console.log(err);
                                this.isLoading = false;
                            })

                        }

                    }

                })
            }
        },
        filters: {
            filterCreatedDate(val) {
                return dateTimeFormate(val)
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    .orgManage {
        background: #fff;
        padding: 20px;
        width: 100%;
        min-height: calc(100vh - 84px);

        .grid-content {
            max-height: calc(100vh - 124px);
            min-height: calc(100vh - 124px);
            border: 1px solid #d3dce6;
            overflow: auto;
        }

        .orgTree {
            border-right: none;
            padding: 20px 20px 20px 10px;
        }

        .infoTit {
            border-bottom: 1px solid #d3dce6;
            padding: 0 0 20px 20px;
            font-weight: bolder;
        }

        .orgInfo {
            padding: 20px 0;

            .infoDetail {
                padding: 0 0 20px 20px;
                margin-top: 20px;
                border-bottom: 1px solid #d3dce6;

                .infoDetailTit {
                    display: inline-block;
                    width: 33%;
                    margin: 10px 0;
                }

                .infoDetailTit span:nth-child(1) {
                    padding-right: 10px;
                    color: #8492a6;
                }

                .infoDetailTit span:nth-child(2) {
                    color: #324057;
                }
            }
        }

        .detailAdd {
            padding: 20px 20px 0 0;
            text-align: right;
        }

        .orgMembersTit {
            padding: 20px 20px 10px 20px;
        }

        .table {
            padding: 0 20px 0 20px;

            .option-span {
                color: #409EFF;
                cursor: pointer;
            }
        }


    }


    .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
        color: #188ae2 !important;
        background: #fff;
    }

    .el-tree-node__content {
        height: 35px !important;
    }
</style>
