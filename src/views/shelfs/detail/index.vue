<template>
  <div class="pageContainer">
    <div class="itemRowContainerWrapper">
      <div class="wrapperbtns" style="padding-top:20px;">
        <el-button @click="addself">
          <svg-icon icon-class="plus"></svg-icon>
          <span>添加货道</span>
        </el-button>
        <el-button @click="click_is_mult">
          <svg-icon icon-class="piliang-copy" v-if="!isMult"></svg-icon>
          <svg-icon icon-class="close" v-if="isMult"></svg-icon>
          <span style="padding-left:5px;" v-if="!isMult">批量操作</span>
          <span style="padding-left:5px;" v-if="isMult">取消批量</span>
        </el-button>
        <!-- <el-button v-if="isMult" type="danger">
          <svg-icon icon-class="reduce_b"></svg-icon>
          <span style="padding-left:5px;">批量删除</span>
        </el-button>-->
        <el-button v-if="isMult" @click="go2edit(false)">
          <svg-icon icon-class="xiugai"></svg-icon>
          <span style="padding-left:5px;">批量修改</span>
        </el-button>
      </div>
    </div>
    <draggable
      v-loading="loading"
      :list="shelfs"
      :disabled="!enabled"
      class="itemRowContainer"
      v-bind:options="{ group: { name: 'number', pull: true } }"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragEnd"
      @update="dragupdate"
    >
      <transition-group type="transition" name="flip-list">
        <div
          class="itemContainer"
          v-for="(element,index) in shelfs"
          :key="element.number"
          :style="{borderStyle:!isMult?'solid':'dashed',borderColor:element.checked?'red':'#eee'}"
          @click="selectSelf(element,index)"
        >
          <div class="profile">
            <el-tag class="num" style="margin-bottom:5px;">
              <strong>货道号：</strong>
              <span>{{element.number}}</span>
            </el-tag>
            <img :src="element.image" alt>
            <div class="name" style="padding-top:20px;">{{element.name}}</div>
            <div class="price" style="padding-top:5px;">
              <strong>价格：</strong>
              <span>￥{{element.price}}</span>
            </div>
          </div>
          <div class="btns bottom" v-if="!isMult">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteShelf1(element)"></el-button>
            <el-button type="primary" icon="el-icon-edit" circle @click="go2edit(element)"></el-button>
          </div>
        </div>
      </transition-group>
    </draggable>

    <!-- edit products -->
    <el-dialog
      title="添加"
      width="800px"
      :visible.sync="editModalVisable"
      @close="editModalVisable=false"
    >
      <EditModal ref="editModalContainer" :cacheShelfs="cacheShelfs" v-if="editModalVisable"></EditModal>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editModalVisable = false">取消</el-button>
        <el-button type="primary" @click="sureeditModal">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getShelfs,
  getShelfDetail,
  postShelfApply,
  postShelf,
  deleteShelf,
  putShelf,
  getShelfCount
} from "@/api/shelfs";
import draggable from "vuedraggable";
import myalert from "@/utils/alert";
import { mergeArray } from "@/utils/lodash";
const EditModal = () => import("./EditModal.vue");
import map from "lodash.map";
import sortBy from "lodash.sortby";
export default {
  name: "shelfs_detail",
  data() {
    return {
      loading: false,
      formData: {},
      dragging: false,
      enabled: true,
      shelfCount: 0,
      name: "",
      shelfs: [],
      id: "", //货道方案的id
      editModalVisable: false,
      cacheShelfs: [], //编辑的暂时数据
      isMult: false
    };
  },
  components: {
    draggable,
    EditModal
  },
  mounted() {
    this.$data.formData.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    deleteShelf1(item) {
      var self = this;
      myalert.confirm("确定要删除货道？").then(async res => {
        self.$data.loading = true;
        await deleteShelf(item.id).catch(e => {
          myalert.fail("删除失败");
          console.error(e);
        });
        myalert.success("删除成功");
        this.$data.loading = false;
        //刷新列表
        var _index = self.$data.shelfs.findIndex(
          _item => item.number == _item.number
        );
        self.$data.shelfs.splice(_index, 1);
      });
    },
    //add  货道
    addself() {
      var self = this;
      const inputValidator = val => {
        if (val <= 0) {
          return "不能小于或者等于0";
        }
        //判断输入是不是已经有了number
        var _index = self.$data.shelfs.findIndex(item => item.number == val);
        if (_index >= 0) {
          return "已经有了货道";
        }
        return true;
      };
      myalert
        .prompt("输入货道号(默认自增)", {
          inputPattern: /^\d+(\.{0,1}\d+){0,1}$/,
          inputValidator,
          inputValue: self.$data.shelfs[self.$data.shelfs.length - 1].number + 1
        })
        .then(action => {
          self.$data.shelfs.push({
            checked: false,
            number: action.value,
            image: "",
            productId: "",
            safeStock: "",
            price: 0,
            maxStock: "",
            name: ""
          });
          //排序
          self.$data.shelfs = sortBy(self.$data.shelfs, item => item.number);
        });
    },
    selectSelf(item, index) {
      if (!this.$data.isMult) return false;
      this.$data.shelfs[index].checked = !this.$data.shelfs[index].checked;
    },
    click_is_mult() {
      this.$data.isMult = !this.$data.isMult;
      if (!this.$data.isMult) {
        this.$data.shelfs = this.$data.shelfs.map(item => {
          item.checked = false;
          return item;
        });
      }
    },
    go2edit(row) {
      //一个和多个的区别
      if (row) {
        //一个
        this.$data.cacheShelfs = [row];
      } else {
        this.$data.cacheShelfs = this.$data.shelfs.filter(item => item.checked);
        if (this.$data.cacheShelfs.length <= 0) {
          myalert.fail("选择先！！");
          return false;
        }
      }
      this.$data.editModalVisable = true;
    },
    //确定编辑
    sureeditModal() {
      var shelfs = this.$refs["editModalContainer"].$data.dataForm.shelfs;
      var $form = this.$refs["editModalContainer"].$refs["form"];
      var self = this;
      $form.validate(valid => {
        self.$data.formData.id; //货道方案的ID
        if (valid) {
          //每个产品的price都设置
          self.$refs["editModalContainer"].$data.dataForm.shelfs = self.$refs[
            "editModalContainer"
          ].$data.dataForm.shelfs.map(item => {
            item.price = self.$refs["editModalContainer"].$data.dataForm.price;
            return item;
          });
          putShelf({
            shelfCount: self.$refs["editModalContainer"].$data.dataForm.number,
            shelfs: self.$refs["editModalContainer"].$data.dataForm.shelfs,
            id: self.$data.formData.id, //货道方案的ID
            ...self.$refs["editModalContainer"].$data.dataForm
          }).then(res => {
            myalert.success("修改成功");
            //修改 货道列表的数据
            shelfs.map((_item, index) => {
              var _index = self.$data.shelfs.findIndex(
                item => item.number == _item.number
              );
              self.$data.shelfs[_index] = _item;
            });
            this.$data.editModalVisable = false;
          });
        }
      });
    },
    dragupdate(a, b) {
      this.$data.shelfs = this.$data.shelfs.map((item, index) => {
        item.number = index + 1;
        return item;
      });
    },
    dragEnd(a, b) {
      this.$data.dragging = false;
    },
    async getData() {
      var result = await getShelfDetail(this.$data.formData.id);
      this.$data.shelfCount = result.shelfCount;
      this.$data.shelfCount = result.shelfCount;
      this.$data.name = result.name;
      this.$data.shelfs = result.shelfs.map(item => {
        item.checked = false;
        return item;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.itemRowContainerWrapper {
  padding-top: 10px;
  .wrapperbtns {
    display: flex;
    padding: 10px;
    background: #fff;
  }
}

.formContainer {
  padding-top: 20px;
  padding-left: 20px;
  background: #fff;
}
.itemRowContainer {
  & > span {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    background: #fff;

    .itemContainer {
      cursor: pointer;
      margin-right: 20px;
      width: calc(12.5% - 20px);
      background: #fff;
      margin-bottom: 20px;
      border-radius: 5px;
      border: 1px solid #ddd;
      font-size: 12px;
      padding: 10px;
      .profile {
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & > img {
          width: 100px;
          height: 100px;
        }
      }
      .btns.bottom {
        display: flex;
        justify-content: space-around;
      }

      &:last-child {
        margin-right: 0;
      }
      &:nth-child(8n) {
        margin-right: 0;
      }
      &.iconadd {
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          font-size: 100px;
        }
      }
      @media screen and (max-width: 1200px) {
        width: calc(20% - 20px);
        &:nth-child(8n) {
          margin-right: 20px;
        }
        &:nth-child(5n) {
          margin-right: 0;
        }
      }
      @media screen and (max-width: 600px) {
        width: calc(33.33% - 20px);
        &:nth-child(8n) {
          margin-right: 20px;
        }
        &:nth-child(5n) {
          margin-right: 20px;
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}
</style>


