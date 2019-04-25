<template>
  <div class="btns">
    <el-form :inline="true" :model="tableFormModal" class="demo-form-inline">
      <el-form-item label="选择场地">
        <el-select v-model="tableFormModal.locationId" placeholder="发货场地" :clearable="true">
          <el-option
            v-for="item1 in locations"
            :key="item1.id"
            :label="item1.name"
            :value="item1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行业类型">
        <el-select :clearable="true" v-model="tableFormModal.typeId" placeholder="类型">
          <el-option
            :key="item.id"
            v-for="item in locationTypes"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search1" type="primary">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import defailmix from "./mixins/detail.js";
import { get_list_audits_total, get_list_audits } from "../../../api/inventory";
export default {
  mixins: [defailmix],
  data() {
    return {
      tableFormModal: {}
    };
  },
  methods: {
    async search1() {
      var self = this;
      await this.setStore({ form: this.tableFormModal });
      await self.setStore({ loading: true });
      get_list_audits_total({ ...this.form, id: this.$route.query.id }).then(
        total => {
          self.setStore({ total });
        }
      );
      get_list_audits({ ...this.form, id: this.$route.query.id })
        .then(lists => {
          self.setStore({ lists, loading: false });
        })
        .catch(e => {
          self.setStore({ loading: false });
          console.error(e);
        });
    }
  }
};
</script>
