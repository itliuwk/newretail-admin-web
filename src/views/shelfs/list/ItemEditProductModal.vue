

<template>
  <el-dialog width="800px" :visible="visiblerpoduct" :show-close="false" @open="open">
    <div>
      <div style="display:flex;">
        <el-input placeholder="search" v-model="query"></el-input>
        <el-button @click="search">搜索</el-button>
      </div>
      <el-table
        :data="lists"
        style="width: 100%"
        @row-click="rowClick"
        :row-class-name="rowclassname"
      >
        <el-table-column prop="name" label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.image" min-width="70" width="70" height="70">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="parseInt('50')"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visiblerpoduct',false)">取消</el-button>
      <el-button type="primary" @click="sure">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { GET_LIST } from "../../../api/commodityManagement";
import myalert from "../../../utils/alert";
import { clone } from "../../../filters";
export default {
  props: ["visiblerpoduct", "editItem"],
  data() {
    return {
      lists: [],
      query: "",
      params: {
        from: 0,
        size: 10,
        query: ""
      },
      cacheRow: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    open() {
      this.init();
    },
    sure() {
      if (this.$data.cacheRow) {
        this.$emit("update:visiblerpoduct", false);
        this.$emit("finish", clone(this.$data.cacheRow));
        this.$data.cacheRow = null;
      } else {
        myalert.fail("请选择");
        return false;
      }
    },
    rowClick(row) {
      this.$data.cacheRow = row;
    },
    search() {
      this.$data.params.query = this.$data.query;
      this.$data.params.from = 0;
      this.init();
    },
    currentChange(page) {
      this.$data.params.from = parseInt(page - 1) * this.params.size;
      this.init();
    },
    init() {
      var self = this;
      //show table  product
      GET_LIST(this.params).then(res => {
        res.map(item => {
          return item;
        });
        self.lists = res;
      });
    },
    rowclassname({ row, rowIndex }) {
      if (this.$data.cacheRow) {
        if (row.id === this.$data.cacheRow.id) {
          return "success-row";
        }
      }

      return "";
    }
  }
};
</script>

