<template>
  <div>
    <form-container :selectData="selectData" @sure="search"></form-container>
    <div class="row" style="display:flex;" v-loading="tableLoading">
      <LeftTable
        style="flex:1"
        :storex="{...$data}"
        ref="lefttable"
        @selectRow="leftSelectRow"
        @changePage="leftChangePage"
      />

      <Center :storex="{...$data}" @clickLeft="click_left" @clickRight="click_right"></Center>

      <RightTable
        :storex="{...$data}"
        :tableData.sync="selectData"
        ref="righttable"
        @selectRow="rightSelectRow"
      />
    </div>
  </div>
</template>
<script>
import RightTable from "./righttable";
const FormContainer = () => import("./deviceform.vue");
import LeftTable from "./lefttable";
import leftTableMethods from "./leftTableMethods";
import formMethods from "./formMethods.js";
import initStore from "./initStore.js";
import Center from "./centerBtns";
import centerMethods from "./centerMethods";
import { getShelfAppliedData } from "../../../../api/shelfs";
export default {
  data() {
    return initStore;
  },
  components: {
    FormContainer,
    LeftTable,
    RightTable,
    Center
  },
  mounted() {
    var self = this;
    this.getRightTableData().then(res => {
      self.getData();
    });
  },
  computed: {
    page: function() {
      return parseInt(this.from / this.size) + 1;
    }
  },
  methods: {
    ...leftTableMethods,
    ...formMethods,
    ...centerMethods,
    getRightTableData() {
      var self = this;
      return getShelfAppliedData(this.$route.query.id).then(res => {
        if (res) {
          self.selectData = res;
        }
      });
    }
  }
};
</script>

