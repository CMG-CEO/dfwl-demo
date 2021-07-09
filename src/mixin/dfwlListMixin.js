/**
 * 新增修改完成调用 modalFormOk方法 编辑弹框组件ref定义为modalForm
 * 高级查询按钮调用 superQuery方法  高级查询组件ref定义为superQueryModal
 * data中url定义 list为查询列表  delete为删除单条记录  deleteBatch为批量删除
 */
import { filterObj } from "@/utils/util";
import Pagination from "@/components/Pagination";
import { deleteAction, getAction, postAction } from "@/api/manage";
import Vue from "vue";
// import { ACCESS_TOKEN } from '@/store/mutation-types'

export const dfwlListMixin = {
  components: { Pagination },
  data() {
    return {
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      dataSource: [],
      /* 分页参数 */
      ipagination: {
        current: 1,
        pageSize: 5,
        pageSizeOptions: [5, 10, 20],
        total: 0,
        pageCount: 1,
        showQuickJumper: true,
        showSizeChanger: true
      },
      /* 排序参数 */
      isorter: {
        column: "createTime",
        order: "desc"
      },
      /* 筛选参数 */
      filters: {},
      /* table加载状态 */
      loading: false,
      /* table选中keys */
      selectedRowKeys: [],
      /* table选中records */
      selectionRows: [],
      /* 查询折叠 */
      toggleSearchStatus: false,
      /* 高级查询条件生效状态 */
      superQueryFlag: false,
      /* 高级查询条件 */
      superQueryParams: "",
      /** 高级查询拼接方式 */
      superQueryMatchType: "and",

      searchData: {}
    };
  },
  created() {
    if (!this.disableMixinCreated) {
      // console.log(' -- mixin created -- ')
      this.loadData();
      //  初始化字典配置 在自己页面定义
      // this.initDictConfig();
    }
  },
  methods: {
    loadData(arg) {
      if (this.url.methods === "post") {
        this.loadPostData(arg);
      } else {
        this.loadgetData(arg);
      }
    },
    loadgetData(arg) {
      if (!this.url.list) {
        // this.$message.error('请设置url.list属性!')
        return;
      }
      console.log("loadData Get");
      // 加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      const params = this.getQueryParams(); // 获取到queryParam和column的查询条件
      this.loading = true;
      console.log("params", params);
      getAction(this.url.list, params).then(res => {
        if (res.status === 200) {
          this.dataSource = res.data.content;
          if (res.data.totalElements) {
            this.ipagination.total = res.data.totalElements;
            this.ipagination.pageCount = res.data.totalPages;
          } else {
            this.ipagination.total = 0;
            this.ipagination.pageCount = 1;
          }
        } else {
          this.$message.warning(res.message);
        }
        this.loading = false;
      });
    },
    loadPostData(arg) {
      // 加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1;
      }
      const params = this.getQueryParams(); // 获取到queryParam和column的查询条件
      this.loading = true;
      postAction(this.url.list, params).then(res => {
        if (res.message) {
          this.$message.warning(res.message);
        } else {
          this.dataSource = res.content;
          if (res.totalElements) {
            this.ipagination.total = res.totalElements;
          } else {
            this.ipagination.total = 0;
          }
        }
        this.loading = false;
      });
    },

    initDictConfig() {
      // console.log("--这是一个假的方法!")
    },
    // 查询
    searchQuery() {
      this.loadData(1);
    },
    // 重置
    searchReset() {
      this.queryParam = {};
      this.loadData(1);
    },
    // 获取查询条件
    getQueryParams() {
      let param = {};
      param.page = this.ipagination.current;
      param.size = this.ipagination.pageSize;
      // param.pageSize = PAGES;
      param = Object.assign({}, param, this.queryParam);
      return filterObj(param);
    },
    // 按钮 删除
    handleDelete: function(id) {
      var that = this;
      deleteAction(that.url.delete).then(res => {
        if (res.status === 204) {
          that.loadData();
          this.$message.success("删除成功");
        } else {
          that.$message.warning("删除失败");
        }
      });
    },
    // 按钮 编辑
    handleEdit: function(record) {
      this.$refs.modalForm.edit(record);
      this.$refs.modalForm.title = "编辑";
    },
    // 按钮 新增
    handleAdd: function() {
      this.$refs.modalForm.add();
      this.$refs.modalForm.title = "新增";
    },
    // 页码变化
    handlePag(isPageChange, page) {
      if (isPageChange) {
        this.ipagination.current = page;
      } else {
        this.ipagination.pageSize = page;
      }
      this.loadData();
    },
    getCurrentSelect(row) {}
  }
};
