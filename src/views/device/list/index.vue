<template>
  <div class="page-container">
    <form-container></form-container>
    <div class="centerWrapper">
      <Profile :devicesNum="devicesNum"></Profile>
      <div class="btns">
        <el-button type="primary" @click="addModal=true">添加设备</el-button>
      </div>
      <el-table v-loading="tableLoading" :data="lists" style="width: 100%">
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
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <router-link
              type="text"
              size="small"
              style="color:#409EFF;margin-right:10px;"
              :to="`/device/list/edit?id=${scope.row.id}`"
            >编辑</router-link>
            <el-button type="text" size="small" @click="seeCode(scope.row.id)">二维码</el-button>
            <el-button type="text" size="small" @click="seewxCode(scope.row.id)">小程序码</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="page"
          :page-size="size"
          :total="parseInt(list_total)"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>

    <!--        add modal-->
    <el-dialog
      title="添加"
      width="800px"
      :visible.sync="addModal"
      :before-close="handleCloseAddModal"
    >
      <AddModal ref="addmodalContainer"></AddModal>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModal = false">取消</el-button>
        <el-button type="primary" @click="sureAddModal">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { GET_wxCODE } from "../../../api/devices";
import { BASE_API } from "../../../config";
import myalert from "@/utils/alert";
import { GET_CODE } from "@/api/devices";
import { downLoad } from "@/utils/A";
import { getCookie } from "../../../utils/cookie";

const FormContainer = () => import("./form.vue");
const Profile = () => import("./profile.vue");
const AddModal = () => import("./addModal");
export default {
  data() {
    return {
      addModal: false
    };
  },
  components: {
    FormContainer,
    Profile,
    AddModal
  },
  mounted() {
    var params = {
      from: this.from,
      size: this.size
    };
    this.getData(params);
    this.getListTotal({ ...this.params });
    this.setDevicesNum({ ...this.params });
  },
  computed: {
    ...mapState("device/list", {
      tableLoading: state => state.tableLoading,
      lists: state => state.lists,
      params: state => state.params,
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
    ...mapActions("device/list", [
      "changeDeviceListPage",
      "setDevicesNum",
      "getListTotal",
      "addDeivce"
    ]),
    currentChange(page) {
      var params = {
        from: (page - 1) * this.size,
        size: this.size
      };
      this.getData(params);
    },
    getData({ from, size }) {
      this.changeDeviceListPage({ from, size });
    },
    sureAddModal() {
      var self = this;
      var $addmodal = this.$refs["addmodalContainer"].$refs["form"];
      $addmodal.validate(valid => {
        if (valid) {
          self
            .addDeivce()
            .then(res => {
              if (res.success) {
                self.$data.addModal = false;
                myalert.success("保存成功");
              } else {
                self.$data.addModal = true;
                // res.message.message
                myalert.fail("设备id冲突，请填写其它id");
              }
            })
            .catch(e => {
              self.$data.addModal = true;
              // res.message.message
              myalert.fail("设备id冲突，请填写其它id");
            });
        } else {
          self.$data.addModal = true;
        }
      });
    },
    //查看二维码
    seeCode(id) {
      var self = this;
      downLoad(
        BASE_API +
          `/api/admin/devices/qrcode?deviceId=${id}&access_token=${getCookie(
            "access_token"
          )}`
      );
    },
    seewxCode(id) {
      var self = this;
      downLoad(
        BASE_API +
          `/api/admin/devices/qrcodeText?deviceId=${id}&access_token=${getCookie(
            "access_token"
          )}`
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";

.page-container {
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
