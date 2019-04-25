<template>
    <div class="selector">
        <div class="el-input1">
            <el-input placeholder="搜索" @keyup.enter.native="onEnter" v-model="params.query" size="small" type="text"
                      class=""/>
        </div>
        <div class="selector-check" @scroll="scrollEvent">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <el-checkbox @change="change(item.id,item.checked)" v-model="item.checked">
                        <div class="lis">
                            <div>
                                <p>{{item.name}}</p>
                            </div>
                        </div>
                    </el-checkbox>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    import {
        GET_LOCATIONS
    } from '@/api/common'

    export default {
        name: "elTransfer",
        data() {
            return {
                list: [],
                params: {
                    size: 10,
                    from: 0,
                    query: ''
                }
            }
        },
        props: {
            locationIds: Array
        },
        mounted() {
            this.getList();
            console.log(this.locationIds);
        },
        watch: {
            locationIds(val) {
                console.log(val);
            }
        },
        methods: {
            getList() {
                GET_LOCATIONS(this.params).then(res => {
                    res.map((item) => {
                        item.checked = false;
                        if (this.locationIds.includes(item.id)){
                            item.checked = true;
                        }
                        return item;
                    });
                    this.list = [...this.list, ...res];
                })
            },
            change(id, checked) {
                if (checked) {
                    let list = this.list.map((item) => {
                        if (id == item.id) {
                            item.checked = true
                        }
                        return item;
                    });
                    this.list = list;
                } else {
                    let list = this.list.map((item) => {
                        if (id == item.id) {
                            item.checked = false
                        }
                        return item;
                    });
                    this.list = list;
                }


            },
            scrollEvent(e) {
                // if (e.srcElement.scrollTop + e.srcElement.offsetHeight > e.srcElement.scrollHeight) {
                //     this.params = {
                //         ...this.params,
                //         from: this.params.from + this.params.size,
                //     };
                //     this.getList()
                // }

            },
            onEnter() {
                // this.params = {
                //     ...this.params,
                //     query: this.params.query
                // };
                // this.getList()
            }
        },


    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .selector {
        margin-top: 10px;
        border-radius: 4px;
        height: 300px;
        border: 1px solid #d9d9d9;

        .el-input1 {
            margin: 10px;
        }

        .selector-check {
            height: calc(100% - 55px);
            border-top: 1px solid #d9d9d9;
            padding: 15px;
            overflow: auto;

            ul {
                padding: 0;
                margin: 0;

                li {
                    list-style: none;
                    padding: 5px 0;

                    .el-checkbox__input {
                        vertical-align: super;
                    }

                    .lis {
                        display: flex;

                        img, div {
                            flex: 1;
                        }

                        img {
                            width: 80px;
                            height: 80px;
                        }

                        div {
                            margin-left: 10px;
                        }
                    }

                }
            }
        }

    }

    .el-checkbox__input {
        vertical-align: top;
    }
</style>
