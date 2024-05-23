<template>
  <div
    class="page"
    v-loading="loading"
  >
    <header class="fixed-header">
      <h3 style="margin-bottom:30px;">新增方案</h3>
      <div
        class="row1"
        style="display:flex"
      >
        <!-- 设备类型 row -->
        <div class="select-row list">
          <div class="label">设备类型</div>
          <div class="value value-1">
            <el-select
              v-model="deviceTypeId"
              :clearable="true"
              placeholder="设备类型"
              :disabled="isSelectStatus"
            >
              <el-option
                v-for="item in deviceTypes"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
            <el-button
              type="primary"
              class="btn"
              @click="sure2type"
              v-if="!isSelectStatus"
            >确定类型</el-button>
          </div>
          <!-- form  -->
          <div
            style="display:flex;margin-left:10px"
            v-if="isSelectStatus"
          >
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
            >
              <el-form-item label="名称">
                <el-input
                  v-model="formInline.name"
                  placeholder="方案名称"
                ></el-input>
              </el-form-item>
              <el-form-item style="padding-left:30px">
                <el-button
                  type="primary"
                  @click="onSubmit"
                >提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 修改的btns -->
      <div
        class="btns"
        v-if="isSelectStatus"
      >
        <el-checkbox
          @change="check_all"
          label="全选"
          border
          class="check-btn"
        ></el-checkbox>
        <el-button @click="pilian">批量编辑</el-button>

        <!-- 小 -->
        <div
          class="list"
          v-if="isSmallType"
          style="position:relative;top:7px;left:10px;"
        >
          <div class="label">货道数目</div>
          <div class="value">
            <el-input-number
              size="small"
              @change="change_huodao"
              :min="0"
              :value="$data.detail.shelfs.length"
            ></el-input-number>
          </div>
        </div>
        <!-- 大-->
        <div
          class="list"
          v-if="!isSmallType"
        >
          <div class="value">
            <el-input-number
              size="small"
              style="margin-left:10px"
              @change="change_cheng"
              :min="0"
              :max="SHELF_MAX_ROW"
              :value="$data.detail.shelfs.length"
            ></el-input-number>
            <small style="position:relative;top:8px;left:10px;">层</small>
          </div>
        </div>
      </div>
    </header>

    <!-- 小售货机 -->
    <div
      class="row-container small"
      v-if="detail.shelfs.length>0&&isSelectStatus&&isSmallType"
    >
      <ListItem
        class="item"
        @deleteItem="deleteItem"
        v-for="item in detail.shelfs"
        :key="item.id"
        :visible.sync="editModalState"
        :isSmallType="isSmallType"
        :item="item"
        @selectItem="selectItems"
        :editItem.sync="editItem"
      />
    </div>

    <!-- 大售货机 -->
    <div
      class="row-container big"
      v-if="detail.shelfs.length!=0&&isSelectStatus&&!isSmallType"
    >
      <div
        class="row"
        v-for="(row,index) in  $data.detail.shelfs"
        :key="index"
      >
        <header class="header1">
          <h3>第{{index+1}}层</h3>
          <el-input-number
            style="margin:0 10px"
            v-if="row.items"
            :min="0"
              :max="SHELF_MAX_COLOUM"
            @change="changeCengNumber($event,index)"
            size="small"
            :value="row.items.length"
          ></el-input-number>
          <small>格</small>
        </header>
        <div
          class="row-content-container"
          v-if="row.items"
        >
          <ListItem
            @deleteItem="deleteItem"
            :isSmallType="isSmallType"
            :editItem="editItem"
            v-for="(item) in  row.items"
            :key="item.number"
            :item="item"
            @goEdit="go2updateSelectItems"
            @selectItem="selectItems"
          />
        </div>
      </div>
    </div>

    <!-- null row -->
    <div
      class="row"
      v-if="detail.shelfs.length==0&&isSelectStatus"
      style="padding:20px;"
    >目前没有货道信息</div>

    <ItemEditModal
      @finish="finishUpadteEditItems"
      :visible.sync="editModalState"
      v-if="editModalState"
      :editItem="editItem"
    ></ItemEditModal>
  </div>
</template>
<script>
import ListItem from "../list/rightShowItem";
import ItemEditModal from "../list/itemFormModal";
import { mergeArray } from "../../../utils/lodash";
import myalert from "../../../utils/alert";
import { postShelfApply, postShelf, postShelfvm } from "../../../api/shelfs";
import { setTimeout } from "timers";
import { mapActions, mapState } from "vuex";
import {
    DEVICE_TYPE_SMALL,
    DEVICE_TYPE_BIG,
    SHELF_MAX_ROW,
    SHELF_MAX_COLOUM
} from '../../../config';
import t from "vue-video-player";
export default {
  components: {
    ListItem,
    ItemEditModal
  },
  data() {
    return {
      loading: false,
      editItem: [],
      deviceTypeId: "",
      formInline: { name: "", shelfCount: "" },
      editModalState: false,
      detail: {
        shelfs: []
      },
      isSelectStatus: false,
      SHELF_MAX_ROW,
      SHELF_MAX_COLOUM
    };
  },
  computed: {
    ...mapState({
      deviceTypes: state => state.common.deviceTypes
    }),
    isSmallType() {
      return this.deviceTypeId == "quxia";
    }
  },
  mounted() {
    this.getDeviceTypes();
  },
  methods: {
    ...mapActions(["delVisitedView", "getDeviceTypes"]),
    //删除 货道
    deleteItem(item) {
      this.editItem = this.editItem.filter(
        item1 => item.number != item1.number
      );
      if (this.isSmallType) {
        var _index = this.detail.shelfs.findIndex(__item => __item.number == item.number)
        this.detail.shelfs.splice(_index, 1);
      } else {
        this.detail.shelfs[item.uuid.split(":")[0]].items.splice(
          item.uuid.split(":")[1],
          1
        );
        //如果这个 东西没了 delete this row
        if (this.detail.shelfs[item.uuid.split(":")[0]].items.length == 0) {
          this.detail.shelfs.splice(item.uuid.split(":")[0], 1);
        }
        this.sortFornumber();
      }
    },
    check_all(checked) {
      //1.目前在编辑的
      var editItem = [];
      if (this.isSmallType) {
        this.$data.detail.shelfs.map(item => {
          item.isEdit = checked;
          if (checked) {
            editItem.push(item);
          }
        });
      } else {
        this.$data.detail.shelfs.map((row, x) => {
          row.items.map((item, y) => {
            item.isEdit = checked;
            if (checked) {
              editItem.push(item);
            }
            return item;
          });
        });
      }

      this.editItem = editItem;
    },
    // 选择 货道
    selectItems(items) {
      this.editItem = items;
    },
    //开始修改选择的货道
    go2updateSelectItems(item) {
      //如果存在 item  对象 修改edititem
      if (item.uuid) {
        this.editItem[0] = item;
      }
      //判断 items是不是array
      this.editModalState = true;
    },
    //给item 排序
    sortFornumber() {
      // 大售货机
      if (!this.isSmallType) {
        var number = 1;
        this.$data.detail.shelfs.map((row, x) => {
          row.items.map((item, y) => {
            item.number = number;
            item.id = number;
            item.uuid = `${x}:${y}`;
            number++;
            return item;
          });
        });
      } else {
        // 小售货机
        this.$data.detail.shelfs = this.$data.detail.shelfs.sort((a, b) => {
          return a.number - b.number;
        });
      }
    },
    //修改层的 货道数量
    changeCengNumber(value, cengnumber) {
      //reset  this.editItem = [];
      this.editItem = [];
      // 如果是多
      var nowArraylength = this.$data.detail.shelfs[cengnumber].items.length;

      if (value > nowArraylength) {
        let diff = value - nowArraylength;
        var newArray = [...Array(diff)].map((item, _index) => {
          item = {
            number: nowArraylength + _index + 1, //unid
            id: nowArraylength + _index + 1, //unid
            uuid: `${cengnumber}:${nowArraylength + _index + 1}`
          };
          return item;
        });
        this.$data.detail.shelfs[cengnumber].items = [
          ...this.$data.detail.shelfs[cengnumber].items,
          ...newArray
        ];
        //如果这个层的货道的 最后一个number 大于 下一层的第一个货道的number
        this.sortFornumber();
      } else {
        //如果是少
        this.$data.detail.shelfs[cengnumber].items = this.$data.detail.shelfs[
          cengnumber
        ].items.splice(0, value);
        this.sortFornumber();
      }
    },
    //change_huodao 小售货机的 修改货道数量
    change_huodao(number) {
      //add
      if (number > this.detail.shelfs.length) {
        var newArray = [...Array(number - this.detail.shelfs.length)].map(
          (item, _index) => {
            return {
              id: this.detail.shelfs.length + _index + 1,
              number: this.detail.shelfs.length + _index + 1
            };
          }
        );
        this.detail.shelfs = [...this.detail.shelfs, ...newArray];
        this.sortFornumber();
      } else {
        this.detail.shelfs = this.detail.shelfs.splice(0, number);
      }
    },
    //修改层
    change_cheng(ceng) {
      //add
      if (ceng > this.detail.shelfs.length) {
        var newArray = [...Array(ceng - this.detail.shelfs.length)].map(
          item => {
            return {              items: [{
                id: this.detail.shelfs.length + 1,
                number: this.detail.shelfs.length + 1,
                uuid: `${ceng}:${this.detail.shelfs.length + 1}`
              }]            };
          }
        );
        this.detail.shelfs = [...this.detail.shelfs, ...newArray];
        this.sortFornumber();
      } else {
        //delete
        this.detail.shelfs = this.detail.shelfs.splice(0, ceng);
      }
    },
    sure2type() {
      var self = this;
      if (!this.deviceTypeId) {
        myalert.fail("请选择 类型");
        return false;
      }
      myalert.confirm("选择类型之后就无法修改，确定吗?").then(res => {
        self.isSelectStatus = true;
      });
    },
    pilian() {
      if (this.$data.editItem.length <= 0) {
        myalert.fail("请选择先");
        return false;
      }
      this.$data.editModalState = true;
    },
    handleChange(value) {
      if (this.detail.shelfs.length < value) {
        var num = value - this.detail.shelfs.length;
        for (let i = 0; i < num; i++) {
          var item = {
            number: this.detail.shelfs.length + 1,
            price: "",
            productId: "",
            image: "",
            maxStock: 1,
            safeStock: 1,
            isEdit: false
          };
          this.detail.shelfs.push(item);
        }
      } else {
        this.detail.shelfs = this.detail.shelfs.slice(0, value);
      }
    },
    submit_small() {
      var self = this;
      self.loading = true;
      postShelf({
        ...this.formInline,
        deviceTypeId: this.isSmallType ? DEVICE_TYPE_SMALL : DEVICE_TYPE_BIG,
        shelfCount: this.detail.shelfs.length,
        shelfs: this.detail.shelfs
      })
        .then(res => {
          self.loading = false;
          myalert.success("提交成功");
          //关闭当前界面
          setTimeout(() => {
            self.delVisitedView(self.$route).then(res => {
              self.$router.go(-1);
            });
          }, 500);
        })
        .catch(e => {
          self.loading = false;
          console.error(e);
        });
    },
    submit_big() {
      var self = this;
      self.loading = true;
      postShelfvm({
        ...this.formInline,
        deviceTypeId: this.isSmallType ? DEVICE_TYPE_SMALL : DEVICE_TYPE_BIG,
        shelfCount: this.detail.shelfs.length,
        rows: this.detail.shelfs
      })
        .then(res => {
          self.loading = false;
          myalert.success("提交成功");
          //关闭当前界面
          setTimeout(() => {
            self.delVisitedView(self.$route).then(res => {
              self.$router.go(-1);
            });
          }, 500);
        })
        .catch(e => {
          self.loading = false;
          console.error(e);
        });
    },
    onSubmit() {
      //能不能 提交
      var self = this;
      if (!this.formInline.name.trim()) {
        myalert.fail("名字不能空");
        return false;
      }
      if (!this.detail.shelfs.length > 0) {
        myalert.fail("货道号不能小于0");
        return false;
      }
      var isPost = true;
      if (this.isSmallType) {
        this.detail.shelfs.map(item => {
          if (!item.productId) {
            isPost = false;
          }
        });
      } else {
        this.detail.shelfs.map(row => {
          row.items.map(item => {
            if (!item.productId) {
              isPost = false;
            }
          });
        });
      }

      if (!isPost) {
        myalert.fail("有货道信息不全");
        return false;
      }

      // 区分提交
      this.isSmallType ? this.submit_small() : this.submit_big();
    },

    //修改选择的货道
    finishUpadteEditItems(upodateitem) {
      // update it
      var self = this;
      //small/big type update different
      if (this.isSmallType) {
        // 判断如果 number 以及没占用 return false
        if (this.editItem.length == 1 && upodateitem.number != this.editItem[0].number) {
          var index = self.detail.shelfs.findIndex(item => item.number == upodateitem.number)
          if (index >= 0) {
            myalert.fail('货道号以及被占用')
            return false
          }
        }
        //只有一个数据 //多个数据 需要修改 不懂 number
        this.editItem.map(item => {
          var _index = self.detail.shelfs.findIndex(__item => __item.number == item.number)
          if (_index >= 0) {
            if (this.editItem.length == 1) {
              self.detail.shelfs[_index] = {
                ...upodateitem
              };
            } else {
              self.detail.shelfs[_index] = {
                ...upodateitem,
                number: self.detail.shelfs[_index].number
              };
            }

          }
        });
        //排序
        this.sortFornumber()
      } else {
        this.editItem.map(item => {
          var x = item.uuid.split(":")[0];
          var y = item.uuid.split(":")[1];
          self.detail.shelfs[x].items[y] = {
            ...upodateitem,
            uuid: self.detail.shelfs[x].items[y].uuid,
            id: self.detail.shelfs[x].items[y].id,
            number: self.detail.shelfs[x].items[y].number
          };
        });
      }

      //修改完成之后 取消 选择
      if (!this.isSmallType) {
        this.editItem.map(item => {
          self.detail.shelfs[item.uuid.split(":")[0]].items[
            item.uuid.split(":")[1]
          ].isEdit = false;
        });
        this.editItem = [];
      } else {
        this.editItem.map(item => {
          if (self.detail.shelfs[item.number - 1]) {
            self.detail.shelfs[item.number - 1].isEdit = false;
          }
        });
        this.editItem = [];
      }

      this.editModalState = false
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/list.scss";

header {
  padding: 10px 20px;
  background: #fff;
  h3 {
  }
  .demo-form-inline {
    flex: 1;
  }
}
// .row {
//   background: #fff;
//   margin-top: 20px;
//   padding: 20px;
//   display: flex;
//   flex-wrap: wrap;
//   .item {
//     margin-right: 20px;
//   }
// }

.list {
  .value-1 {
    .btn {
      margin-left: 10px;
    }
  }
}
// 选择 类别行
.select-row {
  margin-bottom: 10px;
}
// 修改的btns
.btns {
  display: flex;
  align-items: flex-end;
  .check-btn {
    margin-right: 10px;
  }
}

.row-container.big {
  .header1 {
    display: flex;
    align-items: flex-end;
  }
  .row {
    width: 100%;
    .row-content-container {
      width: 100%;
      display: flex;
      background: #fff;
      flex-wrap: wrap;
      padding: 0 20px;
      .listItem {
        width: calc(33.33% - 20px);
        margin-right: 20px;
      }
    }
  }
}

.row-container.small {
  width: 100%;
  display: flex;
  background: #fff;
  flex-wrap: wrap;
  padding: 0 20px;
  .listItem {
    width: calc(33.33% - 20px);
    margin-right: 20px;
  }
}

.fixed-header {
  // position: fixed;
  // top: 0px;
  // width: 100%;
  // left:60px;
}
</style>

