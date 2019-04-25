<template>
  <div>
    <el-form :inline="true" v-loading="loading" ref="form" :model="fromDataCopy">
      <div style="display:flex;">
        <el-form-item label="联系人" :rules="[{required:true,message:'不能为空'}]" prop="contactName">
          <el-input v-model="fromDataCopy.contactName" placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号" prop="contactMobile">
          <el-input v-model="fromDataCopy.contactMobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="联系人微信号" prop="contactQrcode">
          <el-input v-model="fromDataCopy.contactQrcode" placeholder="微信号"></el-input>
        </el-form-item>
      </div>
      <div style="display:flex;">
        <el-form-item label="场地名称" :rules="[{required:true,message:'不能为空'}]" prop="name">
          <el-input v-model="fromDataCopy.name" placeholder="场地名称"></el-input>
        </el-form-item>
        <el-form-item label="行业类型" :rules="[{required:true,message:'不能为空'}]" prop="name">
          <el-select :clearable="true" v-model="fromDataCopy.typeId" placeholder="类型">
            <el-option
              :key="item.id"
              v-for="item in locationTypes"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="省市县"
          :rules="[{required:true,message:'不能为空'}]"
          prop="selectedOptionValue"
        >
          <el-cascader
            :options="regionData"
            v-model="fromDataCopy.selectedOptionValue"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="街道" :rules="[{required:true,message:'不能为空'}]" prop="street">
          <el-input
            style="width:640px;"
            type="textarea"
            v-model="fromDataCopy.street"
            placeholder="街道"
            Î
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="上传场地图片" v-loading="imageloading">
          <div style="position:relative;">
            <input
              type="file"
              style="position:absolute;width:150px;height:150px;opacity:0;"
              @change="uploadImage"
            >
            <img
              style="width:150px;height:150px;"
              v-if="fromDataCopy.image"
              :src="fromDataCopy.image"
              class="avatar"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
// import { regionData, CodeToText } from "element-china-area-data";
const chinaData = () => import("element-china-area-data");
import uploadImage from "@/utils/upload";
import myalert from "@/utils/alert";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    fromData: {
      type: Object,
      default: () => {
        return {
          id: "",
          name: "",
          province: "",
          image: "",
          city: "",
          district: "",
          street: "",
          latitude: 1,
          longitude: 1,
          typeId: 1,
          contactName: "",
          contactMobile: "",
          contactQrcode: "",
          selectedOptionValue: [],
          selectedOptionText: []
        };
      }
    }
  },
  data() {
    return {
      fromDataCopy: JSON.parse(JSON.stringify(this._props.fromData)),
      regionData: [],
      CodeToText: {},
      loading: false,
      imageloading: false
    };
  },
  mounted() {
    this.adaptAddress();
    this.getLocationTypes();
  },

  computed: {
    ...mapState({
      locationTypes: state => state.common.locationTypes
    })
  },
  methods: {
    ...mapActions(["getLocationTypes"]),
    adaptAddress() {
      var self = this;
      chinaData().then(({ regionData, CodeToText, TextToCode }) => {
        self.$data.regionData = regionData;
        self.$data.CodeToText = CodeToText;
      });
    },
    handleChange(e) {
      this.$data.fromDataCopy.selectedOptionValue = e;
      this.$data.fromDataCopy.selectedOptionText = [
        this.$data.CodeToText[e[0]],
        this.$data.CodeToText[e[1]],
        this.$data.CodeToText[e[2]]
      ];
      this.$data.fromDataCopy.province = this.$data.fromDataCopy.selectedOptionText[0];
      this.$data.fromDataCopy.city = this.$data.fromDataCopy.selectedOptionText[1];
      this.$data.fromDataCopy.district = this.$data.fromDataCopy.selectedOptionText[2];
    },
    handleAvatarSuccess() {
      this.$data.loading = false;
    },
    beforeUpload() {
      this.$data.loading = true;
    },
    uploadImage(e) {
      var file = e.target.files[0];
      var self = this;
      self.$data.imageloading = true;
      uploadImage(file)
        .then(res => {
          this.$data.fromDataCopy.image = res.path;
          self.$data.imageloading = false;
          e.target.value = "";
        })
        .catch(e => {
          self.$data.imageloading = false;
          console.error(e);
          e.target.value = "";
          myalert.fail.call(self, "上传失败");
        });
    }
  }
};
</script>

