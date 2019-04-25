<template>
    <div>
        <div class="table">
            <el-row>
                <el-button type="primary" @click="addMerchandise=true,id='',isSel=true">
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
                        label="商品名称">
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
                width="400px"
                :visible.sync="addMerchandise">
            <add-equipment v-if="isSel" ref="transfer"></add-equipment>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addMerchandise = false,isSel=false">取消</el-button>
                <el-button type="primary" @click="determine">确定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import {GET_LIST, DELETE_ITEM, PRODUCTS_CATEGORIES, DELETE_CATEGORIES_PRODUCTS} from '@/api/commodityManagement'

    import Alert from "@/utils/alert";
    import {pageSize} from '../../../config';
    import AddEquipment from "./addEquipment.vue"

    const FormContainer = () => import('../form.vue');
    const CommodityDetails = () => import('../productList/commodityDetails.vue');

    export default {
        name: "productList",
        data() {
            return {
                count: 0,
                isSel: true,
                isLoading: false,
                addMerchandise: false,
                lists: [],
                id: '',
                params: {
                    from: 0,
                    size: pageSize
                }
            }
        },
        mounted() {
            this.getList();
        },
        props: ['classifyId', 'productsCount'],
        components: {
            FormContainer,
            CommodityDetails,
            AddEquipment
        },
        watch: {
            classifyId() {
                this.params = {
                    from: 0,
                    size: pageSize
                }
                this.getList(this.classifyId);
            },
            productsCount(val) {
                this.count = val
            }
        },
        methods: {
            /**
             * 获取列表数据
             */
            getList(classifyId) {
                if (classifyId) {
                    let params = {
                        ...this.params,
                        categoryId: classifyId
                    };
                    GET_LIST(params).then(res => {
                        res.map((item) => {

                            return item
                        });
                        this.lists = res
                    });
                }
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
                        productId: id,
                        categoryId: this.classifyId
                    };
                    DELETE_CATEGORIES_PRODUCTS(params).then((res) => {
                        let lists = [];
                        this.lists.map((item) => {
                            if (item.id != id) {
                                lists.push(item)
                            }
                            return item;
                        });
                        this.lists = lists;
                        this.$emit('$success')
                    });
                    Alert.success("删除成功");
                }).catch(() => {

                })
            },
            determine() {
                let that = this;
                let products = [];
                this.$refs.transfer.list.map((item) => {
                    if (item.checked) {
                        products.push(item.id)
                    }
                    return item
                });
                let params = {
                    id: this.classifyId,
                    products: products
                };
                PRODUCTS_CATEGORIES(params).then(res => {
                    Alert.success("添加成功");
                    that.getList(that.classifyId);
                    that.$emit('$success')
                });
                this.addMerchandise = false;
                this.isSel = false;
            },

            /**
             * 翻页
             */
            currentChange(res) {
                this.params = {
                    from: parseInt(res - 1) * this.params.size,
                    size: pageSize,
                };
                this.getList(this.classifyId)
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
