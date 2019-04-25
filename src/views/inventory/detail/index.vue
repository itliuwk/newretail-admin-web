<template>
  <div>
    <Profile/>
    <MyTable1></MyTable1>
    <!-- <div class="tabContaner">
      <el-tabs v-model="activename" @tab-click="handleClick">
        <el-tab-pane
          :label="item.locationName"
          :name="item.locationName"
          v-for="item in localtions"
          :key="item.locationId"
        >
          <MyForm :detail="detail" :locationId="locationId" :localtions="localtionOptions"/>
        </el-tab-pane>
      </el-tabs>
    </div>-->

    <!-- <div class="tableContainer">
      <MyTable :detail="detail" :locationId="locationId" :localtions="localtionOptions"/>
    </div>-->
  </div>
</template>
<script>
import MyForm from "./form";
import MyTable1 from "./table1";
import Profile from "./profile";
import detailModal from "./detail";
import { GET_LOCATIONS } from "@/api/common";
import { get_audits_detail, get_list_in_locations } from "@/api/inventory";
import { mapActions, mapState } from "vuex";
import detailmixin from "./mixins/detail";
export default {
  mixins: [detailmixin],
  components: {
    MyForm,
    MyTable1,
    Profile
  },
  data() {
    return {
      // dataForm: {},
      // localtions: [],
      // locationId: "",
      // activename: "",
      // localtionOptions: []
    };
  },
  mounted() {
    var self = this;
    get_audits_detail(this.$route.query.id).then(res => {
      self.$data.detail = res;
    });
    var self = this;
    get_list_in_locations({ id: this.$route.query.id }).then(localtions => {
      if (localtions.length != 0) {
        self.$data.localtions = localtions;
        self.$nextTick(() => {
          self.$data.locationId = localtions[0].locationId + "";
          self.$data.activename = localtions[0].locationName + "";
        });
      }
    });

    GET_LOCATIONS().then(localtionOptions => {
      self.$data.localtionOptions = localtionOptions;
    });

    this.setEditRow(this.list_editRow);
  },
  methods: {
    handleClick(item) {
      this.$data.locationId = this.$data.localtions[item.index].locationId + "";
      this.$data.activename =
        this.$data.localtions[item.index].locationName + "";
    }
  }
};
</script>
<style lang="scss" scoped>
.tabContaner {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
}
</style>


