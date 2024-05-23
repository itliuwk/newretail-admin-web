<template>
  <div class="row3">
    <div class="item">
      <header>
        <h3>场地销量榜</h3>
        <DateHeader @sure="(date)=>{$data.localtionparams=date;getlocationdata()}"/>
      </header>

      <el-table :data="localtiondata" style="width: 100%">
        <el-table-column prop="date" label="排名" width="60">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="name" label="场地名称"></el-table-column>
        <el-table-column prop="sale" label="销售金额(元)"></el-table-column>
        <el-table-column prop="units" label="销售数量(台)"></el-table-column>
      </el-table>
    </div>
    <div class="item">
      <header>
        <h3>设备销量榜</h3>
        <DateHeader @sure="(date)=>{$data.devicesdataparams=date;getdevicesdata()}"/>
      </header>
      <el-table :data="devicesdata" style="width: 100%">
        <el-table-column prop="date" label="日期">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sale" label="销售金额(元)"></el-table-column>
        <el-table-column prop="units" label="销售数量(台)"></el-table-column>
      </el-table>
    </div>

    <div class="item">
      <header>
        <h3>热销商品榜</h3>
        <DateHeader @sure="(date)=>{$data.productsparams=date;getproductsdata()}"/>
      </header>
      <el-table :data="productsdata" style="width: 100%">
        <el-table-column prop="date" label="日期">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sale" label="销售金额(元)"></el-table-column>
        <el-table-column prop="units" label="销售数量(台)"></el-table-column>
      </el-table>
    </div>
    <div class="item">
      <header>
        <h3>商品分类榜</h3>
        <DateHeader @sure="(date)=>{$data.categoritesparams=date;getanalyticscategories()}"/>
      </header>
      <el-table :data="categoritesdata" style="width: 100%">
        <el-table-column prop="date" label="排名">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="sale" label="销售金额(元)"></el-table-column>
        <el-table-column prop="units" label="销售数量(台)"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import DateHeader from "../dateHeader";
import {
  get_analytics_locations,
  get_analytics_producsts,
  get_analytics_categories,
  get_analytics_devices
} from "../../../api/dashboard";
import { getToday } from "../../../utils/date";
export default {
  components: {
    DateHeader
  },
  data() {
    return {
      localtiondata: [],
      localtionparams: { ...getToday() },

      categoritesdata: [],
      categoritesparams: { ...getToday() },

      productsdata: [],
      productsparams: { ...getToday() },

      devicesdata: [],
      devicesdataparams: { ...getToday() }
    };
  },
  mounted() {
    this.getlocationdata();
    this.getanalyticscategories();
    this.getproductsdata();
    this.getdevicesdata();
  },
  methods: {
    async getlocationdata() {
      this.localtiondata = await get_analytics_locations(this.localtionparams);
    },
    async getanalyticscategories() {
      this.categoritesdata = await get_analytics_categories(
        this.categoritesparams
      );
    },
    async getproductsdata() {
      this.productsdata = await get_analytics_producsts(this.productsparams);
    },
    async getdevicesdata() {
      this.devicesdata = await get_analytics_devices(this.devicesdataparams);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.row3 {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: calc(50% - 20px);
    margin-bottom: 20px;
    margin-right: 20px;
    background: #fff;
    &:nth-child(2n) {
      margin-right: 0px;
    }
    header {
      padding: 10px;
      display: flex;
      h3 {
        margin-top: 10px;
      }

      .views {
        flex: 1;
        justify-content: flex-end;
        align-self: center;
        align-items: center;
        display: flex;
        .tabs {
          display: flex;
          .item1 {
            cursor: pointer;
            font-size: 12px;
            margin-right: 10px;
            margin-top: 10px;
            padding-bottom: 5px;
            &.active {
              border-bottom: 2px solid $menuActiveText;
            }
          }
        }
      }
    }

    @media screen and (max-width: 1000px) {
      width: calc(100%);
      margin-right: 0px;
      &:nth-child(2n + 1) {
        margin-right: 0px;
        flex: 1;
      }
    }
  }
}
</style>
