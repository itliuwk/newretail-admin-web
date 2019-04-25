<template>
  <div class="profile">
    <div class="item">
      <div class="small">总设备数</div>
      <div class="strong">{{devicesNum.devices}}台</div>
    </div>
    <div class="item">
      <div class="small">离线设备</div>
      <div class="strong">{{devicesNum .devices-devicesNum.activeDevices}}台</div>
    </div>
    <div class="item">
      <div class="small">在线设备</div>
      <div class="strong">{{devicesNum.activeDevices}}台</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["devicesNum"]
};
</script>
<style lang="scss" scoped>
.profile {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;

  .item {
    width: 100%;
    text-align: center;
    border-right: 1px solid #ddd;

    .small {
    }

    .strong {
      margin-top: 10px;
      font-size: 20px;
    }

    &:last-child {
      border-right: none;
    }
  }
}
</style>
