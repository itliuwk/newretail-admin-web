<template>
  <div class="centerBtnWrapper">
    <div style="width:60px;opacity:0;">1</div>
    <div v-sticky>
      <div class="centerBtn">
        <svg-icon
          icon-class="right"
          class="icon left"
          @click="$emit('clickRight')"
          :style="leftStyle"
        />
        <svg-icon
          icon-class="left"
          class="icon right"
          @click="$emit('clickLeft')"
          :style="rightStyle"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    storex: {
      type: Object,
      default: () => initStore
    }
  },
  computed: {
    selectData() {
      return this.storex.selectData;
    },
    leftStyle() {
      return {
        color: "#fff",
        background: this.isClickLeft ? "#409EFF" : "#bfcbd9",
        cursor: this.isClickLeft ? "pointer" : "not-allowed"
      };
    },
    rightStyle() {
      return {
        color: "#fff",
        background: this.isClickRight ? "#409EFF" : "#bfcbd9",
        cursor: this.isClickRight ? "pointer" : "not-allowed"
      };
    },
    isClickLeft() {
      return this.storex.clickwhat == "clickleft";
    },
    isClickRight() {
      return this.storex.clickwhat == "clickright";
    },
    clickwhat() {
      return this.storex.clickwhat;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.centerBtnWrapper {
  .centerBtn {
    padding: 10px;
    display: flex;
    flex-direction: column;
    .icon {
      cursor: not-allowed;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      border: 1px solid #ddd;
      padding: 10px;
      background: $menuText;
      color: $subMenuActiveText;
      &:last-child {
        margin-top: 10px;
      }
    }
  }
}
</style>

