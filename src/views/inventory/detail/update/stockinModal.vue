<template>
  <el-dialog :visible.sync="stockshow" title="入库" width="30%" v-loading="loading1">
    <div>
      <el-form :model="dataForm1" ref="form">
        <el-form-item label="入库数量" prop="amount" :rules="[  { required: true, message: '不能为空'}, ]">
          <el-input type="number" min="0" v-model="dataForm1.amount" placeholder="入库数量"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="dataForm1.note" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="sure">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import detailmixin from "../mixins/detail.js";
import { post_stockin } from "../../../../api/inventory";
import myalert from "../../../../utils/alert";
export default {
  mixins: [detailmixin],
  data() {
    return {
      loading1: false,
      dataForm1: {}
    };
  },
  mounted() {},
  methods: {
    close() {
      this.setStore({ stockshow: false });
    },
    sure() {
      var self = this;
      self.$refs["form"].validate(valid => {
        if (valid) {
          self.loading1 = true;
          post_stockin({
            ...self.dataForm1,
            locationId: self.editRow2.locationId,
            productId: self.$route.query.id
          })
            .then(res => {
              self.loading1 = false;
              myalert.success("入库添加成功");
              self.$emit("finish");
              self.setStore({ stockshow: false });
            })
            .catch(e => {
              self.loading1 = false;
              myalert.fail("入库添加失败");
              self.setStore({ stockshow: true });
            });
        }
      });
    }
  }
};
</script>

