<template>
    <div class="form-container">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item label="设备编号">
                <el-input v-model="formData.deviceId" placeholder="设备编号"></el-input>
            </el-form-item>
            <el-form-item label="场地">
                <el-select v-model="formData.locationId" placeholder="场地" :clearable="true">
                    <el-option label="全部" value=""></el-option>
                    <el-option :key="item.id" v-for="item in locations" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="类型">
                <el-select :clearable="true" v-model="formData.deviceTypeId" placeholder="类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option
                            :key="item.id"
                            v-for="item in deviceTypes"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分组">
                <el-select v-model="formData.groupId" placeholder="分组" :clearable="true">
                    <el-option label="全部" value=""></el-option>
                    <el-option :key="item.id" v-for="item in groups" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker
                        v-model="date"
                        type="daterange"
                        align="right"
                        :clearable="true"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                </el-date-picker>
            </el-form-item>
            <el-form-item style="padding-left:30px">
                <el-button type="default" @click="resetForm1('formInline')">重置</el-button>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import {GET_DEVICE_DEVICEGROUPS} from  '@/api/common'
    import {dateTimeFormate} from  '@/filters/index'
    export default {
        name: 'form-container',
        data() {
            return {
                formData: {
                    deviceId: '',
                    locationId: '',
                    deviceTypeId: '',
                    groupId: '',
                    start:'',
                    end:''
                },
                date: '',
                groups:[],
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
                }
            }
        },
        computed: {
            ...mapState({
                deviceTypes: state => state.common.deviceTypes,
                locations: state => state.common.locations
            })
        },
        mounted() {
            this.getDeviceTypes();
            this.getLocations();
            this.GET_DEVICE_DEVICEGROUPS();
        },
        methods: {
            ...mapActions(["getDeviceTypes", "getLocations"]),
            onSubmit() {

                if (this.date){
                    var date = {
                        start:dateTimeFormate(this.date[0]),
                        end:dateTimeFormate(this.date[1])
                    };
                }

                let formData  ={
                    ...this.formData,
                    ...date
                };
                this.$emit('submit', formData)
            },
            resetForm1() {
                this.formData = {
                    deviceId: '',
                    locationId: '',
                    deviceTypeId: '',
                    groupId: ''
                };
                this.date = '';
                this.$emit('resetForm');

            },
            GET_DEVICE_DEVICEGROUPS(){
                GET_DEVICE_DEVICEGROUPS().then(res=>{
                    this.groups = res
                })
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
