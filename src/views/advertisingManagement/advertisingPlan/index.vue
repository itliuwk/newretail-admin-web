<template>
    <div>
        <form-container @submit="submitForm" @resetForm="resetForm"></form-container>
        <div class="table">
            <el-row>
                <router-link :to="`/advertisingManagement/advertisingPlan/opiModel`" class="resetWH">
                    <el-button type="primary">
                        添加计划
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
                        prop="type"
                        label="类型">
                </el-table-column>

                <el-table-column
                        prop="stateText"
                        label="状态">
                </el-table-column>
                <el-table-column
                        prop="devices"
                        label="设备台数">
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
                                @click="suspensionOfRelease(lists.row.id,lists.row.state)"
                        >
                            <span>{{lists.row.state=="PUBLISHED"?"暂停":"发布"}}</span>
                        </span>
                        <router-link
                                size="small"
                                class="option-span"
                                style="margin: 0 5px;"
                                :to="`/advertisingManagement/advertisingPlan/opiModel?id=`+lists.row.id">
                            查看
                        </router-link>
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
    </div>
</template>

<script>
    import {GET_LIST, DELETE_ITEM, PUBLISH, PAUSEDANDPENDING, DEVICES_COUNT} from '@/api/advertisingManagement'
    import Alert from "@/utils/alert";
    import {pageSize} from '../../../config';

    const FormContainer = () => import('./form.vue');
    export default {
        name: "index",
        components: {
            FormContainer
        },
        data() {
            return {
                count: 0,
                modelTitle: '添加',
                opiModal: false,
                lists: [],
                params: {
                    from: 0,
                    size: pageSize,
                    query: '',
                    type: ''
                }
            }
        },
        mounted() {
            this.getList();
        },

        methods: {
            getList() {
                GET_LIST(this.params).then(res => {
                    res.map((item) => {
                        if (item.state == 'PUBLISHED') {
                            item.stateText = '已发布'
                        } else if (item.state == 'PAUSED') {
                            item.stateText = '已暂停'
                        } else {
                            item.stateText = '待发布'
                        }
                        item.type = item.type == 'IMAGE' ? '图片' : '视频';

                        item.devices = item.deviceIds.length;
                        return item
                    });
                    this.lists = res
                });

                DEVICES_COUNT().then(res => {
                    this.count = res
                })
            },
            submitForm(res) {
                this.params = {
                    ...this.params,
                    query: res.name,
                    type: res.type
                };
                this.getList()
            },
            resetForm() {
                this.params = {
                    from: 0,
                    size: pageSize,
                    query: '',
                    type: ''
                };
                this.getList()
            },
            currentChange(res) {
                this.params = {
                    ...this.params,
                    from: parseInt(res - 1) * this.params.size,
                    size: pageSize,
                };
                this.getList()
            },
            suspensionOfRelease(id, state) {
                switch (state) {
                    case 'PUBLISHED':
                        this.PAUSEDANDPENDING(id);
                        break;
                    case 'PAUSED':
                    case 'PENDING':
                        this.PUBLISHED(id);
                        break;
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
                PUBLISH(params).then((res) => {
                    let lists = [];
                    this.lists.map((item) => {
                        if (item.id == id) {
                            item.stateText = '已发布';
                            item.state = 'PUBLISHED';
                        }
                        lists.push(item);
                        return item;
                    });
                    this.lists = lists;
                    Alert.success.call(this, "已发布");
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
                PAUSEDANDPENDING(params).then((res) => {
                    let lists = [];
                    this.lists.map((item) => {
                        if (item.id == id) {
                            item.stateText = '已暂停';
                            item.state = 'PAUSED';
                        }
                        lists.push(item);
                        return item;
                    });
                    this.lists = lists;
                    Alert.success.call(this, "已暂停");
                });
            },
            removeItem(id) {
                this.$confirm('确定删除此广告计划嘛？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    DELETE_ITEM(id).then((res) => {
                        let lists = [];
                        this.lists.map((item) => {
                            if (item.id != id) {
                                lists.push(item)
                            }
                            return item;
                        });
                        this.lists = lists;
                    });
                    Alert.success.call(this, "删除成功");
                }).catch(() => {

                })

            },
            viewItem(id) {
                this.opiModal = true;
                this.modelTitle = '查看'
            },
            sureModal() {
                this.opiModal = false
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

    .resetWH {
        width: 100%;
        height: 100%;
    }
</style>
