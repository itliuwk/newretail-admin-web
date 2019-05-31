<template>
    <div class="classification">
        <div class="classification-list">
            <el-row>
                <el-button type="primary" @click="opiClassification">
                    添加分类
                </el-button>
            </el-row>
            <el-table
                    :data="lists"
                    @row-click="openDetails"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="分类名称">
                    <template slot-scope="lists">
                        <span :class="{'select':lists.row.isSel}"> {{lists.row.name}}  </span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        width="80"
                        label="商品(件)">
                    <template slot-scope="lists">
                        <span :class="{'select':lists.row.isSel}"> {{lists.row.products}}  </span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        width="50"
                        label="排序">
                    <template slot-scope="lists">
                        <span :class="{'select':lists.row.isSel}"> {{lists.row.displayOrder}}  </span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="createdDate"
                        label="创建时间">
                    <template slot-scope="lists">
                        <span :class="{'select':lists.row.isSel}"> {{lists.row.createdDate | filterCreatedDate}}  </span>
                    </template>
                </el-table-column>
                <el-table-column
                        width="100"
                        fixed="right"
                        label="操作"
                >
                    <template slot-scope="lists">
                            <span
                                    type="text"
                                    size="small"
                                    class="option-span"
                                    @click.stop.prevent="opiClassification(lists.row)"
                            >
                            编辑
                        </span>
                        <span
                                type="text"
                                size="small"
                                class="option-span"
                                @click.stop.prevent="removeItem(lists.row.id)"
                        >
                            删除
                        </span>


                    </template>
                </el-table-column>
            </el-table>


            <el-dialog
                    width="400px"
                    title="添加分类"
                    :show-close="false"
                    :visible.sync="isAdd">
                <div class="addClassification">
                    <span>分类名称: </span>
                    <el-input style="width: 70%" v-model="classification.name" placeholder="请输入分类名称"></el-input>
                </div>
                <div class="addClassification">
                    <span>排序: </span>
                    <el-input style="width: 70%" type="number" v-model="classification.displayOrder"
                              placeholder="请输入排序"></el-input>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="isAdd = false">取消</el-button>
                    <el-button type="primary" @click="confirmItem" :loading="isLoading">确定</el-button>
                </div>

            </el-dialog>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import Alert from "@/utils/alert";
    import {
        GET_LIST_CATEGORIES,
        POST_CATEGORIES,
        UPDATE_CATEGORIES,
        DELETE_CATEGORIES,
        ORDERS_CATEGORIES
    } from '@/api/commodityManagement'

    import {dateTimeFormate} from "@/filters/index";

    export default {
        name: "classification",
        data() {
            return {
                index: 0,
                isAdd: false,
                isLoading: false,
                titleName: '添加分类',
                temporaryValue: '',
                lists: [],
                classification: {
                    id: '',
                    name: '',
                    displayOrder: '',
                }
            }
        },
        props: ['params', 'success'],
        components: {
            draggable
        },
        mounted() {
            this.getList();
        },
        watch: {
            params() {
                this.getList(this.params)
            },
            success() {
                setTimeout(() => {
                    this.getList(this.params)
                }, 100);
            }
        },
        methods: {
            getList(params) {
                let idx = this.index;
                // console.log(idx);
                // console.log(this.lists.length);
                // if (idx == this.lists.length) {
                //     idx = 0
                // }
                GET_LIST_CATEGORIES(params).then(res => {
                    res.map((item, index) => {
                        item.edit = false;
                        item.isSel = false;
                        if (index === idx) {
                            item.isSel = true;
                        }
                        return item
                    });
                    this.lists = res;
                    this.$emit('currId', this.lists[idx].id);
                });
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

                this.$emit('currId', row.id);
                this.$emit('products', row.products);
                this.lists = lists;
            },

            /**
             * 分类操作
             */
            opiClassification(row) {
                this.isAdd = true;
                if (row.id) {
                    this.classification = {
                        id: row.id,
                        name: row.name,
                        displayOrder: row.displayOrder,
                    }
                }
            },


            /**
             * 删除
             * @param id
             */
            removeItem(id) {
                let that = this;
                this.$confirm('确定删除此分类嘛?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id
                    };
                    DELETE_CATEGORIES(params).then((res) => {
                        let lists = [];
                        that.lists.map((item, index) => {
                            if (id != item.id) {
                                lists.push(item)
                            }
                            return item
                        });
                        that.lists = lists;
                        Alert.success("删除成功");
                        setTimeout(() => {
                            that.getList(that.params)
                        }, 100);

                    });

                })

            },

            /**
             * 确认
             * @param currIndex
             */
            confirmItem(currIndex) {
                let that = this;
                if (this.classification.name) {

                    let params = {
                        id: this.classification.id,
                        name: this.classification.name,
                        displayOrder: this.classification.displayOrder
                    };
                    if (!this.classification.id) {
                        POST_CATEGORIES(params).then(res => {
                            let lists = that.lists.map((item, index) => {
                                item.edit = false;
                                return item
                            });
                            that.lists = lists;
                            that.isAdd = false;
                            this.classification = {
                                id: '',
                                name: '',
                                displayOrder: '',
                            };
                            Alert.success("新增成功");
                        });
                    } else {
                        UPDATE_CATEGORIES(params).then(res => {
                            let lists = that.lists.map((item, index) => {
                                item.edit = false;
                                return item
                            });
                            that.lists = lists;
                            that.isAdd = false;
                            Alert.success("更新成功");
                        });
                    }
                    setTimeout(() => {
                        that.getList(that.params)
                    }, 1000)

                } else {
                    Alert.fail("请添写分类名称");
                }


            }
        },
        filters: {
            filterCreatedDate(val) {
                return dateTimeFormate(val)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    .classification {
        margin-top: 20px;
        background: #fff;
        padding: 20px;

        .option-span {
            color: #409EFF;
            cursor: pointer;
            margin-right: 10px;
        }

        .select {
            font-size: 18px;
            font-weight: bold;
        }
    }

    .addClassification {
        margin: 10px;

        span {
            display: inline-block;
            width: 27%;
            font-weight: bold;
            text-align: right;
            padding-right: 20px;
            box-sizing: border-box;
        }
    }
</style>
