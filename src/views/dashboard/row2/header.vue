
<template>
  <header>
    <h3>运营分析</h3>
    <div class="row1">
      <div class="item1">
        <div :class="`item ${type=='today'?'active':'none'}`" @click="selectTime('today')">今日</div>
        <div :class="`item ${type=='week'?'active':'none'}`" @click="selectTime('week')">本周</div>
        <div :class="`item ${type=='mouth'?'active':'none'}`" @click="selectTime('mouth')">本月</div>
      </div>
      <div class="item2">
        <el-date-picker
          style="width:230px;"
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
  </header>
</template>
<script>
import { getToday, getLastWeek, getLastMonth, dateFormate } from "@/utils/date";
import moment from "moment";
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
          laststart: dateFormate(value[0]),
          lastend: dateFormate(value[1])
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
header {
  background: #fff;
  h3 {
    padding-left: 20px;
  }
}
.row1 {
  display: flex;
  padding: 20px;
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
