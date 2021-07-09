/*
 * @Author: KokoTa
 * @Date: 2020-12-23 09:52:07
 * @LastEditTime: 2021-02-02 17:53:32
 * @LastEditors: KokoTa
 * @Description: 分页混合器
 * @FilePath: /future-bms/src/mixin/pagination.js
 */
import Pagination from "@/components/Pagination";

const PaginationMixin = {
  components: {
    Pagination
  },
  data() {
    return {
      searchData: {}, // 搜索条件
      searchDataBackup: {}, // 改变 pageNo 时，可能搜索条件已经发生变化，这里要使用最后一次点击搜索按钮时的搜索条件
      page: {
        pageNo: 1,
        pageSize: 10,
        totalCount: 10
      },
      currentSelect: {} // 表格中点击操作按钮时对应的行数据
    };
  },
  methods: {
    search() {
      this.searchDataBackup = { ...this.searchData };
      this.page.pageNo = 1;
      this.getList(this.searchDataBackup);
    },
    changeStatus({ singleSaleType, price }) {
      switch (singleSaleType) {
        case "1":
          return `${price}元`;
          break;
        case "2":
          return "免费";
          break;
        case "3":
          return "加密";
          break;
      }
    },
    resetSearch() {
      this.searchData = {};
      this.searchDataBackup = {};
    },
    currentPageChange(page) {
      this.page.pageNo = page;
      this.tableData = [];
      this.getList(this.searchDataBackup);
    },
    currentSizeChange(pageSize) {
      console.log(pageSize)
      this.page.pageSize = pageSize;
      this.tableData = [];
      this.getList(this.searchDataBackup);
    },
    getCurrentSelect(row) {
      this.currentSelect = { ...row };
    }
  }
};

export default PaginationMixin;
