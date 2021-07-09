<!--
 * @Author: KokoTa
 * @Date: 2020-12-21 10:20:18
 * @LastEditTime: 2020-12-23 14:17:09
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/dashboard/home/index.vue
-->
<template>
  <div>
    <!-- <el-button type="primary" @click="sendGood">Send Good</el-button>
    <el-button type="danger" @click="sendBad">Send Bad</el-button> -->
    <!-- <index></index> -->
    <!-- <div id="app"></div> -->
  </div>
</template>

<script>
import { testBad, testGood } from "@/api/test";
import index from "@/index";
export default {
  components: { index },
  methods: {
    async sendGood() {
      try {
        await testGood();
      } catch (error) {
        console.log("🚀 ~ file: index.vue ~ line 25 ~ sendGood ~ error", error);
      }
    },
    async sendBad() {
      try {
        await testBad();
      } catch (error) {
        console.log("🚀 ~ file: index.vue ~ line 32 ~ sendBad ~ error", error);
      }
    }
  }
};
</script>

<style></style>
