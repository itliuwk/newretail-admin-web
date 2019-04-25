<template>
  <div class="pageContainer" v-loading="loading">
    <div class="formContainer">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="formData.cachequery" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item style="padding-left:30px">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableContainer">
      <el-table :data="lists" style="width: 100%">
        <el-table-column prop="name" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.image" min-width="70" width="70" height="70">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="availableStock" label="可用库存"></el-table-column>
        <!-- <el-table-column prop="price" label="售卖场地"></el-table-column> -->
        <el-table-column fixed="right" label="操作">
          <template slot-scope="lists">
            <span
              size="small"
              class="option-span"
              style="margin: 0 5px;cursor:pointer;"
              @click="editItem(lists.row)"
            >查看</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-size="page.size"
          layout="prev, pager, next"
          :total="parseInt(total)"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import * as inventoryApi from "@/api/inventory";
import { pageSize } from "../../../config";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      formData: {
        query: "",
        cachequery: ""
      },
      page: {
        from: 0,
        size: pageSize
      },
      lists: [],
      total: 0
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    ...mapActions("inventory/list", ["setEditRow"]),
    onSubmit() {
      this.$data.formData.query = this.$data.formData.cachequery;
      this.getTableData();
    },
    currentChange(page) {
      this.$data.page.from = (page - 1) * this.$data.page.size;
      this.getTableData();
    },
    async getTableData() {
      var params = {
        ...this.$data.formData,
        ...this.$data.page
      };
      this.$data.loading = true;
      var total = await inventoryApi.get_list_total(params);
      var lists = await inventoryApi.get_list(params);
      this.$data.loading = false;
      this.$data.lists = lists;
      this.$data.total = total;
    },
    editItem(row) {
      this.setEditRow(row);
      this.$router.push(
        `/inventory/detail?id=${row.id}&availableStock=${row.availableStock}`
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.formContainer {
  padding: 20px;
  background: #fff;
}
.tableContainer {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  .pagination {
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: #fff;
  }
}
.option-span {
  color: #409eff;
  cursor: pointer;
}
</style>


