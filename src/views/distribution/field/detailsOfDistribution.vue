<template>
    <el-row>
        <el-col :span="24" style="margin-bottom: 10px;">
            <div class="grid-content bg-purple-dark">
                <el-col :span="12">
                    <div class="grid-content bg-purple">分润对象:</div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">分润比例:</div>
                </el-col>
            </div>
        </el-col>
        <el-col :span="24" v-for="(item,index) in lists" style="margin-bottom: 10px;">
            <el-form :inline="true" class="demo-form-inline">
                <div class="grid-content bg-purple-dark">
                    <el-row :gutter="15">
                        <el-col :span="10">
                            <div class="grid-content bg-purple">
                                <el-select v-model="item.userId" :value="item.userId" placeholder="选择分润对象">
                                    <el-option v-for="opi in accounts" :label="opi.name" :value="opi.id"></el-option>
                                </el-select>
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <div class="grid-content bg-purple-light">
                                <el-input placeholder="" @input="limitMax(item.rate,index)" v-model="item.rate" max="100" min="1"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple-light">
                                <el-button type="danger" @click="deleteObj(index)" icon="el-icon-delete"></el-button>
                            </div>
                        </el-col>

                    </el-row>
                </div>
            </el-form>
        </el-col>
        <el-button @click="addObj">添加分润对象</el-button>
    </el-row>
</template>

<script>
    import {GET_ACCOUNT_LIST} from '@/api/privilegeManagement'
    import {DETAIL_FIELD_LIST} from '@/api/distribution'
    import Alert from "@/utils/alert";

    export default {
        name: "detailsOfDistribution",
        props: ['currId'],
        data() {
            return {
                lists: [],
                accounts: []
            }
        },
        watch: {
            currId() {

            }
        },
        mounted() {
            this.getAccounts();
            this.getDetail();
        },
        methods: {
            getDetail() {
                let params = {
                    id: this.currId
                };
                DETAIL_FIELD_LIST(params).then(res => {
                    this.lists = res
                })
            },
            /**
             * 添加分润对象
             */
            addObj() {
                let obj = {
                    userId: '',
                    rate: ''
                };
                this.lists.push(obj)
            },

            /**
             * 删除分润对象
             */
            deleteObj(idx) {
                let lists = [];
                this.lists.map((item, index) => {
                    if (idx != index) {
                        lists.push(item)
                    }
                    return item;
                });
                this.lists = lists
            },
            getAccounts() {
                GET_ACCOUNT_LIST().then(res => {
                    this.accounts = res;
                })
            },
            limitMax(val, idx) {
                if (val >= 100 || val <= 0) {
                    Alert.fail('值不能大于100,小于0');
                    val = ''
                }

                this.lists[idx].rate = val;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
