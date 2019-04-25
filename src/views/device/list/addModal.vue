<template>
  <div class="form">
    <el-alert title="特别说明" description="设备编号可以为空,当为空时，系统自动颁发唯一识别符作为设备编号" type="warning" show-icon></el-alert>
    <el-form
      :inline="true"
      :model="dataForm"
      class="demo-form-inline"
      label-width="80px"
      ref="form"
    >
      <div>
        <el-form-item
          label="设备类型"
          prop="deviceTypeId"
          :rules="[  { required: true, message: '不能为空'}, ]"
        >
          <el-select v-model="dataForm.deviceTypeId" placeholder="设备类型">
            <el-option
              :key="item.id"
              v-for="item in deviceTypes"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备编号" prop="name">
          <el-input v-model="dataForm.id" placeholder="设备编号" type="number"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="设备名称"></el-input>
        </el-form-item>
        <el-form-item label="选择场地" prop="locationId">
          <el-select v-model="dataForm.locationId" placeholder="选择场地">
            <el-option :key="item.id" v-for="item in locations" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="分组" prop="planId">
          <el-select v-model="dataForm.planId" placeholder="分组">
            <el-option v-for="item in deviceGroups" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </div>
  <!--  <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >查询</el-button>
  </el-form-item>-->
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {
    this.getDeviceGroups();
  },
  computed: {
    ...mapState({
      roles: state => state.common.roles,
      deviceTypes: state => state.common.deviceTypes,
      locations: state => state.common.locations,
      deviceGroups: state => state.common.deviceGroups
    }),
    ...mapState("device/list", {
      dataForm: state => state.addParams
    })
  },
  methods: {
    ...mapActions(["getDeviceGroups"])
  }
};
</script>
<style lang="scss" scoped>
.form {
  background: #fff;

  .demo-form-inline {
    width: 700px;
    margin: auto;
    padding-top: 60px;
    padding-bottom: 60px;
  }
}
</style>

