
<template>
  <div class="pageContainer">
    <!--我是设备名称-->
    <header class="header1 header-big">
      <div
        class="content-wrapper"
        style="flex:2;"
      >
        <!-- <h2>{{deviceTypeName}}</h2> -->
        <h2 style="padding-left:5px;">{{cacheRow.name}}</h2>
        <el-input-number
          v-if="isSmallType"
          size="small"
          @change="change_huodao"
          :min="0"
          :value="$data.detail.shelfs.length"
        ></el-input-number>

        <el-input-number
          v-if="!isSmallType"
          size="small"
          @change="change_cheng"
          :min="0"
          :max="SHELF_MAX_ROW"
          :value="$data.detail.shelfs.length"
        ></el-input-number>
        <small v-if="!isSmallType">层</small>
      </div>
      <div
        class="right-btns"
        style="flex:1;display:flex;align-items:center"
      >
        <el-checkbox
          @change="check_all"
          label="全选"
          border
          class="check-btn"
        ></el-checkbox>
        <el-button
          type="default"
          @click="go2updateSelectItems"
          style="margin-left:10px;"
        >批量修改</el-button>
        <el-button
          type="primary"
          @click="submit1"
          style="margin-left:10px;"
        >提交</el-button>
      </div>
    </header>

    <!-- big 和samll 不一样 -->
    <!-- 层级container -->
    <!-- 层级 row -->
    <div
      class="row-container"
      v-if="!isSmallType&&$data.detail"
      v-loading="loading"
    >
      <div
        class="row"
        v-for="(row,index) in  $data.detail.shelfs"
        :key="index"
      >
        <header class="header1">
          <h3>第{{index+1}}层</h3>
          <el-input-number
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
            :isSmallType="isSmallType"
            :editItem="editItem"
            v-for="(item) in  row.items"
            :key="item.number"
            :item="item"
            @goEdit="go2updateSelectItems"
            @selectItem="selectItems"
            @deleteItem="deleteItem"
          />
        </div>
      </div>
    </div>

    <!-- small -->
    <div
      class="row-container small"
      v-loading="loading"
      v-if="isSmallType&&detail.shelfs"
    >
      <ListItem
        :isSmallType="isSmallType"
        :editItem="editItem"
        v-for="(item) in  detail.shelfs"
        :key="item.number"
        :item="item"
        @goEdit="go2updateSelectItems"
        @selectItem="selectItems"
        @deleteItem="deleteItem"
      />
    </div>

    <!--修改 selectItems  modal -->
    <ItemEditModal
      @finish="finishUpadteEditItems"
      :visible.sync="ItemEditProductModalStatus"
      v-if="ItemEditProductModalStatus"
      :editItem="editItem"
    />
  </div>
</template>
<script>
import * as apishelfs from "@/api/shelfs";
import map from "lodash.map";
import ItemEditModal from "../list/itemFormModal";
import ListItem from "../list/rightShowItem";
import { GET_DEVICE_DETAIL_VM, GET_DEVICE_DETAIL } from "../../../api/devices";
import {
  postShelf,
  putShelf,
  getShelfs,
  getShelfDetail,
  putShelfvm
} from "../../../api/shelfs";
import myalert from "../../../utils/alert";
import ItemEditProductModal from "../list/ItemEditProductModal";
import {
  shelfs_devices_vmDetail,
  post_shelfs_devices_vmDetail,
  get_shelfs_device_lists,
  get_shelfs_device_detail_vm,
  get_shelfs_device_detail,
  put_shelfs_device_detail_vm,
  put_shelfs_device_detail
} from '../../../api/devicesStatus';
import {
  DEVICE_TYPE_SMALL,
  DEVICE_TYPE_BIG,
  SHELF_MAX_ROW,
  SHELF_MAX_COLOUM
} from '../../../config';
export default {
  props: ["cacheRow", "isEdit"],
  data() {
    return {
      loading: false,
      detail: {
        shelfs: []
      },
      editItem: [],
      editModalState: false,
      visiblerpoduct: false,
      ItemEditProductModalStatus: false,
      SHELF_MAX_ROW,
      SHELF_MAX_COLOUM,
    };
  },
  components: {
    ItemEditModal,
    ListItem,
    ItemEditProductModal
  },
  mounted() {
    // asd
    this.init();
  },
  computed: {
    deviceTypeId() {
      return this.cacheRow.typeId;
    },
    isSmallType() {
      return this.cacheRow.typeId == DEVICE_TYPE_SMALL;
    },
    deviceTypeName() {
      return this.cacheRow.typeId == DEVICE_TYPE_SMALL
        ? "酒店售货机"
        : "自助售货机";
    }
  },
  watch: {
    ["cacheRow.id"]() {
      this.init();
    }
  },
  methods: {
    //change_huodao 小售货机的 修改货道数量
    change_huodao(number) {
      //add
      if (number > this.detail.shelfs.length) {
        var newArray = [...Array(number - this.detail.shelfs.length)].map(
          (item, _index) => {
            //得到最后一个 shelf
            var listItem = this.detail.shelfs[this.detail.shelfs.length - 1]
            return {
              id: parseInt(listItem.number) + _index + 1,
              number: parseInt(listItem.number) + _index + 1,
              productId: "",
              safeStock: "",
              price: "",
              maxStock: "",
            };
          }
        );
        this.detail.shelfs = [...this.detail.shelfs, ...newArray];
        this.sortFornumber();
      } else {
        this.detail.shelfs = this.detail.shelfs.splice(0, number);
      }
    },
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
      }
      this.sortFornumber();
    },
    // 选择所有
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
    // 修改货道 多少层
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

      this.ItemEditProductModalStatus = false
    },
    //开始修改选择的货道
    go2updateSelectItems(item) {
      if (this.editItem.length <= 0) {
        myalert.fail("请选择先")
        return false
      }
      //如果存在 item  对象 修改edititem
      if (item.uuid) {
        this.editItem[0] = item;
      }
      //判断 items是不是array
      this.ItemEditProductModalStatus = true;
    },
    selectItems(items) {
      this.editItem = items;
    },
    //给每个array的货道后排序
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
    //修改 层 里面的 货道 数目的时候
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
      // 把这一row delete掉
      if (value == 0) {
        this.$data.detail.shelfs.splice(cengnumber, 1);
        this.sortFornumber();
      }
    },
    changeShelfCount(num) {
      if (this.detail.shelfs.length < num) {
        for (let i = 0; i < num - this.detail.shelfs.length; i++) {
          this.detail.shelfs.push({
            number: this.detail.shelfs.length + 1,
            isEdit: false,
            image: "",
            productId: "",
            safeStock: 1,
            price: "",
            maxStock: 1,
            name: ""
          });
        }
      }
      if (this.detail.shelfs.length > num) {
        for (let i = 0; i < this.detail.shelfs.length - num; i++) {
          this.detail.shelfs.splice(this.detail.shelfs.length - 1, 1);
        }
      }
    },
    selectItem(item) {
      this.$data.editItem = [item];
    },
    //submit 小收获机
    submit_small() {
      var self = this;
      var shelfs = [];
      shelfs = this.detail.shelfs;
      var data = {
        ...this.cacheRow,
        deviceId: this.cacheRow.id, //编辑的id
        shelfCount: this.detail.shelfs.length,
        shelfs
      };
      var isOkPost = true;
      data.shelfs.map(item => {
        if (!item.productId) {
          isOkPost = false;
        }
      });
      if (!isOkPost) {
        myalert.fail("检查到有货道没有产品");
        return false;
      }
      self.$data.loading = true;
      put_shelfs_device_detail(data)
        .then(res => {
          setTimeout(() => {
            self.init().then(res => {
              myalert.success("保存成功");
              self.$data.loading = false;
            });
          }, 1000);
        })
        .catch(e => {
          console.error(e);
          self.$data.loading = false;
        });
    },
    submit_big() {
      var self = this;
      var data = {
        ...this.cacheRow,
        deviceId: this.cacheRow.id, //编辑的id
        rows: this.detail.shelfs
      };
      delete data.shelfs;
      var isOkPost = true;
      data.rows.map(row => {
        row.items.map(item => {
          if (!item.productId) {
            isOkPost = false;
          }
        });
      });
      if (!isOkPost) {
        myalert.fail("检查到有货道没有产品");
        return false;
      }
      self.$data.loading = true;
      put_shelfs_device_detail_vm(data)
        .then(res => {
          setTimeout(() => {
            self.init().then(res => {
              myalert.success("保存成功");
              self.$data.loading = false;
            });
          }, 1000);
        })
        .catch(e => {
          console.error(e);
          self.$data.loading = false;
        });
    },
    //submit 大收获机
    submit1() {
      if (this.isSmallType) {
        this.submit_small();
      } else {
        this.submit_big();
      }
    },
    finishEdit(formData) {
      var self = this;
      var shelfs = this.$data.detail.shelfs;
      shelfs.map((item, index) => {
        self.$data.editItem.map((item2, index2) => {
          if (item2.number == item.number) {
            if (self.$data.editItem.length <= 1) {
              item.number = formData.number;
            }
            item.price = formData.price;
            item.image = formData.image;
            item.productId = formData.productId;
            item.safeStock = formData.safeStock;
            item.maxStock = formData.maxStock;
            item.name = formData.name;
          }
        });
      });
      //取消选择
      self.$data.editItem = [];
    },
    async init() {
      var id = this.cacheRow.id; //编辑的id
      this.$data.loading = true;
      var shelfs = [];
      // small
      if (this.cacheRow.typeId == DEVICE_TYPE_SMALL) {
        var result = await get_shelfs_device_detail(this.cacheRow.id);
        shelfs = result.shelfs;
      }
      //  big
      else {
        shelfs = await get_shelfs_device_detail_vm(id).then(result => {
          if (result.rows) {
            return result.rows.map((row, x) => {
              row.items &&
                row.items.map((item, y) => {
                  item.uuid = `${x}:${y}`;
                  item.isEdit = false;
                  return item;
                });
              return row;
            });
          } else {
            return [];
          }
        });
      }

      this.editItem = [];
      this.$data.detail.shelfs = shelfs;
      this.$data.loading = false;
    },
    addItem() {
      var self = this;
      var shelfs = this.$data.detail.shelfs;
      var newItem = {
        number: this.$data.detail.shelfs.length + 1,
        price: "",
        productId: "",
        safeStock: 1,
        maxStock: 1,
        isEdit: false
      };
      shelfs.push(newItem);
    },
    pilian1() {
      if (this.$data.editItem.length <= 0) {
        myalert.fail("请选择先");
        return false;
        // asd
      }
      this.$data.editModalState = true;
    },
    pilian2() {
      if (this.$data.editItem.length <= 0) {
        myalert.fail("请选择先");
        return false;
      }
      this.$data.visiblerpoduct = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../list/styles/rightEdit.scss";
</style>

