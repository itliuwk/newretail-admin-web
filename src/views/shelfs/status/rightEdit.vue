
<template>
  <div class="pageContainer" v-loading="right_loading">
    <Profile :storex="{...$data}" @pilian1="pilian1" @tijiao="tijiao" @change="shelfCountChange"/>
    <div class="rightContainer">
      <div class="list">
        <ListItem
          v-for="item in right_detail.shelfs"
          :key="item.number"
          :visible.sync="right_editModalState"
          :item="item"
          @selectItem="selectItem"
          @deleteItem="deleteItem"
          :editItem.sync="right_editItem"
        />
      </div>
    </div>

    <ItemEditModal
      @finish="finishEdit"
      :visible.sync="right_editModalState"
      :editItem.sync="right_editItem"
    ></ItemEditModal>
  </div>
</template>
<script>
import * as apishelfs from "@/api/shelfs";
import map from "lodash.map";
import ItemEditModal from "./itemFormModal";
import ListItem from "./rightShowItem";
import { postShelf } from "../../../api/shelfs";
import myalert from "../../../utils/alert";
import { get_shelfs_device_detail } from "../../../api/devicesStatus";
import props1 from "./mixins/props.js";
import initStore from "./rightMixins/initStore.js";
import methods from "./rightMixins/methods.js";
import Profile from "./views/right/profile";
export default {
  mixins: [props1, initStore, methods],
  components: {
    ItemEditModal,
    ListItem,
    Profile
  },
  mounted() {
    this.init();
  },
  watch: {
    "leftSelectRow.id": () => {
      this.init();
    }
  },
  methods: {
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
    pilian2() {
      if (this.$data.editItem.length <= 0) {
        myalert.fail("请选择先");
        return false;
      }
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
  .smnallbtns {
    padding-left: 20px;
    flex: 1;
    display: flex;
    .item {
      padding-right: 20px;
      display: flex;
    }
  }
}

.list {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  .listItem {
    box-sizing: border-box;
    display: inline-block;
    width: calc(50%-20px);
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
</style>

