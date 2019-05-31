<template>
  <div class="header">
    <div class="item1">
      <div :class="`item ${type=='today'?'active':'none'}`" @click="selectTime('today')">今日</div>
      <div :class="`item ${type=='week'?'active':'none'}`" @click="selectTime('week')">本周</div>
      <div :class="`item ${type=='mouth'?'active':'none'}`" @click="selectTime('mouth')">本月</div>
    </div>
    <div class="item2">
      <el-date-picker
        style="width:240px;"
        size="mini"
        v-model="dates"
        type="daterange"
        range-separator="至"
        start-placeholder="开始"
        end-placeholder="结束"
        @change="datechange"
      ></el-date-picker>
    </div>
  </div>
</template>
<script>
import { getToday, getLastWeek, getLastMonth, dateFormate } from "@/utils/date";
export default {
  data() {
    return {
      type: "today",
      dates: []
    };
  },
  methods: {
    datechange(value) {
      if (value) {
        this.type = "";
        this.$emit("sure", {
          start: dateFormate(value[0]),
          end: dateFormate(value[1]),
          siez:10
        });
      } else {
        this.selectTime("today");
      }
    },
    selectTime(val) {
      this.type = val;
      this.dates = [];
      if (this.type == "today") {
        this.$emit("sure", getToday());
      }
      if (this.type == "week") {
        this.$emit("sure", getLastWeek());
      }
      if (this.type == "mouth") {
        this.$emit("sure", getLastMonth());
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.header {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  .item1 {
    display: flex;
    align-items: center;
    .item {
      font-size: 12px;
      text-align: center;
      margin-top: 10px;
      margin-left: 5px;
      margin-right: 15px;
      padding-bottom: 5px;
      cursor: pointer;
      &.active {
        border-bottom: 2px solid $menuActiveText;
      }
    }
  }
}
</style>
