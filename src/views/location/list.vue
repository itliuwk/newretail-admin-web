<template>
  <div class="pageContainer">
    <div class="formContainer">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="场地名称">
          <el-input v-model="formInline.query" placeholder="场地名称"></el-input>
        </el-form-item>
        <el-form-item label="行业类型">
          <el-select :clearable="true" v-model="formInline.typeId" placeholder="设备类型">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in locationTypes"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableContainer">
      <div class="btns">
        <el-button type="primary" @click="go2add">添加场地</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="image" label="图片">
          <div slot-scope="scope">
            <img :src="scope.row.image" alt width="100" height="100">
          </div>
        </el-table-column>
        <el-table-column prop="typeName" label="设备类型"></el-table-column>
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
        <el-table-column prop="devices" label="设备数"></el-table-column>

        <!-- <el-table-column prop="createdDate" label="创建时间"></el-table-column> -->
        <el-table-column prop="createdDate" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="go2edit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="go2addDevice(scope.row)">设备管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationContainer">
      <el-pagination
        background
        :current-page="currentPage"
        :page-size="page.size"
        layout="prev, pager, next"
        :total="pageTotal"
        @current-change="currentChange"
      ></el-pagination>
    </div>

    <!-- edit modal -->
    <el-dialog title="修改" :visible.sync="dialogUpdateVisible" width="80%">
      <EditModal ref="editmodalcontainer" :fromData="cacheRow" v-if="dialogUpdateVisible"></EditModal>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取消</el-button>
        <el-button type="primary" @click="sure2edit">确定</el-button>
      </div>
    </el-dialog>
    <!-- add device to localtion  modal -->
    <AddDevice :addmodalvisibale.sync="addmodalvisibale" @finish="addfinish"/>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { addLocaltion, deleteLocaltion } from "../../api/location";
import { pageSize } from "../../config";
import {
  getLocationList,
  getLocaltionTotal,
  updateLocaltion,
  localtionDetail
} from "@/api/location";
import { GET_LIST_TOTAL, GET_DEVICE_LISTS } from "@/api/devices";
import myalert from "@/utils/alert";
const EditModal = () => import("./editModal");
const chinaData = () => import("element-china-area-data");
const AddDevice = () => import("./AddDevice");
export default {
  name: "localtion_list",
  components: {
    EditModal,
    AddDevice
  },
  data() {
    return {
      formInline: {
        query: "",
        typeId: ""
      },
      tableloading: false,
      tableData: [],
      pageTotal: 0,
      page: {
        from: 0,
        size: pageSize
      },
      cacheRow: {},
      dialogUpdateVisible: false,
      addmodalvisibale: false
    };
  },
  mounted() {
    this.getLocationTypes();
    this.getTableData();
  },
  computed: {
    ...mapState({
      deviceTypes: state => state.common.deviceTypes,
      locationTypes: state => state.common.locationTypes
    }),
    currentPage() {
      if (!this.$data.page.from) {
        return 0;
      }
      return parseInt(this.$data.page.from / this.$data.page.size) + 1;
    }
  },
  methods: {
    ...mapActions(["getDeviceTypes", "getLocationTypes"]),
    deleteItem(item) {
      var self = this;
      myalert.confirm("确定删除场地？").then(() => {
        deleteLocaltion(item).then(res => {
          myalert.success("删除成功");
          self.getTableData();
        });
      });
    },
    addfinish(formdata) {
      var self = this;
      addLocaltion(formdata).then(res => {
        self.getTableData();
      });
    },
    currentChange(page) {
      this.$data.page.from = (page - 1) * this.$data.page.size;
      this.getTableData();
    },
    search() {
      this.$data.page.from = 0;
      this.getTableData();
    },

    getTableData() {
      var self = this;
      getLocaltionTotal({ ...this.$data.formInline, ...this.$data.page }).then(
        total => {
          self.$data.pageTotal = total;
        }
      );
      getLocationList({ ...this.$data.formInline, ...this.$data.page })
        .then(res => {
          self.$data.tableData = res;
        })
        .catch(e => {});
    },
    adaptAddress(row) {
      var self = this;
      //获取地址 获取详细信息
      return localtionDetail(row.id).then(detail => {
        return chinaData().then(({ regionData, CodeToText, TextToCode }) => {
          self.$data.regionData = regionData;
          self.$data.CodeToText = CodeToText;
          var data1 = TextToCode[row.province];
          var data2 = data1[row.city];
          var data3 = data2[row.district];
          row.selectedOptionValue = [data1.code, data2.code, data3.code];
          row.selectedOptionText = [row.province, row.city, row.district];
          return { ...row, ...detail };
        });
      });
    },
    go2edit(row) {
      var self = this;
      this.adaptAddress(row).then(newRow => {
        self.$data.dialogUpdateVisible = true;
        self.$data.cacheRow = newRow;
      });
    },
    go2add() {
      var self = this;
      self.addmodalvisibale = true;
    },

    sure2edit() {
      var self = this;
      var $form = this.$refs["editmodalcontainer"].$refs["form"];
      var $editmodalcontainer = this.$refs["editmodalcontainer"];
      $form.validate(valid => {
        if (valid) {
          self.$data.dialogUpdateVisible = false;
          //edit  to 后台
          $editmodalcontainer.$data.loading = true;
          updateLocaltion($form.model)
            .then(res => {
              $editmodalcontainer.$data.loading = false;
              myalert.success.call(self, "修改成功");
              $form.resetFields();
              self.getTableData();
            })
            .catch(e => {
              $editmodalcontainer.$data.loading = false;
              myalert.fail.call(self, "修改失败");
              console.error(e);
            });
        } else {
          self.$data.dialogUpdateVisible = true;
          $editmodalcontainer.$data.loading = false;
        }
      });
    },
    go2addDevice(row) {
      var self = this;
      this.$router.push(`/location/add-device?id=${row.id}`);
    },
    sure2addDevice() {
      this.$data.AddDevice2locationVisible = false;
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
  background: #fff;
  padding: 20px;
}
.paginationContainer {
  padding: 20px;
  background: #fff;
  .btns {
    padding-bottom: 20px;
  }
}
</style>

