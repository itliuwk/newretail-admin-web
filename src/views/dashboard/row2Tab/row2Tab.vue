<template>
  <div class="row2">
    <!-- 补充的tab 工具 -->
    <div class="fixTabTitles">
      <div
        style="display:flex;"
        class="datetimeWrapper"
      >
        <div class="item active">本日</div>
        <div class="item">本周</div>
        <div class="item">本月</div>
        <div class="item">本年</div>
      </div>
      <div class="wrapperDatePicker">
        <el-date-picker
          style="width:300px;overflow:hidden"
          v-model="datePicker"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
    </div>
    <!-- tabs -->
    <el-tabs
      class="tabsContainer"
      v-model="activeName"
      @tab-click="handleClick"
    >

      <el-tab-pane
        label="用户管理"
        name="first"
      >
        <!-- tab panel container -->
        <div class="tabContainer">
          <div class="left">
            <Chart1
              id="chart1"
              height="100%"
              width="100%"
              ref="chart1"
            />
          </div>
          <div class="right">
            <!-- 排行版 -->
            <div class="h1">
              <strong>销售排行版</strong>
              <el-select
                v-model="date1"
                style="width:65px"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in [
                  {  value: '周',    label: '周'},
                    {  value: '月',    label: '月'},
                      {  value: '日',    label: '日'},
                        {  value: '年',    label: '年'},
                        
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

          </div>
        </div>

      </el-tab-pane>
      <el-tab-pane
        label="配置管理"
        name="second"
      >
        <div class="tabContainer">
          <Chart2
            id="chart2"
            ref="chart2"
            height="100%"
            width="100%"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
const Chart1 = () => import("@/components/Charts/keyboard");
const Chart2 = () => import("@/components/Charts/keyboard");
export default {
  components: { Chart1, Chart2 },
  data() {
    return {
      activeName: "first",
      datePicker: [
        new Date(2000, 10, 10, 10, 10),
        new Date(2000, 10, 11, 10, 10)
      ],
      date1: ""
    };
  },
  methods: {
    handleClick() {
      var self = this;
      //修复 chart的resize
      this.$nextTick(() => {
        self.$refs["chart1"].__resizeHandler();
        self.$refs["chart2"].__resizeHandler();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.row2 {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  margin-top: 20px;
  position: relative;
  background: #fff;
  .fixTabTitles {
    z-index: 9;
    padding-bottom: 10px;
    align-items: center;
    display: flex;
    position: absolute;
    height: 40px;
    right: 20px;
    .datetimeWrapper {
      display: flex;
      .item {
        width: 45px;
        cursor: pointer;
        font-size: 12px;
        &.active {
          color: $menuActiveText;
        }
      }
    }
  }

  .tabContainer {
    height: 400px;
    padding-bottom: 10px;
    display: flex;
    .left {
      width: calc(66.6% - 10px);
      margin-right: 10px;
    }
    .right {
      width: 33.3%;
      .h1 {
        justify-content: space-between;
        align-items: center;
        display: flex;
        padding-bottom: 5px;
        border-bottom: 1px solid #ddd;
      }
    }
  }
}
</style>
