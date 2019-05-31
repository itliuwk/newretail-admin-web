<template>
  <div class="tableContainer">
    <div class="btns">
      <el-button type="primary" @click="go2add">新增方案</el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      :row-class-name="tableRowClassName"
      @row-click="go2edit"
    >
      <!-- <el-table-column label="编号" prop="id"></el-table-column> -->
      <el-table-column label="名字" prop="name">
        <template slot-scope="scope">
          <div
            :to="'/shelfs/detail?id='+scope.row.id"
            style="color:#409EFF;cursor:pointer;"
          >{{scope.row.name}}</div>
        </template>
      </el-table-column>
      <el-table-column label="货道数" width="80" prop="shelfCount"></el-table-column>
      <el-table-column label="设备数" width="80"  prop="devices"></el-table-column>
      <el-table-column label="类型"  width="100" prop="typeId">
        <template slot-scope="scope">
          <div v-if="scope.row.deviceTypeId=='quxia'">酒店售货机</div>
          <div v-else="!scope.row.deviceTypeId=='quxia-vm'">自助售货机</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            style="color:#409EFF"
            @click="$router.push(`/shelfs/putaway?id=${scope.row.id}`)"
          >上架</el-button>
          <el-button
            type="text"
            size="small"
            style="color:#409EFF"
            @click="deleteShelf1(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="paginationContainer" style="padding-top:20px">
      <el-pagination
        background
        :current-page="currentPage"
        :page-size="dataForm.size"
        layout="prev, pager, next"
        :total="pageTotal"
        @current-change="currentchange1"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getShelfs,
  getShelfDetail,
  postShelfApply,
  postShelf,
  deleteShelf,
  putShelf,
  getShelfCount
} from "@/api/shelfs";
import { mapState, mapActions } from "vuex";
import myalert from "../../../utils/alert";
export default {
  props: ["dataForm", "isEdit", "cacheRow", "isPostSelf"],
  data() {
    return {
      tableLoading: false,
      tableData: [],
      pageTotal: 0
    };
  },
  computed: {
    ...mapState({
      deviceTypes: state => state.common.deviceTypes
    }),
    currentPage() {
      if (!this.dataForm.from) {
        return 0;
      }
      return parseInt(this.dataForm.from / this.dataForm.size) + 1;
    }
  },
  mounted() {
    this.getTableData();
  },
  activated() {
    //keep-alive的组件 的生命周期钩子函数 https://www.jianshu.com/p/8b0e0849885a
    this.getTableData();
  },
  methods: {
    ...mapActions(["getDeviceTypes"]),
    tableRowClassName({ row, rowIndex }) {
      if (row.id === this.cacheRow.id) {
        return "success-row";
      }
      return "";
    },
    postShelfApply1(item) {
      this.$router.push(`/shelfs/putaway?id=${item.id}&name=${item.name}`);
    },
    go2add() {
      this.$router.push(`/shelfs/add`);
    },
    currentchange1(page) {
      this.dataForm.from = (page - 1) * this.dataForm.size;
      this.getTableData();
    },
    async getTableData() {
      this.$data.tableLoading = true;
      var params = { ...this.dataForm };
      var pageTotal = await getShelfCount(params);
      var tableData = await getShelfs(params);
      this.$data.tableData = tableData;
      this.$data.pageTotal = pageTotal;
      this.$data.tableLoading = false;
    },
    go2edit(row) {
      this.$emit("update:isEdit", true);
      this.$emit("update:cacheRow", row);
    },
    deleteShelf1(row) {
      var self = this;
      myalert.confirm("确定要删除吗？").then(res => {
        self.$data.tableLoading = true;
        deleteShelf(row.id).then(res => {
          self.$data.tableLoading = false;
          myalert.success("删除成功");
          self.getTableData();
        });
      });
    }
  }
};
</script>

