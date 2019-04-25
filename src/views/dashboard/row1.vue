<template>
  <div v-loading="loading">
    <div class="row1">
      <Card title="总销售额" :strongText="analytics_summary.sale" unit="元" icon="zongxiaoshoue"></Card>
      <Card title="收入" :strongText="analytics_summary.income" unit="元" icon="shouru"></Card>
      <Card title="利润" :strongText="analytics_summary.profit" unit="元" icon="yonghushuliang"></Card>
    </div>

    <div class="row1" style="margin-top:20px;">
      <Card title="支付笔数" :strongText="analytics_summary.orders" unit="笔" icon="dingdanshu"></Card>
      <Card title="用户数" :strongText="analytics_summary.customers" unit="人" icon="yonghushuliang"></Card>
      <DeivceCard
        title="设备数"
        :leftText="analytics_summary.devices"
        :rightText="analytics_summary.activeDevices"
        unit="项"
        icon="kucunguanli"
      ></DeivceCard>
    </div>
  </div>
</template>
<script>
import Card from "./card";
import DeivceCard from "./card/deivceCard";
import { get_analytics_summary } from "@/api/dashboard";
export default {
  data() {
    return {
      loading: false,
      analytics_summary: {
        sale: 0,
        income: 0,
        orders: 0,
        users: 0,
        devices: 0,
        activeDevices: 0,
        profit: 0
      }
    };
  },
  components: {
    Card,
    DeivceCard
  },
  async mounted() {
    this.loading = true;
    this.analytics_summary = await get_analytics_summary();
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped>
.row1 {
  display: flex;
  flex-wrap: wrap;
  & .card {
    &:last-child {
      margin-right: 0px;
    }
    @media screen and (max-width: 800px) {
      &:nth-child(2) {
        margin-right: 0px;
      }
    }
  }
}
</style>
