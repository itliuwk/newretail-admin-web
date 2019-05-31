
<template>
  <el-dialog
    width="300px"
    :visible="visible"
    @open="open"
    :show-close="false"
  >
    <div style="padding-top:20px;">
      <el-form
        :inline="false"
        :model="formInline"
        ref="form"
        class="demo-form-inline"
        label-width="100px"
      >
        <el-form-item
          v-if="editItem.length<=1"
          label="货道号"
          prop="number"
        >
          <!--
          :rules="[
        {required: true, message: '不能为空'},{
          validator, trigger: 'blur'
          }]"-->
          <el-input
            v-model="formInline.number"
            type="number"
            min="1"
            :disabled="deviceTypeId!='quxia'"
            placeholder="货道号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="价格"
          prop="price"
          :rules="[{required: true, message: '不能为空'}]"
        >
          <el-input
            v-model="formInline.price"
            type="number"
            min=".1"
            placeholder="价格"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="安全库存"
          prop="safeStock"
          :rules="[{required: true, message: '不能为空'}]"
        >
          <el-input
            v-model="formInline.safeStock"
            type="number"
            min="1"
            placeholder="安全库存"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="容量"
          prop="maxStock"
          :rules="[{required: true, message: '不能为空'}]"
        >
          <el-input
            v-model="formInline.maxStock"
            type="number"
            min="1"
            placeholder="容量"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="商品"
          prop="productId"
          :rules="[{required: true, message: '不能为空'}]"
        >
          <!-- :clearable="true" -->
          <el-select
            v-model="formInline.productId"
            placeholder="商品"
            filterable
            v-loading="productloading"
            v-scroll="handleScroll"
            @change="selectproductchange"
          >
            <el-option
              v-for="item1 in products"
              :key="item1.id"
              :label="item1.name"
              :value="item1.id"
            >
              <div style="display:flex;align-items:center;">
                <img
                  :src="item1.image"
                  style="width:30px;height:30px;"
                >
                <span style=" color: #8492a6; font-size: 13px;padding-left:10px;">￥{{ item1.price }}</span>
                <span style="color: #8492a6; font-size: 13px;padding-left:10px;">{{ item1.name }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="$emit('update:visible',false)">取消</el-button>
      <el-button
        type="primary"
        @click="sure"
      >确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { GET_LIST } from "../../../api/commodityManagement";
import { mergeArray } from "../../../utils/lodash";
import { clone } from "@/filters";
import myalert from "../../../utils/alert";
import { DEVICE_TYPE_SMALL } from '../../../config';
export default {
  props: ["visible", "editItem"],
  data() {
    return {
      cacheItemCopy: {},
      formInline: {
        productId: "",
        safeStock: "",
        price: "",
        maxStock: "",
        number: ""
      },
      products: [],
      productloading: false,
      productparams: {
        query: "",
        from: "",
        size: 10
      },
      deviceTypeId: DEVICE_TYPE_SMALL
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    //验证 number
    validator(rule, value, callback) {
      var exit = false;
      var self = this;
      this.$parent.$data.detail.shelfs.map(item => {
        if (item.number == value && item.number != self.editItem[0].number) {
          exit = true;
        }
      });
      if (exit) {
        callback("已经存在");
      } else {
        callback();
      }
    },
    init() {
      this.deviceTypeId = this.$parent.deviceTypeId
      if (this.$data.products.length <= 0) {
        this.remoteMethod();
      }
      if (this.editItem.length > 1) {
        //如果是多选 进来选择都为空
        this.$data.cacheItemCopy = clone({});
        this.$data.formInline = clone({});
      } else {
        this.$data.cacheItemCopy = clone(this.editItem[0]);
        this.$data.formInline = clone(this.editItem[0]);
      }
    },
    open() {

    },
    finish() {
      this.$emit("finish", this.$data.formInline);
    },
    isExitNumberInArray() {
      var array = this.$parent.$data.detail.shelfs;
      var exit = false;
      var self = this;
      for (var item of array) {
        for (var item1 of item.items) {
          if (item1.number == self.formInline.number) {
            exit = true;
            break;
          }
        }
      }
      return exit;
    },
    sure() {
      var self = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          self.finish();
        }
      });
    },
    selectproductchange(value, item) {
      var _index = this.products.findIndex(item => item.id == value);
      this.formInline.image = this.products[_index].image;
      this.formInline.name = this.products[_index].name;
      this.formInline.productId = this.products[_index].id;
      this.formInline.price = this.products[_index].price;
    },
    remoteMethod(value) {
      var self = this;
      this.$data.productloading = true;
      this.$data.productparams.query = value;
      this.$data.productparams.from = 0;
      GET_LIST({
        ...this.$data.productparams
      })
        .then(res => {
          self.$data.products = res;
          self.$data.productloading = false;
        })
        .catch(e => {
          self.$data.productloading = false;
        });
    },
    handleScroll() {
      var self = this;
      this.$data.productparams.from =
        this.$data.productparams.from + this.$data.productparams.size;
      GET_LIST({
        ...this.$data.productparams
      })
        .then(res => {
          self.$data.products = mergeArray(self.$data.products, res);
          self.$data.productloading = false;
        })
        .catch(e => {
          self.$data.productloading = false;
        });
    }
  },


};
</script>

