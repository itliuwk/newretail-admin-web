<template>
  <div>
    <Header @sure="sure2search"></Header>
    <div class="row">
      <Card
        title="销售额"
        :strong="sale"
        unit="元"
        :huanbi="Math.abs(sale_huanbi)+'%'"
        :type="sale_huanbi>0?'up':'down'"
      />
      <Card
        title="收入"
        :strong="income"
        unit="元"
        :huanbi="Math.abs(income_huanbi)+'%'"
        :type="income_huanbi>0?'up':'down'"
      />
      <Card
        title="利润"
        :strong="profit"
        unit="元"
        :huanbi="Math.abs(profit_huanbi)+'%'"
        :type="profit_huanbi>0?'up':'down'"
      />
      <Card
        title="支付笔数"
        :strong="orders"
        unit="笔"
        :huanbi="Math.abs(orders_huanbi)+'%'"
        :type="orders_huanbi>0?'up':'down'"
      />
    </div>
  </div>
</template>
<script>
import Card from "./card";
import Header from "./header";
import { getToday } from "../../../utils/date";
import {
  get_analytics_sale,
  get_analytics_income,
  get_analytics_orders,
  get_analytics_profits
} from "@/api/dashboard";
export default {
  data() {
    return {
      sale: 0,
      income: 0,
      orders: 0,
      profit: 0,

      sale1: 0,
      income1: 0,
      orders1: 0,
      profit1: 0,

      sale_huanbi: 0,
      income_huanbi: 0,
      orders_huanbi: 0,
      profit_huanbi: 0
    };
  },
  components: {
    Header,
    Card
  },
  mounted() {
    this.sure2search(getToday());
  },
  methods: {
    async sure2search(date, lasetdate) {
      this.sale = await get_analytics_sale(date);
      this.income = await get_analytics_income(date);
      this.orders = await get_analytics_orders(date);
      this.profit = await get_analytics_profits(date);

      this.sale1 = await get_analytics_sale({
        start: date.laststart,
        end: date.lastend
      });
      // debugger;
      this.income1 = await get_analytics_income({
        start: date.laststart,
        end: date.lastend
      });
      this.orders1 = await get_analytics_orders({
        start: date.laststart,
        end: date.lastend
      });
      this.profit1 = await get_analytics_profits({
        start: date.laststart,
        end: date.lastend
      });

      this.sale_huanbi =
        this.sale1 == 0
          ? 0
          : (((this.sale - this.sale1) / this.sale1) * 100).toFixed(2);
      this.income_huanbi =
        this.income1 == 0
          ? 0
          : (((this.income - this.income1) / this.income1) * 100).toFixed(2);
      this.profit_huanbi =
        this.profit1 == 0
          ? 0
          : (((this.profit - this.profit1) / this.profit1) * 100).toFixed(2);

      this.orders_huanbi =
        this.orders1 == 0
          ? 0
          : (((this.orders - this.orders1) / this.orders1) * 100).toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
}
</style>
