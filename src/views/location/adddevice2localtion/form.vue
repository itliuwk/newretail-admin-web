<template>
  <div class="formcontainer">
    <el-form
      ref="ruleForm"
      :inline="true"
      :model="formdata"
      class="demo-form-inline"
      label-position="right"
      label-width="100px"
    >
      <div>
        <el-form-item label="设备名称">
          <el-input v-model="formdata.query" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="formdata.id" placeholder="设备编号"></el-input>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select :clearable="true" v-model="formdata.active" :value="''" placeholder="设备状态">
            <el-option label="在线" :value="true"></el-option>
            <el-option label="离线" :value="false"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="场地">
          <el-select v-model="formdata.locationId" placeholder="场地" :clearable="true">
            <el-option :key="item.id" v-for="item in locations" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分组">
          <el-select v-model="formdata.groupId" placeholder="分组" :clearable="true">
            <el-option
              :key="item.id"
              v-for="item in deviceGroups"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类型">
          <el-select :clearable="true" v-model="formdata.typeId" placeholder="类型">
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
          <el-button type="primary" @click="$emit('sure',formdata)">查询</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { clone } from "@/filters";
import commoneMixins from "../mixins/common.js";
export default {
  mixins: [commoneMixins],
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      formdata: {}
    };
  }
};
</script>
<style lang="scss" scoped>
.formcontainer {
  padding: 20px;
  background: #fff;
}
</style>


