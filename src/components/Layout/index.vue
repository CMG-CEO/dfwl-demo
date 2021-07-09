<!--
 * @Author: KokoTa
 * @Date: 2020-12-21 09:58:16
 * @LastEditTime: 2020-12-29 16:03:21
 * @LastEditors: KokoTa
 * @Description: 布局组件(视图最顶层的组件)
 * @FilePath: /future-bms/src/components/Layout/index.vue
-->
<template>
  <main class="main">
    <header class="header">
      <LayoutHeader @triggerMenuCollapse="triggerMenuCollapse"></LayoutHeader>
    </header>
    <div class="content">
      <aside class="menu">
        <LayoutMenu :isCollapse="isCollapse"></LayoutMenu>
      </aside>
      <el-card class="article">
        <router-view></router-view>
      </el-card>
    </div>
  </main>
</template>

<script>
import LayoutHeader from "./LayoutHeader/index";
import LayoutMenu from "./LayoutMenu/index";

export default {
  components: {
    LayoutHeader,
    LayoutMenu
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    triggerMenuCollapse(isCollapse) {
      this.isCollapse = isCollapse;
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  overflow: hidden;
  .header {
    height: 60px;
    line-height: 60px;
  }
  .content {
    height: calc(100% - 60px);
    display: flex;
    .menu {
      height: 100%;
      overflow: scroll;
      border-right: 1px solid $lightGray;
      background-color: $mainColor;
    }
    .article {
      flex: 1;
      height: 100%;
      overflow: scroll;
      margin-left: 20px;
      margin-top: 20px;
    }
  }
}
</style>
