<template>
  <div class="shelfs">
    <div class="formContainer">
      <el-form :inline="true" :model="dataForm" class="demo-form-inline" ref="form">
        <div>
          <el-form-item label="名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="设备类型" prop="name">
            <el-select v-model="dataForm.deviceTypeId" :clearable="true" placeholder="设备类型">
              <el-option
                v-for="item in deviceTypes"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="clickGetTableData">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="row2" style="display:flex;background:#fff;">
      <MyTable
        ref="lefttable"
        :dataForm.sync="dataForm"
        :deviceTypes.sync="deviceTypes"
        :isEdit.sync="isEdit"
        :isPostSelf.sync="isPostSelf"
        :cacheRow.sync="cacheRow"
      />
      <div style="flex:1;" class="right">
        <RightEdit :isEdit.sync="isEdit" v-if="isEdit" :cacheRow.sync="cacheRow"/>
        <div v-if="!isEdit" class="null">
          <header>
            <h3>货道详情</h3>
          </header>
        </div>
      </div>
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
import myalert from "@/utils/alert";
import MyTable from "./table";
import RightEdit from "./rightEdit";
import { pageSize } from "../../../config";
export default {
  name: "shelfs_list",
  components: {
    MyTable,
    RightEdit
  },
  data() {
    return {
      dataForm: { query: "", deviceTypeId: "", size: pageSize, from: 0 },
      isEdit: false,
      isPostSelf: false,
      cacheRow: {}
    };
  },
  computed: {
    ...mapState({
      deviceTypes: state => state.common.deviceTypes
    })
  },
  mounted() {
    this.getDeviceTypes();
  },
  methods: {
    ...mapActions(["getDeviceTypes"]),
    postShelfApply1(item) {
      this.$router.push(`/shelfs/putaway?id=${item.id}&name=${item.name}`);
    },
    go2add() {
      this.$router.push(`/shelfs/add`);
    },
    clickGetTableData() {
      this.$data.dataForm.from = 0;
      this.$refs["lefttable"].getTableData();
    }
  }
};
</script>

<style lang="scss" scoped>
.formContainer {
  padding: 10px;
  padding-top: 20px;
  background: #fff;
}

.row2 {
  margin-top: 20px;
}
.tableContainer {
  padding: 10px;
  padding-left: 20px;
  background: #fff;
  .btns {
    margin-bottom: 10px;
  }
}
.paginationContainer {
  padding: 20px;
  background: #fff;
}
.right {
  background: #fff;
  border-left: 1px solid #dddd;
  margin-left: 20px;
  .null {
    padding: 20px;
  }
}
</style>
