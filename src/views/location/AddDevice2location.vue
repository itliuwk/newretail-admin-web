<template>
  <div class="page-container">
    <dform @sure="left_search"/>
    <div class="btns">
      <el-button type="default" @click="$router.go(-1)">返回</el-button>
    </div>
    <div class="addDeviceModal" v-loading="loading">
      <!-- left -->
      <div class="leftContainer">
        <!-- <el-input
          style="width:100%"
          placeholder="搜索"
          size="mini"
          v-model="leftSearchValue"
          class="input-with-select"
          @keydown.enter.native="left_search"
        ></el-input>-->
        <div @scroll="scrollEvent" class="leftListContainer">
          <ul class="ulContainer">
            <!-- <li>
              <el-checkbox @change="leftSelectALL" v-model="leftAllChecked">全选</el-checkbox>
            </li>-->
            <li v-for="item in leftlist" :key="item.id">
              <el-checkbox
                v-model="item.checked"
                :disabled="item.disabled"
                @change="selecleft(item)"
              >
                <span style="padding-right:10px">{{item.id}}</span>
                {{item.name}}
              </el-checkbox>
            </li>
          </ul>
        </div>
      </div>

      <div class="centerBtn">
        <svg-icon icon-class="right" class="icon left" @click="toRight" :style="leftStyle"/>
        <svg-icon icon-class="left" class="icon right" @click="toLeft" :style="rightStyle"/>
      </div>

      <!-- right -->
      <div class="rightContainer">
        <ul class="ulContainer" style="height:300px;overflow:auto;">
          <li v-for="item in rightlist" :key="item.id">
            <el-checkbox v-model="item.checked" @change="selectright(item)">
              <span style="padding-right:10px">{{item.id}}</span>
              {{item.name}}
            </el-checkbox>
          </li>
          <li v-if="rightmorestatus" class="loadmore" @click="rightmore">加载更多</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import mymap from "lodash.map";
import sortBy from "lodash.sortby";
import { mergeArray } from "@/utils/lodash";
import { GET_DEVICE_LISTS, GET_DEVICES_NUM } from "@/api/devices";
import { addDevices2localtion, deleteDevices2localtion } from "@/api/location";

import dform from "./adddevice2localtion/form";
import { pageSize } from "../../config";
import myalert from "../../utils/alert";
import { clone } from "@/filters";
export default {
  components: { dform },

  name: "localtion_addDevice2localtion",
  props: {
    dataForm: {
      type: Object,
      default() {
        return {
          selectArray: [],
          value: [],
          params: {
            groupId: "",
            locationId: "",
            query: "",
            from: 0,
            size: 10
          }
        };
      }
    },
    width: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      loading: false,
      leftSearchValue: "",
      leftparams: {
        query: "",
        from: 0,
        size: pageSize
      },
      rightparams: {
        from: 0,
        size: pageSize,
        locationId: this.$route.query.id
      },
      leftlist: [],
      rightlist: [],
      leftselect: [],
      rightselect: [],
      rightCacheSelectArray: [],
      leftIsMore: false,
      leftAllChecked: false,
      clickwhat: "",
      rightmorestatus: true
    };
  },
  async mounted() {
    await this.getrightdata();
    this.getleftdata();
  },
  updated() {},
  computed: {
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
      return this.clickwhat == "clickleft";
    },
    isClickRight() {
      return this.clickwhat == "clickright";
    }
  },
  methods: {
    async getleftdata() {
      var self = this;
      var newarray = await GET_DEVICE_LISTS(this.leftparams);
      this.leftlist = mergeArray(newarray, this.leftlist);
      //获取得到 rightlist 匹配 disbaled
      this.leftlist.map(item => {
        self.rightlist.map(item1 => {
          if (item.id == item1.id) {
            item.checked = false;
            item.disabled = true;
          }
        });
      });
      return this.leftlist;
    },
    async getrightdata() {
      var newarray = await GET_DEVICE_LISTS(this.rightparams);
      this.rightlist = mergeArray(newarray, this.rightlist);
      if (newarray.length == 0) {
        this.rightmorestatus = false;
      }
      return this.rightlist;
    },
    selectright(item) {
      this.clickwhat = "clickright";
      if (this.rightlist.filter(item => item.checked).length <= 0) {
        this.clickwhat = "";
      }
    },
    selecleft(item) {
      this.clickwhat = "clickleft";
      var _index = this.leftselect.findIndex(_item => _item.id == item.id);
      if (item.checked) {
        if (_index < 0) {
          this.leftselect.push(item);
        }
      } else {
        this.leftselect.splice(_index, 1);
        if (this.leftselect.length <= 0) {
          this.clickwhat = "";
        }
      }
    },
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
        console.log("出发底部");
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
      this.getleftdata().then(selectArray => {
        var size = self.leftparams.size;
        var from = self.leftparams.from;
        var leftIsMore = true;
        if (selectArray.length < size) {
          from = from;
          leftIsMore = false;
        } else {
          from = size + from;
          leftIsMore = true;
        }
        self.leftparams.from = from;
        self.leftIsMore = leftIsMore;
      });
    },
    rightmore() {
      var self = this;
      var size = self.rightparams.size;
      var from = self.rightparams.from + size;
      self.rightparams.from = from;
      this.getrightdata();
    },
    onSUBMIT() {},
    currentchange(page) {
      this.dataForm.params.from = (page - 1) * this.dataForm.params.size;
      this.getDeiveList();
    },
    getDeiveList() {
      var self = this;
      GET_DEVICE_LISTS(this.dataForm.params).then(selectArray => {
        self.dataForm.selectArray = selectArray;
      });
    },
    left_search(formdata) {
      this.leftparams = { ...this.leftparams, ...formdata };
      this.leftparams.from = 0;
      this.leftlist = [];
      this.getleftdata();
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
    async toRight() {
      if (this.clickwhat != "clickleft") {
        return false;
      }
      var self = this;

      var result = await myalert.confirm("确定要投放设备到这个场地？");
      if (!result) return false;
      this.loading = true;
      addDevices2localtion({
        locationId: this.$route.query.id,
        deviceIds: this.leftselect.map(item => item.id)
      })
        .then(res => {
          self.loading = false;
          myalert.success("投放设备成功");
          self.leftselect.map(item => (item.checked = false));
          self.rightlist = mergeArray(clone(self.leftselect), self.rightlist);

          //获取得到 rightlist 匹配 disbaled
          self.leftlist.map(item => {
            self.rightlist.map(item1 => {
              if (item.id == item1.id) {
                item.checked = false;
                item.disabled = true;
              }
            });
          });
          self.clickwhat = "";
        })
        .catch(e => {
          console.error(e);
          self.loading = false;
          myalert.fail("投放设备失败");
        });
    },
    async toLeft() {
      var self = this;
      if (this.clickwhat != "clickright") {
        return false;
      }

      var result = await myalert.confirm("确定要移除设备？");
      if (!result) {
        return false;
      }
      var rightselect = clone(self.rightlist.filter(item => item.checked)).map(
        item => {
          item.checked = false;
          return item;
        }
      );
      for (let i = 0; i < rightselect.length; i++) {
        await deleteDevices2localtion({
          locationId: this.$route.query.id,
          deviceId: rightselect[i].id
        });
      }
      myalert.success("移除成功");
      self.leftlist = mergeArray(clone(rightselect), self.leftlist);
      self.rightlist = self.rightlist.filter(item => !item.checked);
      self.clickwhat = "";
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
  background: #fff;
  padding: 40px 20px;
}

.leftContainer,
.rightContainer {
  flex: 1;
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
    cursor: not-allowed;
    &:last-child {
      margin-top: 10px;
    }
  }
}

.btns {
  margin-top: 20px;
  padding-left: 20px;
  padding-top: 20px;
  background: #fff;
}

.loadmore {
  font-size: 12px;
  cursor: pointer;
}
</style>
