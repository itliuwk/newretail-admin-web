<template>
  <div class="form">
    <el-form
      v-loading="loading"
      :inline="true"
      :model="dataForm"
      class="demo-form-inline"
      label-width="120px"
      ref="form"
    >
      <div>
        <el-form-item label="设备类型" prop="type" :rules="[  { required: true, message: '不能为空'}, ]">
          <el-select v-model="dataForm.type" placeholder="设备类型" :disabled="true">
            <el-option
              :key="item.id"
              v-for="item in deviceGroups"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="设备名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="设备名称"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="设备编号" prop="id" :rules="[  { required: true, message: '不能为空'}, ]">
          <el-input v-model="dataForm.id" placeholder="设备编号" disabled type="number"></el-input>
        </el-form-item>
        <el-form-item label="选择场地" prop="locationId">
          <el-select v-model="dataForm.locationId" placeholder="选择场地" :clearable="true">
            <el-option :key="item.id" v-for="item in locations" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="分组" prop="groupId">
          <el-select v-model="dataForm.groupId" placeholder="分组" :clearable="true">
            <el-option
              :key="item.id"
              v-for="item in deviceGroups"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="last_row" style="display:flex;margin-left:120px">
        <el-form-item>
          <el-button type="default" @click="resetForm1('ruleForm')">重置</el-button>
          <el-button type="primary" @click="onSubmit">修改</el-button>
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
import myalert from "@/utils/alert";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      deviceId: "",
      dataFormCopy: {}
    };
  },
  mounted() {
    var deviceId = this.$route.query.id;
    this.getDeviceDetail({ id: deviceId });

    this.getDeviceGroups();
    this.getLocations();
  },
  computed: {
    ...mapState("device/edit", {
      dataForm: state => state.device,
      loading: state => state.loading
    }),
    ...mapState({
      roles: state => state.common.roles,
      deviceTypes: state => state.common.deviceTypes,
      locations: state => state.common.locations,
      deviceGroups: state => state.common.deviceGroups
    })
  },
  methods: {
    ...mapActions("device/edit", [
      "getDeviceDetail",
      "updateDevice",
      "resetForm"
    ]),
    ...mapActions([
      "getRoles",
      "getDeviceGroups",
      "getLocations",
      "delVisitedView"
    ]),
    //update sure btn
    onSubmit() {
      var self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          self.updateDevice(self.dataForm).then(res => {
            if (res.success) {
              myalert.success(res.message);
              setTimeout(() => {
                self.delVisitedView(self.$route).then(res => {
                  self.$router.go(-1);
                });
              }, 500);
            } else {
              myalert.fail(res.message);
            }
          });
        }
      });
    },
    resetForm1() {
      this.resetForm();
    }
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

