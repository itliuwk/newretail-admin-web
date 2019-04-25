<template>
  <div class="wrapper_left">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in app_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
    <div class="slider_bottom">
      <svg-icon
        @click.native="click_collapse"
        icon-class="right"
        v-if="isCollapse"
      />
      <svg-icon
        @click.native="click_collapse"
        icon-class="left"
        v-if="!isCollapse"
      />
    </div>
  </div>

</template>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.wrapper_left {
  height: 100%;
  display: flex;
  flex-direction: column;
  .scrollbar-wrapper {
    flex: 1;
  }
}
.el-scrollbar {
  height: 100%;
}
.slider_bottom {
  height: 40px;
  background: $menuActiveText;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
export default {
  components: { SidebarItem },
  mounted() {},
  computed: {
    ...mapGetters(["app_routes", "sidebar"]),
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
    ...mapActions({
      toggleSideBar: "toggleSideBar"
    }),
    click_collapse() {
      this.toggleSideBar();
    }
  }
};
</script>
