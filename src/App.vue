<!--
 * @Author: KokoTa
 * @Date: 2020-12-21 09:33:23
 * @LastEditTime: 2020-12-21 10:28:21
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    // if (sessionStorage.getItem("store")) {
    //   console.log("在页面刷新时将vuex里的信息保存到sessionStorage里");
    //   this.$store.replaceState(
    //     Object.assign(
    //       {},
    //       this.$store.state.user,
    //       JSON.parse(sessionStorage.getItem("store"))
    //     )
    //   );
    // }
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener("beforeunload", () => {
    //   console.log("在页面刷新时将vuex里的信息保存到sessionStorage里");
    //   sessionStorage.setItem("store", JSON.stringify(this.$store.state.user));
    // });
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
