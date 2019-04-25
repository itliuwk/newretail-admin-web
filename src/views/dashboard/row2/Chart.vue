<template>
  <div>
    <div class="header">
      <div style="display:flex;align-items:center">
        <span style="padding-right:10px">类型</span>
        <el-select placeholder="请选择" v-model="selectValue" size="mini" @change="changetypes">
          <el-option label="销售额" value="sale"></el-option>
          <el-option label="收入" value="income"></el-option>
          <el-option label="支付笔数" value="orders"></el-option>
          <el-option label="利润" value="profit"></el-option>
        </el-select>
        <el-date-picker
          style="width:230px;margin-left:20px;"
          size="mini"
          type="daterange"
          v-model="valuedate"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
          @change="datechange"
        ></el-date-picker>
      </div>
    </div>

    <div
      v-loading="loading"
      :id="id"
      :class="className"
      :style="{
      padding:'0 20px',
      height:height,width:width}"
    />
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding-left: 20px;
  margin-top: 20px;
}
</style>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";
import {
  get_analytics_trend_sale,
  get_analytics_trend_income,
  get_analytics_trend_orders,
  get_analytics_trend_profits
} from "@/api/dashboard";
import { dateFormate } from "../../../utils/date";
const moment = require("moment");
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "200px"
    }
  },
  data() {
    return {
      loading: false,
      chart: null,
      params: {
        start: moment()
          .add(-1, "month")
          .format("YYYY-MM-DD"),
        end: moment().format("YYYY-MM-DD")
      },
      selectValue: "sale",
      selectLabel: "销售额",
      unit: "元",
      valuedate: [moment().add(-1, "month"), moment()],
      chartdata: []
    };
  },
  async mounted() {
    this.chartdata = await get_analytics_trend_sale(this.params);
    this.initChart();
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    datechange(date) {
      if (date) {
        this.params = {
          start: dateFormate(date[0]),
          end: dateFormate(date[1])
        };
      } else {
        this.params = {
          start: "",
          end: ""
        };
      }
      this.changetypes(this.selectValue);
    },
    async changetypes(val) {
      if (val == "sale") {
        this.selectLabel = "销售额";
        this.unit = "元";
        this.chartdata = await get_analytics_trend_sale(this.params);
      }
      if (val == "income") {
        this.selectLabel = "收入";
        this.unit = "元";
        this.chartdata = await get_analytics_trend_income(this.params);
      }
      if (val == "orders") {
        this.selectLabel = "支付笔数";
        this.unit = "笔";
        this.chartdata = await get_analytics_trend_orders(this.params);
      }
      if (val == "profit") {
        this.selectLabel = "利润";
        this.unit = "元";
        this.chartdata = await get_analytics_trend_profits(this.params);
      }
      this.initChart();
    },
    initChart() {
      var self = this;
      this.loading = true;
      this.chart = echarts.init(document.getElementById(this.id));

      var xdata = this.chartdata
        .map(item => item.day)
        .map(item => dateFormate(item));
      var ydata = this.chartdata.map(item => item.value);
      this.chart.setOption({
        xAxis: {
          data: xdata,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 50,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10],
          formatter: function(
            params //数据格式
          ) {
            var relVal = params[0].name + "<br/>";
            relVal +=
              params[0].seriesName +
              " : " +
              params[0].value +
              self.unit +
              "<br/>";
            return relVal;
          }
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: `{value}  ${self.unit}`,
            // margin: 
          },
          axisTick: {
            alignWithLabel: true
          }
        },
        series: [
          {
            name: this.selectLabel,
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",
            data: ydata,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          }
        ]
      });

      this.loading = false;
    }
  }
};
</script>
