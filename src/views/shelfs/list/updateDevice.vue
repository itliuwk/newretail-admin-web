<template>
    <div class="deviceUpdate">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="机器名称：">
                <el-input v-model="formInline.user" placeholder="Approved by"></el-input>
            </el-form-item>
            <el-form-item label="场地类型：">
                <el-select v-model="formInline.region" placeholder="Activity zone">
                    <el-option label="Zone one" value="shanghai"></el-option>
                    <el-option label="Zone two" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="场地地址：">
                <el-input v-model="formInline.user" placeholder="Approved by"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                formInline: {}
            }
        }
    }
</script>