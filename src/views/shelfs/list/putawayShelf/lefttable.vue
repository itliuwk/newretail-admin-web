<template>
  <div class="left">
    <div class="page-container">
      <div class="centerWrapper">
        <Profile :storex="storex"></Profile>

        <el-table
          :data="storex.leftTableList"
          style="width: 100%"
          @row-click="(row)=>{$emit('selectRow',row)}"
          ref="table"
          :row-class-name="tableRowClassName"
        >
          <!-- @selection-change="(rows)=>{$emit('selectRow',rows)}" -->
          <el-table-column width="55">
            <template slot-scope="scope">
              <div>
                <el-checkbox
                  :value="scope.row.checked&&!scope.row.disabled"
                  :checked="scope.row.checked&&!scope.row.disabled"
                  :disabled="scope.row.disabled"
                  @change="checked_checkbox($event,scope.row,scope.$index)"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="设备"
          ></el-table-column>
          <!-- <el-table-column prop="typeName" label="设备类型"></el-table-column> -->
          <el-table-column
            prop="typeName"
            label="场地地址"
          >
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
          <el-table-column
            prop="groupName"
            label="分组名称"
          ></el-table-column>
          <el-table-column
            prop="typeName"
            label="设备类型"
          ></el-table-column>
          <!-- <el-table-column prop="typeName" label="门状态"></el-table-column> -->
          <!-- <el-table-column prop="createdDate" label="创建时间">
            <template slot-scope="scope">{{scope.row.createdDate|parseTime}}</template>
          </el-table-column>-->
          <el-table-column
            prop="active"
            label="设备状态"
            width="50"
          >
            <template slot-scope="scope">
              <span v-if="!scope.row.active">离线</span>
              <span v-if="scope.row.active">在线</span>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page"
            :total="parseInt(devices)"
            @current-change="(page)=>$emit('changePage',page)"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Profile = () => import("./deviceprofile.vue");
import { mapState, mapActions } from "vuex";
import myalert from "@/utils/alert";
import { GET_CODE } from "@/api/devices";
import initStore from "./initStore";

export default {
  props: {
    storex: Object,
    default: () => initStore
  },
  components: { Profile },
  data() {
    return {
      cacheRows: []
    };
  },
  computed: {
    devices: function () {
      return this.storex.devices;
    },
    page: function () {
      return (
        parseInt(this.storex.formdata.from / this.storex.formdata.size) + 1
      );
    }
  },
  mounted() { },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.checked) {
        return 'selected-row';
      }
      return 'no-hover';
    },
    checked_checkbox(checked, row, index) {
      // this.$parent.$data.leftTableList[index].checked = !checked;
      this.$emit('selectRow', row)
    }
  }
};
</script>
<style lang="scss" scoped>
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


