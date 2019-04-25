<template>
  <div>
    <div>
      <h4>销量排行榜</h4>
      <div class="row1">
        <div class="item1">
          <div class="item active">热销榜</div>
          <div class="item">设备榜</div>
        </div>
      </div>
      <div class="tableContainer">
        <el-table style="width: 100%">
          <el-table-column prop="date" label="排名"></el-table-column>
          <el-table-column prop="name" label="商品名称"></el-table-column>
          <el-table-column prop="address" label="销量数量（件）"></el-table-column>
          <el-table-column prop="address" label="销售金额（元）"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
h4 {
  margin: 0px;
  margin-bottom: 10px;
}
.row1 {
  display: flex;
  .item1 {
    display: flex;
    align-items: center;
    .item {
      text-align: center;
      margin-left: 5px;
      margin-right: 15px;
      padding-bottom: 10px;
      cursor: pointer;
      &.active {
        border-bottom: 2px solid $menuActiveText;
      }
    }
  }
}
</style>

