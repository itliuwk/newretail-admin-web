<template>
    <div class="formContainer">
        <el-form
                ref="ruleForm"
                :inline="true"
                :model="dataFormInner"
                class="demo-form-inline"
                label-position="right"
                label-width="100px"
        >
            <div>
                <el-form-item label="设备名称">
                    <el-input v-model="dataFormInner.query" placeholder="公司名称"></el-input>
                </el-form-item>
                <el-form-item label="设备编号">
                    <el-input v-model="dataFormInner.id" placeholder="设备编号"></el-input>
                </el-form-item>
                <el-form-item label="设备状态">
                    <el-select
                            :clearable="true"
                            v-model="dataFormInner.active"
                            :value="''"
                            placeholder="设备状态"
                    >
                        <el-option label="在线" :value="true"></el-option>
                        <el-option label="离线" :value="false"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="货道状态" v-if="cargo">
                    <el-select :clearable="true" v-model="dataFormInner.stockState" placeholder="类型">
                        <el-option label="正常" value="NORMAL"></el-option>
                        <el-option label="缺货" value="OUT_OF_STOCK"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="场地">
                    <el-select v-model="dataFormInner.locationId" placeholder="场地" :clearable="true">
                        <el-option :key="item.id" v-for="item in locations" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分组">
                    <el-select v-model="dataFormInner.groupId" placeholder="分组" :clearable="true">
                        <el-option
                                :key="item.id"
                                v-for="item in deviceGroups"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="类型">
                    <el-select :clearable="true" v-model="dataFormInner.typeId" placeholder="类型">
                        <el-option
                                :key="item.id"
                                v-for="item in deviceTypes"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>



                <el-form-item style="padding-left:30px">
                    <!-- <el-button type="default" @click="resetForm1('ruleForm')">重置</el-button> -->
                    <el-button type="primary" @click="$emit('search',dataFormInner)">查询</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
    import {mapState, mapActions} from "vuex";
    import props1 from "./mixins/props.js";

    export default {
        mixins: [props1],
        data() {
            return {
                dataFormInner: {}
            };
        },
        computed: {
            ...mapState({
                deviceTypes: state => state.common.deviceTypes,
                locations: state => state.common.locations,
                deviceGroups: state => state.common.deviceGroups
            })
        },
        mounted() {
            this.getDeviceTypes();
            this.getLocations();
            this.getDeviceGroups();
        },
        methods: {
            ...mapActions(["getDeviceTypes", "getLocations", "getDeviceGroups"])
        }
    };
</script>

