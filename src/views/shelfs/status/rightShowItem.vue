
<template>
  <div
    class="listItem"
    :key="item.id"
    @mouseleave="mouseleave(item)"
    @mouseover="mouseover(item)"
    @click="selectItems(item)"
  >
    <div class="editBtns" v-if="item.isEdit||isSelect">
      <div class="center" v-if="editItem.length<=1">
        <el-button @click="go2edit(item,$event)">编辑</el-button>
      </div>
      <svg-icon
        icon-class="close"
        class="close_icon"
        @click="deleteItem(item,$event)"
        v-if="editItem.length<=1"
      ></svg-icon>
    </div>
    <div>
      <img class="left img" :src="item.image" alt>
    </div>

    <div class="right">
      <h5 style="padding-left:10px;">{{item.name}}</h5>
      <div class="rows">
        <div class="rowItem">
          <div class="item1">货道号:</div>
          <div class="item2">{{item.number}}</div>
        </div>
        <div class="rowItem">
          <div class="item1">零售价:</div>
          <div class="item2">￥{{item.price}}</div>
        </div>
      </div>
      <div style="padding-top:10px;" class="rows">
        <div class="rowItem">
          <div class="item1">容量:</div>
          <div class="item2">{{item.maxStock}}</div>
        </div>
        <div class="rowItem">
          <div class="item1">安全库存:</div>
          <div class="item2">{{item.safeStock}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myalert from "@/utils/alert";
export default {
  props: ["visible", "item", "visiblerpoduct", "editItem"],
  computed: {
    isSelect() {
      return this.editItem.filter(item1 => item1.number == this.item.number)
        .length;
    }
  },
  methods: {
    mouseover(item) {
      item.isEdit = true;
    },
    mouseleave(item) {
      item.isEdit = false;
    },
    deleteItem(item, e) {
      var self = this;
      myalert.confirm("确定删除？").then(res => {
        self.$emit("deleteItem", item);
      });
      e.stopPropagation();
    },
    go2edit(item, e) {
      this.$emit("selectItem", item);
      this.$emit("update:visible", true);
      e.stopPropagation();
    },
    go2editProduct(item, e) {
      this.$emit("selectItem", item);
      this.$emit("update:visiblerpoduct", true);
      e.stopPropagation();
    },
    selectItems(item) {
      //存在 jia
      //不存在  delete
      var _index = this.editItem.findIndex(
        item1 => item1.number == item.number
      );
      if (_index >= 0) {
        this.editItem.splice(_index, 1);
      } else {
        this.editItem.push(item);
      }

      this.$emit("update:editItem", this.editItem);
    }
  }
};
</script>
<style lang="scss" scoped>
.listItem {
  box-sizing: border-box;
  display: inline-block;
  width: calc(50% - 20px);
  border: 1px solid #ddd;
  display: flex;
  padding: 10px;
  margin-bottom: 20px;
  position: relative;
  .editBtns {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #f0f9eb7d;
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .close_icon {
      color: #222;
    }
  }
  & .close_icon {
    cursor: pointer;
    right: 10px;
    top: 10px;
    position: absolute;
  }
  .left.img {
    width: 60px;
    height: 60px;
  }
  .right {
    flex: 1;
    h5 {
      padding: 0;
      margin: 0;
      padding-bottom: 5px;
    }
    .rows {
      display: flex;
      .rowItem {
        display: flex;
        .item1 {
          margin-left: 10px;
          //   width: 80px;
        }
        .item2 {
          //   width: 60px;
        }
      }
    }
    .el-input {
      max-width: 80px;
      padding: 0px;
    }
  }
}
</style>


