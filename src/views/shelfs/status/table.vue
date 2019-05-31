<template>
  <div class="tableContainer">
    <header
      class="btns"
      style="padding-top:18px;padding-bottom: 18px;"
    >
      <h3>设备列表</h3>
      <div class="smnallbtns">
        <div class="item">
          <div classs="itemlabel">货道总数：</div>
          <div classs="itemvalue">{{ devices}}个</div>
        </div>
        <div class="item">
          <div classs="itemlabel">售空货道：</div>
          <div classs="itemvalue">{{outOfStockDevices}}个</div>
        </div>
      </div>
    </header>
    <el-table
      :data="leftTableData"
      v-loading="loading"
      :row-class-name="tableRowClassName"
      @row-click="(row)=>{$emit('clickrow',row)}"
    >
      <el-table-column
        label="编号"
        prop="id"
      ></el-table-column>
      <el-table-column
        label="名字"
        prop="name"
      >
        <template slot-scope="scope">
          <div
            :to="'/shelfs/detail?id='+scope.row.id"
            style="color:#409EFF;cursor:pointer;"
          >{{scope.row.name}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="地址"
        prop="locationName"
      ></el-table-column>
      <el-table-column
        label="类型"
        prop="locationName"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.typeId=='quxia'">酒店售货机</div>
          <div v-else="!scope.row.typeId=='quxia-vm'">自助售货机</div>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="active"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.active">在线</div>
          <div v-if="!scope.row.active">离线</div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="设备数" prop="devices"></el-table-column> -->
    </el-table>

    <div
      class="paginationContainer"
      style="padding-top:20px"
    >
      <el-pagination
        background
        :page-size="dataForm.size"
        layout="prev, pager, next"
        :total="devices"
        @current-change="(page)=>$emit('changePagination',page)"
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
import {
  get_shelfs_device_lists,
  get_shelfs_device_summary
} from "../../../api/devicesStatus";
import props1 from "./mixins/props";
export default {
  mixins: [props1],
  data() {
    return {};
  },
  mounted() { },
  methods: {
    ...mapActions(["getDeviceTypes"]),
    tableRowClassName({ row, rowIndex }) {
      if (row.id === this.leftSelectRow.id) {
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

<style lang="scss" scoped>
.tableContainer {
  background: #fff;
  .btns {
    margin-bottom: 10px;
  }
}
header {
  width: 100%;
  align-items: center;
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  .smnallbtns {
    padding-left: 20px;
    flex: 1;
    display: flex;
    .item {
      padding-right: 20px;
      display: flex;
    }
  }
}
</style>

