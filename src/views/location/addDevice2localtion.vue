<template>
  <div class="page-container">
    <dform @sure="search"></dform>
    <div class="centerWrapper">
      <div class="btns">
        <el-button type="primary" @click="suresumbit">投放设备</el-button>
      </div>
      <el-table
        v-loading="tableLoading"
        :data="lists"
        style="width: 100%"
        @row-click="rowclick"
        @select-all="selectall"
      >
        <el-table-column type="selection" width="55">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked" @change="rowclick(scope.row)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="设备"></el-table-column>
        <!-- <el-table-column prop="typeName" label="设备类型"></el-table-column> -->
        <el-table-column prop="typeName" label="场地地址">
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
        <el-table-column prop="groupName" label="分组名称"></el-table-column>
        <el-table-column prop="typeName" label="设备类型"></el-table-column>
        <!-- <el-table-column prop="typeName" label="门状态"></el-table-column> -->
        <el-table-column prop="createdDate" label="创建时间">
          <template slot-scope="scope">{{scope.row.createdDate|parseTime}}</template>
        </el-table-column>
        <el-table-column prop="active" label="设备状态" width="50">
          <template slot-scope="scope">
            <span v-if="!scope.row.active">离线</span>
            <span v-if="scope.row.active">在线</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          :page-size="params.size"
          layout="prev, pager, next"
          :current-page="page"
          :total="parseInt(devices)"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import commoneMixins from "./mixins/common.js";
import { mapState, mapActions } from "vuex";
import checkbox from "element-ui";
import {
  GET_DEVICES_NUM,
  GET_DEVICE_LISTS,
  GET_LIST_TOTAL
} from "../../api/devices";
import dform from "./adddevice2localtion/form";
import { addDevices2localtion } from "../../api/location";
import { GET_wxCODE } from "@/api/devices";
import { BASE_API, pageSize } from "@/config";
import myalert from "@/utils/alert";
import { GET_CODE } from "@/api/devices";
import { downLoad } from "@/utils/A";
import { getCookie } from "@/utils/cookie";
export default {
  mixins: [commoneMixins],
  data() {
    return {
      addModal: false,
      tableLoading: false,
      lists: [],
      formdata: {},
      params: {
        from: 0,
        size: pageSize
      },
      activeDevices: 0,
      devices: 0,
      selectArray: []
    };
  },
  components: { dform },
  mounted() {
    var params = {
      from: this.from,
      size: this.size
    };
    this.getData(params);
  },
  computed: {
    page: function() {
      return parseInt(this.from / this.size) + 1;
    }
  },
  methods: {
    search(formdata) {
      this.params.from = 0;
      this.params = { ...this.params, ...formdata };
      this.getData();
    },
    async getData() {
      var { activeDevices, devices } = await GET_DEVICES_NUM(this.params);
      var allcount = await GET_LIST_TOTAL({
        ...this.params,
        locationId: this.$route.query.id
      });
      var lists = await GET_DEVICE_LISTS(this.params);
      var selectArray = await GET_DEVICE_LISTS({
        ...this.params,
        locationId: this.$route.query.id
      });

      this.activeDevices = activeDevices;
      this.devices = devices;
      this.lists = lists;
      this.lists.map(item => {
        this.selectArray.map(item2 => {
          if (item2.id == item.id) {
            item.checked = true;
          }
        });
      });
    },
    suresumbit() {
      var self = this;
      var selectArray = this.lists.filter(item => item.checked);
      self.tableLoading = true;
      addDevices2localtion({
        id: this.$route.query.id,
        locationId: this.$route.query.id,
        deviceIds: selectArray.map(item => item.id)
      })
        .then(res => {
          self.tableLoading = false;
          myalert.success("投放成功");
          //关闭当前界面
          setTimeout(() => {
            self.delVisitedView(self.$route).then(res => {
              self.$router.go(-1);
            });
          }, 500);
        })
        .catch(e => {
          myalert.fail("投放失败");
          self.tableLoading = false;
          console.error(e);
        });
    },
    selectall() {
      this.lists.map(item => {
        item.checked = true;
      });
    },
    rowclick(row) {
      row.checked = !row.checked;
    },
    currentChange(page) {
      this.params.from = (page - 1) * this.params.size;
      this.getData();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";

.page-container {
  .formcontainer {
    background: #fff;
    padding-top: 20px;
  }
  .centerWrapper {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
  }

  .tableBtnsRow {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    padding-bottom: 20px;
  }
}

.pagination {
  margin-top: 20px;
}
</style>
