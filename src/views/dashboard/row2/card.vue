<template>
  <div class="card">
    <div class="title">{{title}}</div>
    <div class="row2">
      <strong>{{strong}}</strong>
      <small>{{unit}}</small>
    </div>
    <div class="row3">
      <span>环比</span>
      <span style="padding-left:10px;padding-right:5px;">{{huanbi}}</span>

      <svg-icon icon-class="up" v-if="type=='up'&&huanbi!='0%'" style="color:red"></svg-icon>
      <svg-icon icon-class="down1" v-if="type=='down'&&huanbi!='0%'" style="color:green"></svg-icon>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "strong", "unit", "huanbi", "type"]
};
</script>
<style lang="scss" scoped>
.card {
  width: calc(25% - 20px);
  border: 1px solid #ddd;
  height: 100px;
  border-radius: 5px;
  padding: 10px 0 10px 20px;
  margin-right: 20px;
  .title {
  }
  .row2 {
    margin-top: 5px;
    margin-bottom: 5px;
    strong {
      font-size: 25px;
    }
  }
  .row3 {
    font-size: 12px;
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 800px) {
    & {
      width: calc(50% - 20px);
      margin-bottom: 10px;
    }
  }
}
</style>

