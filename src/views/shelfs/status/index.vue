<template>
  <div class="shelfs">
    <MyForm :storex="{...$data}" @search="search"></MyForm>

    <div class="row2" style="display:flex;background:#fff;padding-bottom:20px;">
      <MyTable
        ref="lefttable"
        :storex="{...$data}"
        @clickrow="clickrowleft"
        @changePagination="changePaginationleft"
      />
      <div style="flex:1;" class="right">
        <RightEdit :storex="{...$data}" v-if="isEdit" :cacheRow.sync="cacheRow"/>
        <div v-if="!isEdit" class="null">
          <header>
            <h3>货道详情</h3>
          </header>
        </div>
      </div>
    </div>
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
import { mapState, mapActions } from "vuex";
import myalert from "@/utils/alert";
import MyTable from "./table";
import RightEdit from "./rightEdit";
import initStore from "./mixins/initStore.js";
import MyForm from "./form";
import tablemix from "./mixins/table.js";
import rightmix from "./mixins/right.js";
export default {
  name: "shelfs_status",
  mixins: [initStore, tablemix, rightmix],
  components: {
    MyTable,
    RightEdit,
    MyForm
  },
  computed: {
    ...mapState({
      deviceTypes: state => state.common.deviceTypes
    })
  },
  mounted() {},
  methods: {
    ...mapActions(["getDeviceTypes"]),
    postShelfApply1(item) {
      this.$router.push(`/shelfs/putaway?id=${item.id}&name=${item.name}`);
    },
    clickrowleft(row) {
      this.isEdit = false;
      this.$nextTick(() => {
        this.isEdit = true;
        this.cacheRow = row;
      });
    },
    go2add() {
      this.$router.push(`/shelfs/add`);
    },
    clickGetTableData() {
      this.$data.dataForm.from = 0;
      this.$refs["lefttable"].getTableData();
    }
  }
};
</script>

<style lang="scss" scoped>
.formContainer {
  padding: 10px;
  padding-top: 20px;
  background: #fff;
}

.row2 {
  margin-top: 20px;
  padding-left: 20px;
}

.paginationContainer {
  padding: 20px;
  background: #fff;
}
.right {
  background: #fff;
  border-left: 1px solid #dddd;
  margin-left: 20px;
  .null {
    padding: 20px;
  }
}
</style>
