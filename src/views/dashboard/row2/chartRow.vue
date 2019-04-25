<template>
  <div>
    <div class="row">
      <Chart class="item" height="350px"/>
    </div>
  </div>
</template>
<script>
import Chart from "./Chart";
import Table from "./Table";
export default {
  components: {
    Chart,
    Table
  },
  data() {
    return {
      options: [],
      value: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.row {
  margin-top: 20px;
  display: flex;
  .item {
    flex: 2;
  }
  .item1 {
    flex: 1;
  }
}
</style>


