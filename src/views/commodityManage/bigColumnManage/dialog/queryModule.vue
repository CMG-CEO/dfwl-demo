<template>
  <el-form ref="form" :model="searchData" :inline="true">
    <el-form-item label="商品名称">
      <el-input
        v-model="searchData.goodsName"
        placeholder="输入商品名称"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-select
        v-model="searchData.shelfStatus"
        placeholder="选择状态"
        clearable
        filterable
      >
        <el-option
          v-for="item in shelfStatusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">查询</el-button>
      <el-button type="primary">重置</el-button>
      <el-button type="primary">导出</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { shelfStatusList } from "@/util/option";

export default {
  props: {
    // currentItem: {
    //   // 选中的表格行的数据（这里不使用 currentSelect 命名是因为会和 mixin 的命名冲突）
    //   type: Object,
    //   default: () => {}
    // },
  },
  data() {
    return {
      searchData: {},
      shelfStatusList
    };
  },
  watch: {},
  computed: {},
  methods: {}
};
</script>

<style></style>
