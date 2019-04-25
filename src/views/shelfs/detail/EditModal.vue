
<template>
  <div>
    <el-form
      v-loading="formLodaing"
      :inline="true"
      :model="dataForm"
      class="demo-form-inline"
      ref="form"
    >
      <div class="topContainer" style="display:flex;">
        <!-- left -->
        <div class="productLists">
          <el-form-item
            label="产品"
            prop="shelfs"
            :rules="[ 
          {validator: validateLengthPass}
          ]"
          >
            <!-- product table  -->
            <div class="leftContainer">
              <el-input
                class="input-with-select"
                :style="{width:width+'px'}"
                placeholder="搜索"
                size="mini"
                @keydown.enter.native="left_search"
              ></el-input>
              <div @scroll="scrollEvent" class="leftListContainer">
                <ul class="ulContainer">
                  <li
                    v-for="item in dataForm.selectArray"
                    :key="item.id"
                    @click="selectProduct(item)"
                  >
                    <img :src="item.image" alt class="productimage">
                    <div class="right1">
                      <div style="margin-bottom:5px;">{{item.name}}</div>
                      <div>￥{{item.price}}</div>
                    </div>
                  </li>
                </ul>
                <div
                  v-if="dataForm.selectArray&&dataForm.selectArray.length<9"
                  @click="clickLoalMore"
                  style="padding:5px;font-size:12px;cursor: pointer;"
                >加载更多</div>
              </div>
            </div>
          </el-form-item>
        </div>
        <!-- right -->
        <div class="rightContainer">
          <h3>选择的货道</h3>
          <div class="profile">
            <ul class="ulContainer">
              <li
                v-for="item11 in dataForm.shelfs"
                :key="item11.number"
                style="margin-bottom:10px;"
              >
                <!-- 货道产品信息 -->
                <img :src="item11.image" alt class="productimage">
                <div class="right1">
                  <!-- 货到信息 -->
                  <el-tag>
                    <strong>货道号：</strong>
                    {{item11.number}}
                  </el-tag>
                  <div style="margin:5px 0;">{{item11.name}}</div>
                  <div>￥{{item11.price}}</div>
                </div>
                <!-- <div class="right2" style="margin-left:20px" @click="deleteselectProduct(item11)">
                  <svg-icon icon-class="close" style="    font-size: 20px;"></svg-icon>
                </div>-->
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="price">
        <el-form-item label="价格" prop="price" :rules="[  { required: true, message: '不能为空'}, ]">
          <el-input-number v-model="dataForm.price" @change="changePrice" :min=".1" label="价格"></el-input-number>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { GET_LIST } from "@/api/commodityManagement";
import { mergeArray } from "@/utils/lodash";
import {
  getShelfs,
  getShelfDetail,
  postShelfApply,
  postShelf,
  deleteShelf,
  putShelf,
  getShelfCount
} from "@/api/shelfs";
export default {
  props: {
    dataFormCopy: {
      type: Array
    },
    cacheShelfs: {
      type: Array
    }
  },
  data() {
    return {
      width: 220,
      formLodaing: false,
      leftIsMore: true,
      dataForm: {
        shelfs: { number: "" }
      }
    };
  },
  mounted() {
    this.$data.dataForm.shelfs = JSON.parse(JSON.stringify(this.cacheShelfs));
    this.$data.dataForm.params = { from: 0, size: 10, selectQuery: "" };
    this.$data.dataForm.price = this.$data.dataForm.shelfs[0].price;
    this.loadMore(); //获取左边的产品列表
  },
  methods: {
    deleteselectProduct(item) {
      this.$data.dataForm.shelfs = this.$data.dataForm.shelfs.filter(
        _item => _item.id != item.id
      );
      if (this.$data.dataForm.shelfs.length == 0) {
        this.$data.dataForm.price = 0;
      } else {
        this.$data.dataForm.price = this.$data.dataForm.shelfs[0].price;
      }
    },
    selectProduct(item) {
      //如果是dan选
      this.$data.dataForm.shelfs = this.$data.dataForm.shelfs.map(_item => {
        _item.price = item.price;
        _item.productId = item.productId;
        _item.image = item.image;
        _item.name = item.name;
        return _item;
      });
      this.$data.dataForm.price = item.price;
    },
    changePrice(value) {
      this.$data.dataForm.shelfs = this.$data.dataForm.shelfs.map(_item => {
        _item.price = value;
        return _item;
      });
    },
    left_search(e) {
      var value = e.target.value.trim();
      this.$data.dataForm.params.selectQuery = value;
      this.$data.dataForm.params.from = 0;
      this.$data.dataForm.selectArray = [];
      this.getDataList();
    },
    async getDataList() {
      this.$data.formLodaing = true;
      var result = await GET_LIST({
        query: this.$data.dataForm.params.selectQuery,
        from: this.$data.dataForm.params.from,
        size: this.$data.dataForm.params.size
      }).then(res => {
        return res.map(item => {
          item.productId = item.id;
          return item;
        });
      });
      this.$data.dataForm.selectArray = mergeArray(
        this.$data.dataForm.selectArray || [],
        result
      );
      this.$data.formLodaing = false;
      return result;
    },
    scrollEvent(e) {
      if (
        e.srcElement.scrollTop + e.srcElement.offsetHeight >=
        e.srcElement.scrollHeight
      ) {
        //出发底部
        console.log("出发底部");
        this.loadMore();
      }
    },
    clickLoalMore() {
      if (this.$data.leftIsMore) {
        this.$data.dataForm.params.from = this.$data.dataForm.params.from + 1;
        this.loadMore();
      }
    },
    loadMore() {
      var self = this;
      this.getDataList().then(selectArray => {
        var size = self.$data.dataForm.params.size;
        var from = self.$data.dataForm.params.from;
        var leftIsMore = true;
        if (selectArray.length < size) {
          from = from;
          leftIsMore = false;
        } else {
          from = size + from;
          leftIsMore = true;
        }
        self.$data.dataForm.params.from = from;
        self.leftIsMore = leftIsMore;
      });
    },
    validateLengthPass(rule, value, callback) {
      if (value.length <= 0) {
        callback(new Error("最少选择一个产品"));
      } else {
        callback();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.leftContainer,
.rightContainer {
  padding: 10px;
  border: 1px solid #ddd;
  .leftListContainer {
    margin-top: 10px;
    height: 290px;
    overflow: auto;
    .ulContainer {
      list-style: none;
      padding: 0;
      margin: 0;
      margin-top: 5px;
      & li {
        cursor: pointer;
        padding: 0;
        margin: 0;
        align-items: center;
        display: flex;
        .productimage {
          width: 60px;
          height: 60px;
        }
        .right1 {
          padding-left: 10px;
        }
      }
    }
  }
}
.rightContainer {
  height: 359px;
  width: 242px;
  overflow-y: auto;
  .ulContainer {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 5px;
    & li {
      cursor: pointer;
      padding: 0;
      margin: 0;
      align-items: center;
      display: flex;
      .productimage {
        width: 60px;
        height: 60px;
      }
      .right1 {
        padding-left: 10px;
      }
    }
  }
}
</style>


