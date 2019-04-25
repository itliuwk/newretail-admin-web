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
                        <div>
                            <p>{{item.id}}</p>
                            <p>{{item.groupName}}</p>
                        </div>
                    </el-checkbox>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {EQUIPMENT} from '@/api/advertisingManagement'

    export default {
        name: "elTransfer",
        props:['deviceIds'],
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
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                EQUIPMENT(this.params).then(res => {
                    res.map((item) => {
                        item.checked = false;
                        if (this.deviceIds.includes(item.id)){
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
                if (e.target.scrollTop + e.target.offsetHeight > e.target.scrollHeight) {
                    this.params = {
                        ...this.params,
                        from: this.params.from + this.params.size,
                    };
                    this.getList()
                }

            },
            onEnter() {
                this.params = {
                    size: 10,
                    from: 0,
                    query: this.params.query
                };
                this.list = [];
                this.getList()
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
                }
            }
        }

    }
</style>
