<template>
    <div class="form-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="名称搜索">
                <el-input v-model="formInline.name" placeholder="名称搜索"></el-input>
            </el-form-item>
            <el-form-item label="组织搜索">
                <el-cascader
                        :options="options"
                        v-model="selectOptionValue"
                        change-on-select
                        clearable
                ></el-cascader>
            </el-form-item>
            <el-form-item style="padding-left:30px">
                <el-button type="default" @click="resetForm1('formInline')">重置</el-button>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import {GET_clientsSel} from '@/api/common'

    export default {
        name: 'form-container',
        props: ['label'],
        data() {
            return {
                formInline: {
                    name: '',
                    clientId: ''
                },
                selectOptionValue: [],
                options: []
            }
        },
        mounted() {
            let that = this;
            GET_clientsSel().then(res => {
                this.options = JSON.parse(JSON.stringify(res).replace(/id/g, 'value').replace(/name/g, 'label').replace(/subs/g, 'children'));


                setTimeout(() => {
                    let ids = [];

                    for (var i = 0; i < this.options.length; i++) {
                        that.findNodePath(ids, this.options[i], parseInt(this.$route.query.clientId));
                    }
                    this.selectOptionValue = ids;
                }, 100)
            })
        },
        watch: {
            selectOptionValue: function (newValue) {
                this.formInline.clientId = newValue[newValue.length - 1];
            }
        },


        methods: {
            onSubmit() {
                this.$emit('submit', this.formInline)
            },
            resetForm1() {
                this.formInline = {
                    name: ''
                };
                this.selectOptionValue = []
                this.$emit('resetForm');

            },
            findNodePath(parentIds, node, targetId) {
                if (node.value === targetId) {
                    parentIds.push(targetId);
                    return parentIds;
                }
                if (node.children && node.children.length > 0) {

                    parentIds.push(node.value);

                    for (let i = 0; i < node.children.length; i++) {
                        let sub = node.children[i];
                        let result = this.findNodePath(parentIds, sub, targetId);
                        if (result) {
                            return parentIds;
                        }
                    }
                    parentIds.splice(parentIds.length - 1, 1);
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .form-container {
        padding: 20px;
        background: #fff;
    }
</style>
