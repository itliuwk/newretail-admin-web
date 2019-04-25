
<template>
  <div class="tableWrapper" v-loading="loading">
    <div class="formcontainer">
      <el-form :inline="true" :model="tableFormModal" class="demo-form-inline">
        <el-form-item label="类型">
          <el-select v-model="tableFormModal.types" placeholder="类型" :clearable="true">
            <el-option label="入货" value="STOCKIN"></el-option>
            <el-option label="退货" value="RETURN"></el-option>
            <el-option label="发货" value="TRANSFER"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="tableFormModal.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="search1" type="primary">搜索</el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableCongtainert">
      <el-table :data="lists" style="width: 100%">
        <el-table-column prop="id" label="编号"></el-table-column>

        <el-table-column prop="userName" label="操作人"></el-table-column>
        <el-table-column prop="amount" label="件数"></el-table-column>
        <el-table-column prop="beforeStock" label="起初库存"></el-table-column>
        <el-table-column prop="afterStock" label="结束库存"></el-table-column>
        <!-- <el-table-column prop="warehouseName" label="场地"></el-table-column> -->
        <el-table-column prop="price" label="场地地址">
          <template slot-scope="scope">
            <span>
              {{scope.row.province}}
              {{scope.row.city}}
              {{scope.row.district}}
              {{scope.row.street}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="操作类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type=='STOCKIN'">入库</span>
            <span v-if="scope.row.type=='RETURN'">退货</span>
            <span v-if="scope.row.type=='TRANSFER'">发货</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdDate" label="操作时间">
          <template slot-scope="scope">
            <span>{{scope.row.createdDate|dateTimeFormate}}</span>
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
    </div>
  </div>
</template>
<script>
import { get_list_audits, get_list_audits_total } from "@/api/inventory";
import { formatTime } from "@/filters";

import myalert from "@/utils/alert";
import auditsmix from "../mixins/audits";
import commonmix from "../mixins/comm.js";
import { dateFormate } from "../../../../utils/date";
var tableFormModal = Object.defineProperties(
  {
    productId: "",
    locationId: "",
    type: "",
    time: ""
  },
  {
    start: {
      get() {
        if (!this.time) return "";
        return dateFormate(this.time[0]);
      }
    },
    end: {
      get() {
        if (!this.time) return "";
        return dateFormate(this.time[2]);
      }
    }
  }
);

export default {
  mixins: [auditsmix, commonmix],
  components: {},
  data() {
    return {
      tableFormModal
    };
  },
  mounted() {
    this.init();
  },
  computed: {},
  methods: {
    async search1() {
      await this.setStore({
        form: {
          ...this.form,
          ...this.tableFormModal,
          start: this.tableFormModal.start + "",
          end: this.tableFormModal.end + ""
        }
      });
      this.init();
    },
    init() {
      var self = this;
      self.setStore({ loading: true });
      get_list_audits_total({
        ...this.form,
        productId: this.$route.query.productId,
        locationId: this.$route.query.locationId
      }).then(total => {
        self.setStore({ total });
      });
      get_list_audits({
        ...this.form,
        productId: this.$route.query.productId,
        locationId: this.$route.query.locationId
      })
        .then(lists => {
          self.setStore({ lists, loading: false });
        })
        .catch(e => {
          self.setStore({ loading: false });
          myalert.fail("查询失败");
          console.error(e);
        });
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
.btns {
  padding: 20px;
  background: #fff;
}
.tableWrapper {
  margin-top: 20px;
}
.pagination {
  padding-top: 20px;
  padding-bottom: 20px;
  background: #fff;
}
.tableWrapper {
  .formcontainer {
    background: #fff;
    padding: 20px;
  }
  .tableCongtainert {
    background: #fff;
    margin-top: 20px;
    padding: 20px;
  }
}
</style>


