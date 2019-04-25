<template>
    <div>
        <form-container @submit="submitForm" @resetForm="resetForm"></form-container>
        <div class="table">
            <el-table
                    :data="lists"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="场地图片">
                    <template slot-scope="lists">
                        <img :src="lists.row.image" width="70" height="70" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        prop="locationName"
                        label="场地地址">
                </el-table-column>
                <el-table-column
                        prop="users"
                        label="分润人数">
                </el-table-column>
                <el-table-column
                        prop="stateText"
                        label="状态">
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
                            <span>{{lists.row.enabled==true?"暂停":"发布"}}</span>
                        </span>
                        <span
                                type="text"
                                size="small"
                                style="margin: 0 5px;"
                                class="option-span"
                                @click="editModal(lists.row.id)"
                        >
                            <span>编辑</span>
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
                width="400px"
                :show-close="false"
                :visible.sync="isEdit">
            <details-of-distribution ref="distribution" :currId="id" v-if="isEdit"></details-of-distribution>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isEdit = false">取消</el-button>
                <el-button type="primary" @click="determine('ruleForm')">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    const FormContainer = () => import('./form.vue');
    const DetailsOfDistribution = () => import('./detailsOfDistribution.vue');
    import {
        GET_FIELD_LIST,
        POST_FIELD_LIST,
        ENABLE_FIELD_LIST,
        DISABLE_FIELD_LIST,
        COUNT_FIELD_LIST
    } from '@/api/distribution'
    import Alert from "@/utils/alert";
    import {pageSize} from '../../../config';

    export default {
        name: "index",
        data() {
            return {
                count: 0,
                id: '',
                isEdit: false,
                lists: [],
                params: {
                    from: 0,
                    size: pageSize,
                    locationId: ''
                }
            }
        },
        mounted() {
            this.getList()
        },
        components: {
            FormContainer,
            DetailsOfDistribution
        },
        methods: {
            submitForm(res) {
                this.params = {
                    ...this.params,
                    locationId: res.locationId,
                };
                this.getList()
            },
            resetForm() {
                this.params = {
                    from: 0,
                    size: pageSize,
                    locationId: ''
                };
                this.getList()
            },
            getList() {
                GET_FIELD_LIST(this.params).then(res => {
                    res.map((item) => {
                        item.stateText = item.enabled ? '生效中' : '失效中';
                        item.locationName = item.province + item.city + item.district + item.name;
                        return item
                    });
                    this.lists = res
                });

                COUNT_FIELD_LIST(this.params).then(res => {
                    this.count = res
                })
            },

            /**
             * 分页
             */
            currentChange(res) {
                this.params = {
                    ...this.params,
                    from: parseInt(res - 1) * this.params.size,
                    size: pageSize,
                };
                this.getList()
            },

            editModal(id) {
                this.isEdit = true;
                this.id = id;
            },

            /**
             * 状态操作
             */
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
                DISABLE_FIELD_LIST(params).then((res) => {
                    let lists = [];
                    this.lists.map((item) => {
                        if (item.id == id) {
                            item.stateText = '失效中';
                            item.enabled = false;
                        }
                        lists.push(item);
                        return item;
                    });
                    this.lists = lists;
                    Alert.success("已失效");
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
                ENABLE_FIELD_LIST(params).then((res) => {
                    let lists = [];
                    this.lists.map((item) => {
                        if (item.id == id) {
                            item.stateText = '生效中';
                            item.enabled = true;
                        }
                        lists.push(item);
                        return item;
                    });
                    this.lists = lists;
                    Alert.success("已生效");
                });
            },
            determine() {
                let that = this;
                let child = this.$refs.distribution.lists;
                let params = {
                    id: this.id,
                    items: child
                };

                for (let index in child) {
                    if (!child[index].rate || !child[index].userId) {
                        Alert.fail("值不能为空");
                        return false;
                    }
                }

                for (let i = 0; i < child.length; i++) {
                    for (let j = i + 1; j < child.length; j++) {
                        if (child[i].userId == child[j].userId) {
                            Alert.fail("分润对象不能一样");
                            return false;
                        }

                    }
                }
                POST_FIELD_LIST(params).then(res => {
                    Alert.success("添加成功");
                    that.isEdit = false;
                    that.getList();
                });
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
