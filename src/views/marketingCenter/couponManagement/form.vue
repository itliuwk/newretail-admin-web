<template>
    <div class="form-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item :label="label">
                <el-input v-model="formInline.name" placeholder="名称搜索"></el-input>
            </el-form-item>
            <el-form-item label="优惠券类型">
                <el-select v-model="formInline.type" value="" placeholder="优惠券类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="减免卷" value="AMOUNT_OFF"></el-option>
                    <el-option label="折扣券" value="DISCOUNT_RATE"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline.enabled" value="" placeholder="状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="投放中" value="true"></el-option>
                    <el-option label="暂停中" value="false"></el-option>
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
                    name: ''
                }
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
