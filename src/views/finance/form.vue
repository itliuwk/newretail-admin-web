<template>
    <div class="form-container">
        <div style="display:inline-block">
            <span class="demonstration">日期筛选 </span>
            <el-date-picker
                    v-model="dateValue"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2">
            </el-date-picker>
        </div>
        <el-button style="margin-left: 30px;" type="primary" @click="onSubmit">查询</el-button>
    </div>
</template>

<script>
    import {dateTimeFormate} from '@/filters'
    export default {
        name: 'form-container',
        props:['label'],
        data() {
            return {
                formInline: {
                    name: ''
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                dateValue: ''
            }
        },
        methods: {
            onSubmit() {
                let date = {
                    start:dateTimeFormate(this.dateValue[0]),
                    end:dateTimeFormate(this.dateValue[1])
                };
                this.$emit('onSubmit',date);

            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .form-container {
        padding: 20px;
        background: #fff;
    }
    .demonstration{
        margin-right: 10px;
    }
</style>
