<template>
    <div class="classification">
        <p>商品分类</p>
        <div class="classification-list">
            <draggable tag="ul" handle=".handleMove" :sort="isSort" v-model="lists" @update="itemDragEnd">
                <li :class="{'select':item.isSel}" @click="liItemClick(item.id,item.edit,item.products)"
                    v-for="(item,index) in lists">
                    <span class="handleMove">
                        <svg-icon icon-class="move"></svg-icon>
                    </span>
                    <div class="info" v-show="!item.edit">
                        <p>{{item.name}}</p>
                        <p>{{item.products}}件商品</p>
                        <el-button type="primary" @click.stop="editItem(index)">编辑
                        </el-button>
                    </div>
                    <div class="edit" v-show="item.edit">
                        <p>{{titleName}}</p>
                        <div class="demo-input-suffix">
                            <span>分类名称：</span>
                            <el-input
                                    placeholder=""
                                    @focus.stop="itemfoucsValue(item.name)"
                                    v-model="item.name">
                            </el-input>
                        </div>
                        <div class="opiItem">
                            <el-button type="danger" @click.stop="removeItem(index)">删除分类</el-button>
                            <div>
                                <el-button @click.stop="cancelItem(index)">取消</el-button>
                                <el-button type="primary" @click.stop="confirmItem(index)">确认</el-button>
                            </div>
                        </div>
                    </div>
                </li>
                <li @click="addList" class="addList">
                    <p>
                        <svg-icon icon-class="plus1"></svg-icon>
                    </p>
                    添加分类
                </li>
            </draggable>
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

    export default {
        name: "classification",
        data() {
            return {
                index: 0,
                isAdd: false,
                isSort: true,
                titleName: '添加分类',
                temporaryValue: '',
                lists: []
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
             * 添加分类
             */
            addList() {
                if (!this.isAdd) {
                    let item = {
                        id: '',
                        products: 0,
                        edit: true,
                        name: ''
                    };
                    this.lists.push(item);
                } else {
                    Alert.fail("请先添加完分类");
                }

                this.isAdd = true;
            },

            /**
             * 事件点击
             */
            liItemClick(id, edit, products) {
                if (!edit) {
                    let lists = this.lists.map((item, index) => {
                        item.isSel = false;
                        if (id == item.id) {
                            item.isSel = true;
                            this.index = index;
                        }
                        return item
                    });
                    this.$emit('currId', id);
                    this.$emit('products', products);
                    this.lists = lists;
                }
            },

            /**
             * 拖动结束
             */
            itemDragEnd() {
                let ids = [];
                for (let i = 0; i < this.lists.length; i++) {
                    ids.push(this.lists[i].id)
                }
                let params = {
                    ids: ids
                };
                ORDERS_CATEGORIES(params).then(res => {
                    Alert.success("排序成功");
                });
            },
            itemfoucsValue(val) {
                this.temporaryValue = val
            },
            /**
             * 编辑
             * @param currIndex
             */
            editItem(currIndex) {
                this.isSort = false;
                let lists = this.lists.map((item, index) => {
                    if (currIndex == index) {
                        item.edit = true
                    }
                    return item
                });
                this.titleName = '编辑名称';
                this.lists = lists;
            },
            /**
             * 删除
             * @param currIndex
             */
            removeItem(currIndex) {
                let that = this;
                this.$confirm('确定删除此分类嘛?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        id: that.lists[currIndex].id
                    };
                    DELETE_CATEGORIES(params).then((res) => {
                        let lists = [];
                        that.lists.map((item, index) => {
                            if (currIndex != index) {
                                lists.push(item)
                            }
                            return item
                        });
                        that.lists = lists;
                        that.isSort = true;
                        that.titleName = '添加分类';
                        that.isAdd = false;
                        Alert.success("删除成功");
                        setTimeout(() => {
                            that.getList(that.params)
                        }, 100);

                    });

                })

            },
            /**
             * 取消
             * @param currIndex
             */
            cancelItem(currIndex) {
                let that = this;
                let lists = [];
                this.lists.map((item, index) => {
                    if (currIndex == index) {
                        item.edit = false;
                        item.name = that.temporaryValue || item.name
                    }

                    if (item.id) {
                        lists.push(item)
                    }
                    return item
                });
                this.lists = lists;
                this.isSort = true;
                this.isAdd = false;
            },

            /**
             * 确认
             * @param currIndex
             */
            confirmItem(currIndex) {
                let that = this;
                if (this.lists[currIndex].name) {
                    let params = {
                        id: this.lists[currIndex].id,
                        name: this.lists[currIndex].name
                    };
                    if (!this.lists[currIndex].id) {
                        POST_CATEGORIES(params).then(res => {
                            let lists = that.lists.map((item, index) => {
                                item.edit = false;
                                return item
                            });
                            that.lists = lists;
                            that.isSort = true;
                            that.isAdd = false;
                            Alert.success("新增成功");
                        });
                    } else {
                        UPDATE_CATEGORIES(params).then(res => {
                            let lists = that.lists.map((item, index) => {
                                item.edit = false;
                                return item
                            });
                            that.lists = lists;
                            that.isSort = true;
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
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    * {
        padding: 0;
        margin: 0;
    }

    .classification {
        margin-top: 20px;
        background: #fff;
        padding: 20px;

        .classification-list {
            overflow: hidden;

            ul {
                overflow: hidden;

                li {
                    position: relative;
                    border: 1px solid #ebeef5;
                    cursor: pointer;
                    margin: 10px;
                    list-style: none;
                    float: left;
                    width: 170px;
                    height: 190px;
                    background: rgba(255, 255, 255, 1);
                    opacity: 1;
                    border-radius: 5px;

                    .el-button--medium {
                        font-size: 12px;
                        height: 30px;
                        line-height: 30px;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                    }

                    .handleMove {
                        position: absolute;
                        top: 5px;
                        right: 5px;
                        cursor: move;
                    }

                    .info {

                        p {
                            padding: 5px;
                        }

                        button {
                            border-radius: 0;
                            /*border-bottom-left-radius: 5px;*/
                            /*border-bottom-right-radius: 5px;*/
                        }
                    }

                    .edit {
                        height: 100%;
                        position: relative;

                        > p:nth-child(1) {
                            width: 100%;
                            padding: 10px;
                            border-bottom: 1px solid #ebeef5;
                        }

                        .demo-input-suffix {
                            padding: 10px;

                            span {
                                font-size: 12px;
                            }

                            .el-input {
                                width: 59%;
                            }
                        }

                        .opiItem {
                            width: 100%;
                            font-size: 12px;
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            display: flex;

                            button, div {
                                flex: 1;
                            }

                            > button {
                                margin-right: 5px;
                                position: initial;
                                border-radius: 0;
                            }

                            div {
                                display: flex;

                                button {
                                    position: initial;
                                    flex: 1;
                                    border-radius: 0;
                                }

                                .el-button + .el-button {
                                    margin-left: 0;
                                }
                            }
                        }
                    }

                }

                li.cursorMove {
                    cursor: move;
                }

                li.select {
                    box-shadow: 0px 5px 10px 8px #d9d9d9;
                }

                li:last-child {
                    cursor: pointer;
                    line-height: normal;
                    padding-top: 50px;

                    p {
                        padding-top: 10px;
                        svg {
                            font-size: 35px;
                        }
                    }

                }

                .addList {
                    line-height: 165px;
                    text-align: center;
                }
            }
        }
    }
</style>
