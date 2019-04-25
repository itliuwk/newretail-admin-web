<template>
  <div class="page">
    <TableForm/>
    <el-table :data="tablelist1" v-loading="loading">
      <!-- <el-table-column label="场地名称" prop="locationName"></el-table-column> -->
      <el-table-column label="场地图片" prop="locationImage">
        <template slot-scope="scope">
          <img :src="scope.row.locationImage" alt style="widthL:50px;height:50px;">
        </template>
      </el-table-column>
      <el-table-column label="地址" prop="name">
        <template slot-scope="scope">
          <div>{{scope.row.locationName}}</div>
          <div>
            {{scope.row.province}}
            {{scope.row.city}}
            {{scope.row.district}}
            {{scope.row.street}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="可用库存" prop="availableStock"></el-table-column>
      <el-table-column label="操作" prop="name">
        <template slot-scope="scope">
          <span size="small" class="option-span" @click="go2stock(scope.row)">入库</span>
          <span type="text" size="small" class="option-span" @click="go2transfer(scope.row)">发货</span>
          <span type="text" size="small" class="option-span" @click="go2return(scope.row)">退货</span>
          <span
            type="text"
            size="small"
            class="option-span"
            @click="$router.push(`/inventory/audits?locationId=${scope.row.locationId}&productId=${$route.query.id}`)"
          >库存记录</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        :page-size="form.size"
        layout="prev, pager, next"
        :total="parseInt(total)"
        @current-change="pageChange"
      ></el-pagination>
    </div>

    <!-- stockin 入库 -->
    <StockingDialog v-if="stockshow" @finish="init"/>
    <!-- 发货 -->
    <TransferDialog v-if="transfershow" @finish="init"/>
    <!-- 退货 -->
    <ReturnDialog v-if="returnshow" @finish="init"/>
  </div>
</template>
<script>
import detailmix from "./mixins/detail.js";
import {
  get_list_in_locations,
  get_list_in_locations_total
} from "../../../api/inventory";
import TableForm from "./tableForm";
import commmix from "./mixins/comm.js";
import StockingDialog from "./update/stockinModal";
import TransferDialog from "./update/TransferDialog";
import ReturnDialog from "./update/ReturnDialog";
export default {
  mixins: [detailmix, commmix],
  components: { TableForm, StockingDialog, TransferDialog, ReturnDialog },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var self = this;
      self.setStore({ loading: true });
      get_list_in_locations_total({
        ...this.form,
        id: this.$route.query.id
      }).then(total => {
        self.setStore({ total });
      });
      get_list_in_locations({ ...this.form, id: this.$route.query.id })
        .then(tablelist1 => {
          self.setStore({ tablelist1, loading: false });
        })
        .catch(e => {
          self.setStore({ loading: false });
          myalert.fail("查询失败");
          console.error(e);
        });
    },
    go2stock(row) {
      this.setStore({ editRow2: row, stockshow: true });
    },
    go2transfer(row) {
      this.setStore({ editRow2: row, transfershow: true });
    },
    go2return(row) {
      this.setStore({ editRow2: row, returnshow: true });
    },
    async pageChange(page) {
      var self = this;
      this.form.from = (page - 1) * this.form.size;
      await self.setStore({ form: this.form });
      this.init();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.page {
  padding: 20px;
  background: #fff;
  margin-top: 20px;
}
.option-span {
  cursor: pointer;
  padding-right: 10px;
  color: $menuActiveText;
}
.pagination {
  padding-top: 20px;
  padding-bottom: 20px;
  background: #fff;
}
</style>


