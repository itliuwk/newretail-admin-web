<template>
  <el-dialog :visible.sync="returnshow" title="退货" width="30%" v-loading="loading1">
    <div>
      <el-form label-position="top" :model="dataForm2" ref="form">
        <el-form-item label="退货数量" prop="amount" :rules="[  { required: true, message: '不能为空'}, ]">
          <el-input
            :disabled="dataForm2.disabled"
            type="number"
            v-model="dataForm2.amount"
            placeholder="退货数量"
          ></el-input>
        </el-form-item>
        <el-form-item label="退货原因" prop="note" :rules="[  { required: true, message: '不能为空'}, ]">
          <el-input :disabled="dataForm2.disabled" v-model="dataForm2.note" placeholder="退货原因"></el-input>
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
import {
  post_stockin,
  post_transfer,
  post_return
} from "../../../../api/inventory";
import myalert from "../../../../utils/alert";
export default {
  mixins: [detailmixin],
  data() {
    return {
      loading1: false,
      dataForm2: {}
    };
  },
  mounted() {},
  methods: {
    close() {
      this.setStore({ returnshow: false });
    },
    sure() {
      var self = this;
      self.$refs["form"].validate(valid => {
        if (valid) {
          self.loading1 = true;
          post_return({
            ...self.dataForm2,
            locationId: self.editRow2.locationId,
            productId: self.$route.query.id
          })
            .then(res => {
              self.loading1 = false;
              myalert.success("发货添加成功");
              self.$emit("finish");
              self.setStore({ returnshow: false });
            })
            .catch(e => {
              self.loading1 = false;
              myalert.fail("发货添加失败");
              self.setStore({ returnshow: true });
            });
        }
      });
    }
  }
};
</script>

