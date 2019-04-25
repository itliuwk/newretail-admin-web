<template>
  <el-dialog :visible.sync="transfershow" title="发货" width="30%" v-loading="loading1">
    <div>
      <el-form label-position="top" :model="dataForm3" ref="form">
        <el-form-item label="发货数量" prop="amount" :rules="[  { required: true, message: '不能为空'}, ]">
          <el-input
            :disabled="dataForm3.disabled"
            type="number"
            v-model="dataForm3.amount"
            placeholder="发货数量"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="发货场地"
          prop="toLocationId"
          :rules="[  { required: true, message: '不能为空'}, ]"
        >
          <el-select
            style="width:100%"
            :disabled="dataForm3.disabled"
            v-model="dataForm3.toLocationId"
            placeholder="发货场地"
          >
            <el-option
              v-for="item1 in locations"
              :key="item1.id"
              :label="item1.name"
              :value="item1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input :disabled="dataForm3.disabled" v-model="dataForm3.note" placeholder="备注"></el-input>
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
import { post_stockin, post_transfer } from "../../../../api/inventory";
import myalert from "../../../../utils/alert";
export default {
  mixins: [detailmixin],
  data() {
    return {
      loading1: false,
      dataForm3: {}
    };
  },
  mounted() {},
  methods: {
    close() {
      this.setStore({ transfershow: false });
    },
    sure() {
      var self = this;
      self.$refs["form"].validate(valid => {
        if (valid) {
          self.loading1 = true;
          post_transfer({
            ...self.dataForm3,
            locationId: self.editRow2.locationId,
            productId: self.$route.query.id
          })
            .then(res => {
              self.loading1 = false;
              myalert.success("发货添加成功");
              self.$emit("finish");
              self.setStore({ transfershow: false });
            })
            .catch(e => {
              self.loading1 = false;
              myalert.fail("发货添加失败");
              self.setStore({ transfershow: true });
            });
        }
      });
    }
  }
};
</script>

