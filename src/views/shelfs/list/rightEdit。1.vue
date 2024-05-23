
<template>
  <div class="pageContainer" v-loading="loading">
    <header>
      <h3>货道详情</h3>
      <div class="btns">
        <el-input-number v-model="detail.shelfCount" @change="changeShelfCount" :min="0" :max="50"></el-input-number>
        <el-button @click="pilian1" style="margin-left:10px;">批量编辑</el-button>
        <el-button @click="submit1" type="primary" :loading="loading">提交</el-button>
      </div>
    </header>
    <div class="rightContainer">
      <div class="list">
        <ListItem
          v-for="item in detail.shelfs"
          :key="item.number"
          :visible.sync="editModalState"
          :visiblerpoduct.sync="visiblerpoduct"
          :item="item"
          @selectItem="selectItem"
          @deleteItem="deleteItem"
          :editItem.sync="editItem"
        />
      </div>
    </div>
    <ItemEditModal @finish="finishEdit" :visible.sync="editModalState" :editItem.sync="editItem"></ItemEditModal>
  </div>
</template>
<script>
import * as apishelfs from "@/api/shelfs";
import map from "lodash.map";
import ItemEditModal from "./itemFormModal";
import ListItem from "./rightShowItem";
import { postShelf, putShelf } from "../../../api/shelfs";
import myalert from "../../../utils/alert";
import ItemEditProductModal from "./ItemEditProductModal";
export default {
  props: ["cacheRow", "isEdit"],
  data() {
    return {
      loading: false,
      detail: {},
      editItem: [],
      editModalState: false,
      visiblerpoduct: false
    };
  },
  components: {
    ItemEditModal,
    ListItem,
    ItemEditProductModal
  },
  mounted() {
    this.init();
  },
  watch: {
    ["cacheRow.id"]() {
      this.init();
    }
  },
  methods: {
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
    deleteItem(item) {
      var _index = this.detail.shelfs.findIndex(_item => item.id == _item.id);
      this.detail.shelfs.splice(_index, 1);
      this.detail.shelfCount = this.detail.shelfs.length;
    },
    submit1() {
      var self = this;
      var data = {
        ...this.$data.detail,
        shelfCount: this.detail.shelfs.length,
        shelfs: this.detail.shelfs
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
      putShelf(data)
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
      var detail = await apishelfs.getShelfDetail(id).then(res => {
        res.shelfs = map(res.shelfs, item => {
          return { ...item, isEdit: false };
        });
        return res;
      });
      this.editItem = [];
      this.$data.detail = detail;
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
.pageContainer {
}
header {
  width: 100%;
  align-items: center;
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  h3 {
    flex: 1;
  }
}

.list {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  .listItem {
    box-sizing: border-box;
    display: inline-block;
    width: calc(50% - 20px);
    border: 1px solid #ddd;
    display: flex;
    padding: 10px;
    margin-bottom: 20px;
    position: relative;
    &:nth-child(2n + 1) {
      margin-right: 20px;
    }
    &.add {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.listItem.add {
  margin-left: 20px;
  margin-right: 20px;
  width: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #ddd;
  margin-top: 10px;
}
</style>

