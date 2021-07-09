<template>
  <div>
    <queryModule
      :formArray="formArray"
      :queryButtonGroup="queryButtonGroup"
      @moduleQuery="moduleQuery"
      @clear="clear"
      @typeName="methods"
    ></queryModule>
    <section class="panel">
      <div>
        <el-button type="primary" @click="create">新增试题</el-button>
        <el-button type="primary" @click="createDataQuestion"
          >新增资料题</el-button
        >
        <el-button type="primary" @click="create">导入试题</el-button>
        <el-button type="primary" @click="create">导入试卷</el-button>
        <tableCommon
          :tableColumn="tableColumn"
          @methods="methods"
          :content="content"
          :tableData="tableData"
        ></tableCommon>
      </div>
      <Pagination
        :page-no="page.pageNo"
        :page-size="page.pageSize"
        :total-count="page.totalCount"
        @currentChange="currentPageChange"
        @sizeChange="currentSizeChange"
      />
      <Edit
        ref="Edit"
        :isCreate="isCreate"
        :type="CommodityManageType.ORDER_Manage"
        @reload="getList()"
        :view.sync="view"
        @methods="methods"
        :editForm="editForm"
        :dataQuestion.sync="dataQuestion"
        :formArrayParents="formArray"
        :currentSelect="currentSelect"
        :changeGroup="changeGroup"
      ></Edit>
    </section>
  </div>
</template>
<script>
import queryModule from "@/views/orderManagement/orderCommon/queryModule";
import tableCommon from "@/views/orderManagement/orderCommon/tableCommon";
import { getModuleList } from "@/api/moduleManage";
import PaginationMixin from "@/mixin/pagination";
import { getSubjectList } from "@/api/subjectManage";
import Edit from "./testCommon/Edit";
import { CommodityManageType } from "@/util/constant";

import {
  querySelect,
  getTestList,
  dataKnowledgeSelect,
  editTest,
  deleteTest
} from "@/api/testManagement";
import { requestList } from "@/util";
import { formatShelfStatus, formatTableTime } from "@/util/format";

export default {
  components: {
    queryModule,
    tableCommon,
    Edit
  },
  mixins: [PaginationMixin],
  mounted() {
    this.subjectId();
  },
  created() {
    this.getList();
    this.querySelect();
    this.moduleList();
  },

  methods: {
    async subjectId() {
      const data = await getSubjectList({ size: 1000 });

      this.formArray[3].content = data.data.content.map(item => {
        item.label = item.subjectName;
        item.value = item.subjectId;
        return item;
      });
    },
    async moduleList() {
      const data = await getModuleList({ size: 1000 });
      this.formArray[4].content = data.data.content.map(item => {
        item.label = item.moduleName;
        item.value = item.moduleId;
        return item;
      });
    },
    async querySelect() {
      let { data } = await querySelect({
        dictCodes: "difficult_level,question_type,exercise_type,status"
      });

      this.formArray.forEach(item => {
        if (item.prop2 && data[item.prop2]) {
          data[item.prop2].forEach(item2 => {
            item2.label = item2.itemName;
            item2.value = item2.itemCode;
          });
          item.content = data[item.prop2];
        }
        if (item.level) {
          dataKnowledgeSelect({
            level: item.level
          }).then(data => {
            data.data.forEach(item2 => {
              item2.label = item2.knowledgeName;
              item2.value = item2.knowledgeId;
            });
            item.content = data.data;
          });
        }
      });
    },

    clear() {
      this.resetSearch();
    },
    moduleQuery(ruleForm) {
      this.searchData = ruleForm;
      this.search();
    },

    async getList(params = this.searchData) {
      const data = await requestList(getTestList, params, this.page);
      let { pages, size, total, current } = data.data;
      const actions = new Map([
        ["payStatus", "payChangeStatus"],
        ["orderStatus", "orderChangeStatus"],
        ["logisticsStatus", "logisticsStatusChangeStatus"],
        ["orderSource", "orderResourceChangeStatus"]
      ]);
      //   this.tableDataOriginal = [...data.content];
      this.tableData = data.data.records.map(item => {
        item.content = this.delHtmlTag(item.content)
        console.log(item.content)
        item.shelfStatusName = formatShelfStatus(item.shelfStatus);
        this.changeGroup.forEach(item2 => {
          this.typeChange(item[item2], item2, item);
        });

        // ["payStatus", "orderStatus", "logisticsStatus", "orderSource"].forEach(
        //   item2 => {
        //     let action = actions.get(item[item2]);
        //     console.log(action);
        //   }
        // );

        item.orderTime = item.orderTime
          ? formatTableTime(item.orderTime)
          : formatTableTime(item.createTime);
        return item;
      });
      this.page = { pageNo: current, pageSize: size, totalCount: total };
    },
    typeChange(val, type, chooseItem) {
      this.formArray.forEach(item => {
        if (val && item.prop == type) {
          item.content.forEach(item3 => {
            if (val == item3.value) {
              chooseItem[type] = item3.label;
            }
          });
        }
      });
    },
    async edit() {
      let { questionId } = this.currentItem;
      this.isCreate = false;

      let data = await editTest({
        questionId
      });
      this.editForm = { ...data.data };
      if (this.editForm.questionType == "6") {
        this.dataQuestion = true;
      }
      this.$refs.Edit.showFlag = true;
    },
    create() {
      this.isCreate = true;
      this.dataQuestion = false;
      this.$refs.Edit.showFlag = true;
    },
    createDataQuestion() {
      this.isCreate = true;
      this.dataQuestion = true;
      this.$refs.Edit.showFlag = true;
    },
    async deleteTest(questionId) {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await deleteTest({ questionId });
          this.$message.success("删除成功");
          this.getList();
        })
        .catch(() => {});
    },
    methods(val) {
      this.currentItem = val.data;
      switch (val.name) {
        case "查询":
          this.moduleQuery(val.data);
          break;
        case "修改":
          this.currentItem = val.data;
          this.edit();
          break;
        case "删除":
          this.deleteTest(val.data.questionId);
          break;
        case "查看":
          this.view = true;
          this.currentItem = val.data;
          this.edit();
          break;
      }
    },
    // 去除富文本 HTML标签
    delHtmlTag(str) {
      if(str != null) {
        return str.replace(/<[^>]+>/g,"");
      }
    }
  },
  data() {
    return {
      //   tableDataOriginal: [], //原列表数据
      currentItem: {},
      dataQuestion: false,
      isCreate: false,
      editForm: {},
      CommodityManageType,
      tableData: [],
      currentSelect: {},
      view: false,
      changeGroup: [
        "questionType",
        "firstKnowledgeId",
        "moduleId",
        "subjectId",
        "status"
      ],

      //   successfulTransactioncontent: [{ name: "退款" }],
      //   successfulTransactioncontent: [{ name: "地址" }],
      formArray: [
        { label: "考试项目", prop: "projectId", type: "input" },
        {
          label: "题目内容",
          prop: "content",
          type: "input"
        },
        {
          label: "难度",
          prop: "difficultLevel",
          type: "select",
          prop2: "difficult_level",
          content: []
        },
        {
          label: "科目",
          prop: "subjectId",
          type: "select",
          prop2: "",
          content: []
        },
        // { label: "客户账号", prop: "ddh", type: "input" },
        {
          label: "模块",
          prop: "moduleId",
          type: "select",
          prop2: "",
          content: []
        },
        {
          label: "状态",
          prop: "status",
          type: "select",
          prop2: "status",
          content: []
        },
        {
          label: "试题类型",
          prop: "questionType",
          type: "select",
          prop2: "question_type",

          content: []
        },
        {
          label: "题型",
          prop: "firstKnowledgeId",
          type: "select",
          prop2: "",
          content: [],
          level: 1
        },
        {
          label: "一级知识点",
          prop: "secondKnowledgeId",
          type: "select",
          prop2: "",
          content: [],
          level: 2
        },
        {
          label: "二级知识点",
          prop: "secondKnowledgeId",
          prop2: "",
          type: "select",
          content: [],
          level: 3
        }
      ],
      queryButtonGroup: ["查询", "重置", "导出"],
      tableColumn: [
        { label: "题目", prop: "content", width: 200 },
        { label: "类型", prop: "questionType" },
        { label: "题型", prop: "firstKnowledgeId", width: 200 },
        { label: "模块", prop: "moduleId" },

        // { label: "商品名称", prop: "ddh" },
        { label: "科目", prop: "subjectId" },
        // { label: "客户账号", prop: "ddh" },
        { label: "正确率", prop: "correctRate" },
        { label: "状态", prop: "status" }

        // { label: "备注", prop: "ddh" },
        // { label: "收货地址", prop: "ddh" },
      ],
      content: [{ name: "修改" }, { name: "删除" }, { name: "查看" }]
    };
  }
};
</script>
