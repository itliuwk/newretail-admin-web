<template>
  <div class="page" v-loading="loading">
    <header>
      <h3>新增方案</h3>
      <div style="display:flex">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="名称">
            <el-input v-model="formInline.name" placeholder="方案名称"></el-input>
          </el-form-item>
          <el-form-item label="货道数目">
            <el-input-number
              v-model="formInline.shelfCount"
              @change="handleChange"
              :min="0"
              :max="40"
              :controls="true"
              label="货道"
            ></el-input-number>
          </el-form-item>
          <el-form-item style="padding-left:30px">
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
        <div class="rightbtns">
          <el-button @click="pilian">批量编辑</el-button>
        </div>
      </div>
    </header>

    <div class="row" v-if="detail.shelfs.length>0">
      <ListItem
        class="item"
        v-for="item in detail.shelfs"
        :key="item.id"
        :visible.sync="editModalState"
        :item="item"
        @selectItem="selectItem"
        :editItem.sync="editItem"
        @deleteItem="deleteItem"
      />
    </div>
    <div class="row" v-if="detail.shelfs.length==0" style="padding:20px;">请开始添加编辑</div>

    <ItemEditModal @finish="finishEdit" :visible.sync="editModalState" :editItem.sync="editItem"></ItemEditModal>
  </div>
</template>
<script>
import ListItem from "./listItem";
import ItemEditModal from "./itemFormModal";
import { mergeArray } from "../../../utils/lodash";
import myalert from "../../../utils/alert";
import { postShelfApply, postShelf } from "../../../api/shelfs";
import { setTimeout } from "timers";
import { mapActions } from "vuex";
export default {
  components: {
    ListItem,
    ItemEditModal
  },
  data() {
    return {
      loading: false,
      editItem: [],
      formInline: { name: "", shelfCount: "" },
      editModalState: false,
      detail: {
        shelfs: []
      }
    };
  },
  methods: {
    ...mapActions(["delVisitedView"]),
    deleteItem(item) {
      var _index = this.detail.shelfs.findIndex(_item => item.id == _item.id);
      this.detail.shelfs.splice(_index, 1);
    },
    selectItem(item) {
      this.editItem = mergeArray(this.editItem, [item]);
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
    onSubmit() {
      //能不能 提交
      var self = this;
      if (!this.formInline.name.trim()) {
        myalert.fail("名字不能空");
        return false;
      }
      if (!this.formInline.shelfCount > 0) {
        myalert.fail("货道号不能小于0");
        return false;
      }
      var isPost = true;
      this.detail.shelfs.map(item => {
        if (!item.productId) {
          isPost = false;
        }
      });
      if (!isPost) {
        myalert.fail("有货道信息不全");
        return false;
      }
      self.loading = true;
      postShelf({
        ...this.formInline,
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
            item.productId = formData.productId;
            item.image = formData.image;
            item.safeStock = formData.safeStock;
            item.maxStock = formData.maxStock;
          }
        });
      });
      //取消选择
      this.editItem = [];
    }
  }
};
</script>
<style lang="scss" scoped>
header {
  padding: 20px;
  background: #fff;
  h3 {
    padding-bottom: 20px;
  }
  .demo-form-inline {
    flex: 1;
  }
}
.row {
  background: #fff;
  margin-top: 20px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  .item {
    margin-right: 20px;
  }
}
</style>

