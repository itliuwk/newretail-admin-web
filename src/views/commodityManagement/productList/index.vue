<template>
    <div>
        <form-container label="名称" @submit="submitForm" @resetForm="resetForm"></form-container>
        <div class="table">
            <el-row>
                <el-button type="primary" @click="addMerchandise=true,hackReset=true,id=''">
                    添加商品
                </el-button>
            </el-row>
            <el-table
                    :data="lists"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.image" min-width="70" width="70" height="70"/>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格">
                </el-table-column>
                <el-table-column
                        prop="costPrice"
                        label="成本价">
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
                                @click="editItem(lists.row.id)">
                            编辑
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
                width="815px"
                :show-close="false"
                :visible.sync="addMerchandise">
            <commodity-details ref="commodityDetails" v-if="hackReset" :currId="id"></commodity-details>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetFormDialog('ruleForm'), addMerchandise = false">取消</el-button>
                <el-button type="primary" @click="determine"  :loading="isLoading">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {GET_LIST, DELETE_ITEM, COUNT, ADD_ITEM, UPDATE_ITEM} from '@/api/commodityManagement'

    import Alert from "@/utils/alert";
    import { pageSize } from '../../../config';

    const FormContainer = () => import('../form.vue');
    const CommodityDetails = () => import('./commodityDetails.vue');

    export default {
        name: "productList",
        data() {
            return {
                isLoading: false,
                hackReset: true,
                addMerchandise: false,
                lists: [],
                count: 0,
                id: '',
                params: {
                    from: 0,
                    size: pageSize,
                    query: ''
                }
            }
        },
        mounted() {
            this.getList();
            this.getCount();
        },
        components: {
            FormContainer,
            CommodityDetails
        },
        methods: {

            /**
             * 获取列表数据
             */
            getList() {
                GET_LIST(this.params).then(res => {
                    res.map((item) => {

                        return item
                    });
                    this.lists = res
                });
            },


            /**
             * 获取总数
             */
            getCount() {
                COUNT().then(res => {
                    this.count = res
                });
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
                    DELETE_ITEM(params).then((res) => {
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
                this.addMerchandise = true;
                this.id = id
            },

            /**
             * 确定保存
             */
            determine() {
                let that = this;

                let commodityDetails = this.$refs['commodityDetails'].$refs['ruleForm'];
                commodityDetails.validate((val) => {
                    if (val) {
                        that.isLoading = true;
                        let list = this.$refs['commodityDetails'].ruleForm;
                        if (!list.id) {
                            ADD_ITEM(list).then(res => {
                                setTimeout(() => {
                                    Alert.success('新建成功');
                                    that.addMerchandise = false;
                                    that.hackReset = false;
                                    that.isLoading = false;
                                }, 1500);

                            })
                        } else {
                            UPDATE_ITEM(list).then(res => {
                                setTimeout(() => {
                                    Alert.success('更新成功');
                                    that.addMerchandise = false;
                                    that.hackReset = false;
                                    that.isLoading = false;
                                }, 1500);

                            })
                        }
                        setTimeout(()=>{
                            that.getList();
                            that.isLoading = false;
                        },1500);


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
