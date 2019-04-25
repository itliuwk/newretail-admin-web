<template>
    <div class="form-container">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="场地">
                <el-select v-model="formInline.locationId" value="" placeholder="场地">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in locationId" :label="item.name" :value="item.id"></el-option>
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
    import {GET_LOCATIONS} from '@/api/common'

    export default {
        name: 'form-container',
        props: ['label'],
        data() {
            return {
                formInline: {
                    locationId: ''
                },
                locationId: ''
            }
        },
        mounted() {
            this.getLocationId();
        },
        methods: {
            getLocationId() {
                GET_LOCATIONS().then(res => {
                    this.locationId = res
                })
            },
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
