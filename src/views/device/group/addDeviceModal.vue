<template>
  <div class="addDeviceModal">
    <!-- left -->
    <div class="leftContainer" style="min-width:280px;">
      <el-input
        style="min-width:200px;"
        placeholder="搜索"
        size="mini"
        v-model="leftSearchValue"
        class="input-with-select"
        @keydown.enter.native="left_search"
      ></el-input>
      <div @scroll="scrollEvent" class="leftListContainer">
        <ul class="ulContainer">
          <li v-for="item in selectArray" :key="item.id">
            <el-checkbox v-model="item.checked" @change="leftSelect" :disabled="item.disabled">
              <span>{{item.id}}</span>
              <span style="padding-left:5px;">{{item.name}}</span>
            </el-checkbox>
          </li>
        </ul>
      </div>
    </div>

    <div class="centerBtn">
      <svg-icon
        icon-class="right"
        class="icon left"
        @click="toRight"
        :style="{background:clickType=='clickleft'?'#409EFF':'#bfcbd9',
        cursor:clickType=='clickleft'?'pointer':'not-allowed'        }"
      />
      <svg-icon
        icon-class="left"
        class="icon right"
        @click="toLeft"
        :style="{background:clickType=='clickright'?'#409EFF':'#bfcbd9',
        cursor:clickType=='clickright'?'pointer':'not-allowed',marginTop:'10px'        }"
      />
    </div>

    <!-- right -->
    <div class="rightContainer">
      <ul class="ulContainer" style="min-width:250px;height:300px;overflow:auto;">
        <li v-for="item in value" :key="item.id">
          <el-checkbox v-model="item.checked" @change="rightSelect">
            <span>{{item.id}}</span>
            <span style="padding-left:5px;">{{item.name}}</span>
          </el-checkbox>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import mymap from "lodash.map";
import sortBy from "lodash.sortby";
import { clone } from "../../../filters";
import { mergeArray } from "@/utils/lodash";
import { GET_DEVICE_LISTS } from "@/api/devices";
export default {
  props: {
    dataForm: {
      type: Object
    },
    width: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      clickType: "",
      leftSearchValue: "",
      rightSearchValue: "",
      cacheSelectArray: [],
      rightCacheSelectArray: [],
      leftIsMore: false,
      leftAllChecked: false
      // params: {
      //   groupId: "",
      //   query: "",
      //   from: 0,
      //   size: 10
      // }
    };
  },
  mounted() {},
  updated() {},
  computed: {
    selectArray: {
      get() {
        return this.dataForm.selectArray;
      },
      set(_value) {
        return _value;
      }
    },
    value: {
      get() {
        return this.dataForm.value;
      },
      set(_value) {
        return _value;
      }
    },
    params() {
      return this.dataForm.params;
    }
  },
  methods: {
    leftSelectALL(e) {
      if (e) {
        this.dataForm.selectArray = this.dataForm.selectArray.map(item => {
          item.checked = true;
          return item;
        });
      } else {
        this.dataForm.selectArray = this.dataForm.selectArray.map(item => {
          item.checked = false;
          return item;
        });
      }
    },
    scrollEvent(e) {
      if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
        //出发底部
        this.loadMore();
      }
    },
    clickLoalMore() {
      if (this.$data.leftIsMore) {
        this.dataForm.params.from = this.dataForm.params.from + 1;
        this.loadMore();
      }
    },
    loadMore() {
      var self = this;
      this.getDeiveList().then(selectArray => {
        var size = self.dataForm.params.size;
        var from = self.dataForm.params.from;
        var leftIsMore = true;
        if (selectArray.length < size) {
          from = from;
          leftIsMore = false;
        } else {
          from = size + from;
          leftIsMore = true;
        }
        self.dataForm.params.from = from;
        self.$data.leftIsMore = leftIsMore;
      });
    },
    currentchange(page) {
      this.dataForm.params.from = (page - 1) * this.dataForm.params.size;
      this.getDeiveList();
    },
    getDeiveList() {
      var self = this;
      var params = clone(this.dataForm.params);
      delete params.groupId;
      return GET_DEVICE_LISTS(params).then(selectArray => {
        self.dataForm.selectArray = mergeArray(
          self.dataForm.selectArray,
          selectArray
        );
        //如果已经选择 就 disabled
        self.dataForm.selectArray.map((item, index) => {
          self.dataForm.value.map(item2 => {
            if (item2.id == item.id) {
              // self.dataForm.selectArray.splice(index, 1);
              item.checked = false;
              item.disabled = true;
            }
          });
          return item;
        });
        return selectArray;
      });
    },
    left_search(e) {
      var value = e.target.value.trim();
      this.dataForm.params.query = value;
      this.dataForm.params.from = 0;
      this.dataForm.selectArray = [];
      this.getDeiveList();
    },
    left_table_click(row) {
      this.$refs["multipleTable1"].toggleRowSelection(row);
    },
    right_table_click(row) {
      this.$refs["multipleTable2"].toggleRowSelection(row);
    },
    filterMethod(query, item) {
      return item.label.indexOf(query) > -1;
    },
    clearQuery(q) {
      console.log(q);
    },
    leftSelect() {
      this.clickType = "clickleft";
    },
    rightSelect() {
      this.clickType = "clickright";
    },
    toRight() {
      if (this.clickType != "clickleft") {
        return false;
      }
      //left 删除掉
      //right 增加
      var self = this;
      this.$data.cacheSelectArray = this.dataForm.selectArray.filter(
        item => item.checked
      );
      // this.$data.cacheSelectArray.map((item, index) => {
      //   self.dataForm.selectArray.map((item1, index1) => {
      //     if (item1.id == item.id) {
      //       self.dataForm.selectArray.splice(index1, 1);
      //     }
      //   });
      // });
      this.dataForm.value = mergeArray(
        this.dataForm.value,
        JSON.parse(JSON.stringify(this.$data.cacheSelectArray))
      );
      //禁止
      this.dataForm.selectArray = this.dataForm.selectArray.map(item => {
        this.dataForm.value.map(item2 => {
          if (item.id == item2.id) {
            item.disabled = true;
            item.checked = false;
          }
        });
        return item;
      });
      this.dataForm.value = this.dataForm.value.map(item => {
        item.checked = false;
        return item;
      });
      this.$data.cacheSelectArray = [];
      this.$data.leftAllChecked = false;
      this.$data.rightAllChecked = false;
      this.clickType = "";
    },
    toLeft() {
      if (this.clickType != "clickright") {
        return false;
      }
      var self = this;
      //add left
      this.$data.rightCacheSelectArray = this.dataForm.value.filter(
        item => item.checked
      );
      this.dataForm.selectArray = mergeArray(
        this.dataForm.selectArray,
        JSON.parse(JSON.stringify(this.$data.rightCacheSelectArray))
      );
      //delete right
      this.$data.rightCacheSelectArray.map((item, index) => {
        self.dataForm.value.map((item1, index1) => {
          if (item1.id == item.id) {
            self.dataForm.value.splice(index1, 1);
          }
        });
      });

      this.$data.rightCacheSelectArray = [];
      this.$data.leftAllChecked = false;
      this.$data.rightAllChecked = false;
      //禁止
      this.dataForm.selectArray = this.dataForm.selectArray.map(item => {
        item.disabled = false;
        this.dataForm.value.map(item2 => {
          if (item.id == item2.id) {
            item.disabled = true;
            item.checked = false;
          }
        });
        return item;
      });
      this.clickType = "";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";

.transfer-footer {
  overflow-x: auto;
}

.ulContainer {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 5px;
  & li {
    padding: 0;
    margin: 0;
    padding: 5px 10px;
  }
}
.pagination {
  margin-top: 10px;
}

.addDeviceModal {
  display: flex;
  justify-content: center;
}

.leftContainer,
.rightContainer {
  padding: 10px;
  border: 1px solid #ddd;
  .leftListContainer {
    margin-top: 10px;
    height: 290px;
    overflow: auto;
  }
}

.centerBtn {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 1px solid #ddd;
    padding: 10px;
    background: $menuText;
    color: $subMenuActiveText;
  }
}
</style>
