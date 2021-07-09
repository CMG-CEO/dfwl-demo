<!--
 * @Author: CMG
 * @Date: 2020-12-23 09:49:17
 * @LastEditTime: 2021-07-07
 * @LastEditors: CMG
 * @Description: 分页组件
-->
<template>
  <div class="pagination-wrap">
    <el-pagination
      class="pagination"
      background
      :current-page="ipagination.current"
      :page-size="ipagination.pageSize"
      :total="ipagination.total"
      :page-sizes="ipagination.pageSizeOptions"
      layout="sizes, total, prev, pager,
      next, jumper"
      @current-change="currentPageChange"
      @size-change="currentSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    ipagination: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    currentPageChange(page) {
      this.$emit("pagination", true, page);
    },
    currentSizeChange(pageSize) {
      this.$emit("pagination", false, pageSize);
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination-wrap {
  text-align: right;
  overflow: scroll;
  margin: 10px 0;
}
</style>
