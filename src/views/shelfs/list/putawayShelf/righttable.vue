<template>
  <div
    class="right"
    style="flex:1"
  >
    <header>
      <div class="item">
        <div class="small">已选设备</div>
        <div class="strong">{{selectData.length}}台</div>
      </div>
    </header>
    <el-table
      :data="selectData"
      style="width: 100%"
      ref="table"
      @row-click="(row)=>{$emit('selectRow',row)}"
    >
      <!-- @selection-change="(rows)=>{$emit('selectRow',rows)}" -->
      <el-table-column width="55">
        <template slot-scope="scope">
          <el-checkbox
            :value="scope.row.checked"
            :checked="scope.row.checked"
            @change="checked_checkbox($event,scope.row,scope.$index)"
          ></el-checkbox>
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
      <!-- <el-table-column prop="groupName" label="分组名称"></el-table-column> -->
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
  </div>
</template>
<script>
import initStore from "./initStore";
export default {
  props: {
    storex: {
      type: Object,
      default: () => initStore
    }
  },
  data() {
    return {};
  },
  computed: {
    selectData() {
      return this.storex.selectData;
    }
  },
  methods: {
    checked_checkbox(checked, row, index) {
      // this.$parent.$data.leftTableList[index].checked = !checked;
      this.$emit('selectRow', row)
    }
  }
};
</script>
<style lang="scss" scoped>
.right {
  margin-top: 20px;
  header {
    padding: 10px;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    .item {
      display: flex;
      padding-bottom: 10px;
      align-items: center;
      margin-right: 10px;
      .small {
        padding-right: 10px;
      }
    }
  }
}
</style>


   