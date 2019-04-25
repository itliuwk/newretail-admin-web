<template>
  <div class="profile">
    <div class="item">
      <div class="small">已选设备</div>
      <div class="strong">{{storex.devices}}台</div>
    </div>
    <div class="item">
      <div class="small">在线机器</div>
      <div class="strong">{{storex.activeDevices}}台</div>
    </div>
    <div class="item">
      <div class="small">离线机器</div>
      <div class="strong">{{storex.devices-storex.activeDevices}}台</div>
    </div>

    <!-- <div class="item">
      <div class="small">故障机器</div>
      <div class="strong">{{devicesNum.devices-devicesNum.activeDevices}}台</div>
    </div>-->
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
  }
};
</script>
<style lang="scss" scoped>
.profile {
  display: flex;
  justify-content: flex-start;
  .item {
    display: flex;
    padding-bottom: 10px;
    margin-right: 10px;
    small {
      padding-right: 10px;
    }
  }
}
</style>
