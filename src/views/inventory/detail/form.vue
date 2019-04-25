<template>
  <div style="display:flex;" class="form" v-loading="loading">
    <el-form :model="dataForm1" class="demo-form-inline" label-width="120px" ref="form1">
      <div>
        <el-form-item label="入库" prop="name">
          <el-switch
            @change="changeform(1)"
            v-model="dataForm1.checked"
            active-color="#13ce66"
            inactive-color="#ccc"
          ></el-switch>
        </el-form-item>

        <el-form-item label="入库数量" prop="amount" :rules="[  { required: true, message: '不能为空'}, ]">
          <el-input
            :disabled="dataForm1.disabled"
            type="number"
            v-model="dataForm1.amount"
            placeholder="入库数量"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note" :rules="[  { required: true, message: '不能为空'}, ]">
          <el-input :disabled="dataForm1.disabled" v-model="dataForm1.note" placeholder="备注"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-form :model="dataForm2" class="demo-form-inline" label-width="120px" ref="form2">
      <div>
        <el-form-item label="退货" prop="name">
          <el-switch
            v-model="dataForm2.checked"
            active-color="#13ce66"
            @change="changeform(2)"
            inactive-color="#ccc"
          ></el-switch>
        </el-form-item>

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
      </div>
    </el-form>

    <el-form :model="dataForm3" class="demo-form-inline" label-width="120px" ref="form3">
      <div>
        <el-form-item label="发货">
          <el-switch
            v-model="dataForm3.checked"
            @change="changeform(3)"
            active-color="#13ce66"
            inactive-color="#ccc"
          ></el-switch>
        </el-form-item>

        <el-form-item label="发货数量" prop="amount" :rules="[  { required: true, message: '不能为空'}, ]">
          <el-input
            :disabled="dataForm3.disabled"
            type="number"
            v-model="dataForm3.amount"
            placeholder="入库数量"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="发货场地"
          prop="toLocationId"
          :rules="[  { required: true, message: '不能为空'}, ]"
        >
          <el-select
            :disabled="dataForm3.disabled"
            v-model="dataForm3.toLocationId"
            placeholder="发货场地"
          >
            <el-option
              v-for="item1 in localtions"
              :key="item1.id"
              :label="item1.name"
              :value="item1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input :disabled="dataForm3.disabled" v-model="dataForm3.note" placeholder="备注"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div style="display:flex;align-items:flex-end;padding-bottom:23px;padding-left:20px;">
      <div>
        <el-button @click="sure" type="primary">确认</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  post_stockin,
  post_return,
  post_transfer,
  get_audits_detail
} from "@/api/inventory";
import myalert from "../../../utils/alert";
import detailModal from "./detail";
import { get_list_in_locations } from "../../../api/inventory";
import detailmixin from "./mixins/detail.js";
export default {
  mixins: [detailmixin],
  props: {
    // detail: {
    //   type: Object,
    //   default: detailModal
    // },
    // locationId: {
    //   type: [String, Number]
    // },
    // localtions: {
    //   //下拉 地址 select options
    //   type: Array
    // }
  },
  data() {
    return {
      type: 1,
      loading: false,
      dataForm1: {
        locationId: this.locationId,
        productId: this.detail.productId,
        amount: 1,
        note: "",
        disabled: false,
        checked: true
      },
      dataForm2: {
        locationId: this.locationId,
        productId: this.detail.productId,
        amount: 1,
        note: "",
        disabled: true,
        checked: false
      },
      dataForm3: {
        fromLocationId: this.locationId,
        productId: this.detail.productId,
        amount: 1,
        toLocationId: "",
        note: "",
        disabled: true,
        checked: false
      }
    };
  },
  mounted() {},
  methods: {
    sure() {
      var self = this;
      if (this.$data.type == 1) {
        this.$refs["form1"].validate(valid => {
          if (valid) {
            self.$data.loading = true;
            post_stockin({
              ...this.$data.dataForm1,
              locationId: this.locationId,
              productId: this.detail.productId
            })
              .then(res => {
                self.$data.loading = false;
                myalert.success("保存成功");
              })
              .catch(e => {
                console.error(e);
                self.$data.loading = false;
              });
          }
        });
      }
      if (this.$data.type == 2) {
        this.$refs["form2"].validate(valid => {
          if (valid) {
            self.$data.loading = true;
            post_return({
              ...this.$data.dataForm2,
              locationId: this.locationId,
              productId: this.detail.productId
            })
              .then(res => {
                self.$data.loading = false;
                myalert.success("保存成功");
              })
              .catch(e => {
                console.error(e);
                self.$data.loading = false;
              });
          }
        });
      }
      if (this.$data.type == 3) {
        this.$refs["form3"].validate(valid => {
          if (valid) {
            self.$data.loading = true;
            post_transfer({
              ...this.$data.dataForm3,
              fromLocationId: this.locationId,
              productId: this.detail.productId
            })
              .then(res => {
                self.$data.loading = false;
                myalert.success("保存成功");
              })
              .catch(e => {
                console.error(e);
                self.$data.loading = false;
              });
          }
        });
      }
    },
    changeform(type) {
      this.$data.type = type;
      if (type == 1) {
        this.$refs["form3"].resetFields();
        this.$refs["form2"].resetFields();
        this.$data.dataForm1.disabled = false;
        this.$data.dataForm2.disabled = true;
        this.$data.dataForm3.disabled = true;

        this.$data.dataForm1.checked = true;
        this.$data.dataForm2.checked = false;
        this.$data.dataForm3.checked = false;
      }
      if (type == 2) {
        this.$refs["form1"].resetFields();
        this.$refs["form3"].resetFields();
        this.$data.dataForm1.disabled = true;
        this.$data.dataForm2.disabled = false;
        this.$data.dataForm3.disabled = true;

        this.$data.dataForm1.checked = false;
        this.$data.dataForm2.checked = true;
        this.$data.dataForm3.checked = false;
      }
      if (type == 3) {
        this.$refs["form1"].resetFields();
        this.$refs["form2"].resetFields();
        this.$data.dataForm1.disabled = true;
        this.$data.dataForm2.disabled = true;
        this.$data.dataForm3.disabled = false;

        this.$data.dataForm1.checked = false;
        this.$data.dataForm2.checked = false;
        this.$data.dataForm3.checked = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.form {
  background: #fff;
}
</style>


