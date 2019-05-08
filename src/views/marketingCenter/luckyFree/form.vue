<template>
    <div class="form-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item :label="label">
                <el-input v-model="formInline.name" placeholder="名称搜索"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline.state" value="" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未开始" value="PENDING"></el-option>
                    <el-option label="进行中" value="ACTIVE"></el-option>
                    <el-option label="已失效" value="DISABLED"></el-option>
                    <el-option label="已结束" value="ENDED"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="padding-left:30px">
                <el-button type="default" @click="resetForm1('formInline')">重置</el-button>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'form-container',
        props:['label'],
        data() {
            return {
                formInline: {
                    name: '',
                    state: '',
                }
            }
        },
        methods: {
            onSubmit() {
                this.$emit('submit', this.formInline)
            },
            resetForm1() {
                this.formInline = {
                    name: '',
                    state: ''
                };
                this.$emit('resetForm');

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
