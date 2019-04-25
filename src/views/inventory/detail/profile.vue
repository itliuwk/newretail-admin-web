<template>
  <div class="profileContainer">
    <div class="left">
      <img :src="editRow.image" alt>
    </div>
    <div class="right">
      <h3>{{editRow.name}}</h3>
      <div class="row">
        <!-- <div class="item">
          <strong>成本价：</strong>
          <strong></strong>
        </div>
        <div class="item">
          <strong>零售价：</strong>
          <strong></strong>
        </div>-->
        <div class="item">
          <strong>库存：</strong>
          <strong>{{editRow.availableStock||0}}件</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import detailmix from "./mixins/detail.js";
export default {
  mixins: [detailmix],
  mounted() {}
};
</script>

<style lang="scss" scoped>
.profileContainer {
  padding: 30px;
  background: #fff;
  display: flex;
  h3 {
    padding-bottom: 10px;
    small {
      font-size: 16px;
    }
  }
}

.left {
  width: 100px;
  height: 100px;
  img {
    width: 100px;
    height: 100px;
  }
}
.right {
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.row {
  display: flex;
  .item {
    display: flex;
    align-items: center;
    strong {
    }
  }
}
</style>

