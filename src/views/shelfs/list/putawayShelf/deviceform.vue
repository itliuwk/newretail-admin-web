<template>
  <div class="form-container">
    <el-form
      ref="ruleForm"
      :inline="true"
      :model="formData"
      class="demo-form-inline"
      label-position="right"
      label-width="100px"
    >
      <div>
        <el-form-item label="设备名称">
          <el-input v-model="formData.query" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="formData.id" placeholder="设备编号"></el-input>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select :clearable="true" v-model="formData.active" :value="''" placeholder="设备状态">
            <el-option label="在线" :value="true"></el-option>
            <el-option label="离线" :value="false"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="场地">
          <el-select v-model="formData.locationId" placeholder="场地" :clearable="true">
            <el-option :key="item.id" v-for="item in locations" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分组">
          <el-select v-model="formData.groupId" placeholder="分组" :clearable="true">
            <el-option
              :key="item.id"
              v-for="item in deviceGroups"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型">
          <el-select :clearable="true" v-model="formData.typeId" placeholder="类型">
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
          <el-button @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="applyPost">上架</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { postShelfApply } from "../../../../api/shelfs";
import myalert from "../../../../utils/alert";
import { setTimeout } from "timers";
import { GET_DEVICE_LISTS, GET_DEVICES_NUM } from "../../../../api/devices";
export default {
  props: ["selectData"],
  data() {
    return {
      loading: false,
      formData: {},
      activeDevices: 0,
      devices: 0
    };
  },
  mounted() {
    this.getDeviceTypes();
    this.getLocations();
    this.getDeviceGroups();
  },
  computed: {
    ...mapState({
      deviceTypes: state => state.common.deviceTypes,
      locations: state => state.common.locations,
      deviceGroups: state => state.common.deviceGroups
    })
  },
  methods: {
    ...mapActions([
      "getDeviceTypes",
      "getLocations",
      "delVisitedView",
      "getDeviceGroups"
    ]),
    resetForm1(formName) {
      this.resetForm();
    },
    onSubmit() {
      this.$emit("sure", this.formData);
    },
    async getDeviceList() {
      var { activeDevices, devices } = await GET_DEVICES_NUM(this.formData);
      var result2 = await GET_DEVICE_LISTS(this.formData);
    },
    applyPost() {
      var self = this;
      myalert.confirm("确定提交？").then(res => {
        if (self.selectData) {
          self.$data.loading = true;
          postShelfApply({
            id: self.$route.query.id,
            deviceIds: self.selectData.map(item => item.id)
          })
            .then(res2 => {
              self.$data.loading = false;
              myalert.success("提交成功");
              setTimeout(() => {
                //delete current route view
                self.delVisitedView(self.$route).then(res => {
                  self.$router.go(-1);
                });
              }, 500);
            })
            .catch(e => {
              console.error(e);
              self.$data.loading = false;
            });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.form-container {
  background: #fff;
  padding: 30px;
}
</style>
