<template>
  <header>
    <h3>货道详情</h3>
    <div class="right">
      <el-input-number
        v-model="storex.right_detail.shelfCount"
        @change="(value)=>$emit('change',value)"
        :min="0"
        :max="100"
        label="货道数"
      ></el-input-number>
      <el-button style="margin-left:10px;" @click="$emit('pilian1')">批量编辑</el-button>
      <el-button type="primary" @click="$emit('tijiao')">提交</el-button>
    </div>
  </header>
</template>
<script>
import props from "../../rightMixins/props.js";
export default {
  mixins: [props]
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
  }
}
</style>

