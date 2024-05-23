<template>
  <div class="card">
    <div class="row1">
      <svg-icon :icon-class="icon"></svg-icon>
      <span style="padding-left:5px">{{title}}</span>
    </div>
    <div class="row2">
      <div class="item">
        <div>总数</div>
        <strong>{{leftText}}</strong>
        <small>{{unit}}</small>
      </div>
      <div class="item" style="margin-left:20px">
        <div>在线数</div>
        <strong>{{rightText}}</strong>
        <small>{{unit}}</small>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "title",
    "leftText",
    "rightText",
    "unit",
    "smallText1",
    "smallText2",
    "smallValue1",
    "smallValue2",
    "icon"
  ]
};
</script>
<style lang="scss" scoped>
.card {
  background: #fff;
  width: calc(33.33% - 20px);
  /* border: 1px solid #eee; */
  border-radius: 5px;
  margin-right: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .row2 {
    display: flex;
    margin-top: 10px;
    strong {
      font-size: 22px;
    }
  }
  @media screen and (max-width: 800px) {
    & {
      width: calc(50% - 20px);
      margin-bottom: 10px;
    }
  }
}
</style>
