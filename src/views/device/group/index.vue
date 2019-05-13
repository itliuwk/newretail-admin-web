<template>
  <div class="pageContainer">
    <div class="formContainer">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="分组名">
          <el-input v-model="formInline.query" placeholder="分组名"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <el-button @click="resetForm1">重置</el-button> -->
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tableContainer">
      <div class="btnContainer">
        <el-button type="primary" @click="addModal=true">新增分组</el-button>
      </div>
      <template>
        <el-table :data="lists" style="width: 100%">
          <el-table-column prop="name" label="分组名"></el-table-column>
          <el-table-column prop="devices" label="设备数量"></el-table-column>
          <!--                    <el-table-column-->
          <!--                            prop="address"-->
          <!--                            label="创建时间">-->
          <!--                    </el-table-column>-->
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                style="color:#409EFF"
                @click="toEdit(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                style="color:#409EFF"
                @click="go2addDevice(scope.row)"
              >添加设备</el-button>
              <el-button type="text" size="small" @click="deleteGroup(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="page"
          :total="parseInt(list_total)"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>

    <!--        add modal-->
    <el-dialog
      title="添加"
      width="400px"
      :visible.sync="addModal"
      :before-close="handleCloseAddModal"
    >
      <AddModal ref="addmodalContainer"></AddModal>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModal = false">取消</el-button>
        <el-button type="primary" @click="sureAddModal">确定</el-button>
      </div>
    </el-dialog>
    <!--        update modal-->
    <el-dialog
      title="编辑"
      width="400px"
      :visible.sync="updateModal"
      :before-close="handleCloseAddModal"
    >
      <UpdateModal ref="updatemodalContainer" :dataForm="editDataForm"></UpdateModal>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateModal = false">取消</el-button>
        <el-button type="primary" @click="sureUpdateModal">确定</el-button>
      </div>
    </el-dialog>
    <!--        添加 设备弹出框-->
    <el-dialog
      title="编辑"
      width="800px"
      :visible.sync="addDeviceModal"
      :before-close="handleCloseAddModal"
    >
      <AddDeviceModal
        v-if="addDeviceModal"
        ref="AddDeviceModalContainer"
        :dataForm="addDeviceModalDataForm"
      ></AddDeviceModal>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDeviceModal = false">取消</el-button>
        <el-button type="primary" @click="sureAddDeviceModal">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import myalert from "@/utils/alert";
import {
  GET_DEVICE_LISTS,
  GET_LIST_TOTAL,
  ADD_DEVICES_INTO_GROUP,
  DELETE_DEVICE_GROUPS,
  GET_DEVICES_NUM
} from "@/api/devices";
import { pageSize } from "../../../config";
const UpdateModal = () => import("./editModal");
const AddModal = () => import("./addModal");
const AddDeviceModal = () => import("./addDeviceModal");
export default {
  name: "device_group_list",
  components: {
    AddModal,
    UpdateModal,
    AddDeviceModal
  },
  data() {
    return {
      editDataForm: {},
      tableData: [],
      addModal: false,
      updateModal: false,
      addDeviceModal: false,
      addDeviceModalDataForm: {} //添加设备数据
    };
  },
  mounted() {
    this.getDeviceGroups({ from: 0, size: pageSize, ...this.formInline });
    this.getListTotal();
  },
  computed: {
    ...mapState("device/group/list", {
      tableLoading: state => state.tableLoading,
      lists: state => state.lists,
      formInline: state => state.params,
      from: state => state.page.from,
      list_total: state => state.list_total,
      devicesNum: state => state.devicesNum,
      size: state => state.page.size
    }),
    page: function() {
      return parseInt(this.from / this.size) + 1;
    },
    handleCloseAddModal() {}
  },
  methods: {
    ...mapActions("device/group/list", [
      "getDeviceGroups",
      "resetForm",
      "getListTotal",
      "changeDeviceListPage"
    ]),
    ...mapActions("device/group/add", ["addDeviceGroup"]),
    ...mapActions("device/group/edit", ["initEditRow", "updateDeviceGroup"]),
    deleteGroup(row) {
      var self = this;
      this.$confirm("此操作将永久删除该设备组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        DELETE_DEVICE_GROUPS(row)
          .then(res => {
            myalert.success.call(self, "删除成功");
            //刷新界面
            self.getDeviceGroups({
              from: self.from,
              size: self.size,
              ...self.formInline
            });
          })
          .catch(e => {
            console.error(e);
            myalert.fail.call(self, "删除失败");
          });
      });
    },
    //确定 分组按钮
    sureAddDeviceModal() {
      var self = this;
      var deviceIds = this.$refs["AddDeviceModalContainer"].dataForm.value;
      var groupId = this.$refs["AddDeviceModalContainer"].dataForm.params
        .groupId;
      //添加到后台
      ADD_DEVICES_INTO_GROUP({
        groupId,
        deviceIds: deviceIds.map(item => item.id)
      })
        .then(res => {
          myalert.success.call(self, "添加成功");
          self.$data.addDeviceModal = false;
          //刷新界面
          self.getDeviceGroups({ ...self.formInline });
        })
        .catch(e => {
          myalert.success.call(self, "添加失败");
          self.$data.addDeviceModal = true;
          console.error(e);
        });
    },
    currentChange(page) {
      var params = {
        from: (page - 1) * this.size,
        size: this.size
      };
      this.getData(params);
    },
    getData({ from, size }) {
      this.changeDeviceListPage({ ...this.formInline, from, size });
    },
    search() {
      this.getDeviceGroups({ ...this.formInline });
    },
    resetForm1() {
      this.resetForm();
    },
    sureAddModal() {
      var self = this;
      var $addmodal = this.$refs["addmodalContainer"].$refs["form"];

      $addmodal.validate(valid => {
        if (valid) {
          self.$data.addModal = false;

          self.addDeviceGroup({ ...$addmodal.model }).then(res => {
            if (res.success) {
              myalert.success.call(self, "保存成功");
              this.getDeviceGroups({
                ...self.formInline,
                from: self.from,
                size: self.size
              });
              $addmodal.resetFields();
            } else {
              myalert.fail.call(this, res.message);
            }
          });
        } else {
          self.$data.addModal = true;
        }
      });
    },
    sureUpdateModal() {
      var self = this;
      var $modal = this.$refs["updatemodalContainer"].$refs["form"];
      $modal.validate(valid => {
        if (valid) {
          self.$data.updateModal = false;
          self.updateDeviceGroup($modal.model);
        } else {
          self.$data.updateModal = true;
        }
      });
    },
    toEdit(row) {
      this.$data.updateModal = true;
      this.$data.editDataForm = row;
    },
    go2addDevice(row) {
      var self = this;
      var params = {
        // groupId: row.id,
        // group: row,
        query: "",
        total: 0,
        from: 0,
        size: pageSize
      };
      GET_DEVICE_LISTS(params).then(selectArray => {
        params.groupId = row.id;
        params.group = row;
        GET_DEVICE_LISTS(params).then(value => {
          //获取一次device的总数
          GET_DEVICES_NUM(params).then(({ activeDevices, devices }) => {
            params.total = devices;
            params.activeDevices = activeDevices;
            //如果已经选择 就 disabled
            selectArray = selectArray.map((item, index) => {
              value.map(item2 => {
                if (item2.id == item.id) {
                  // self.dataForm.selectArray.splice(index, 1);
                  item.checked = false;
                  item.disabled = true;
                }
              });
              return item;
            });
            self.$data.addDeviceModalDataForm = {
              selectArray: selectArray,
              value: value,
              params
            };
            self.$data.addDeviceModal = true;
          });
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.pageContainer {
}

.formContainer {
  padding-top: 20px;
  padding-left: 20px;
  background: #fff;
}

.tableContainer {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
}

.pagination {
  margin-top: 10px;
  padding-bottom: 10px;
}
</style>