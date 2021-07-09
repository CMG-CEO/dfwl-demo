<template>
  <el-dialog
    :title="title"
    width="1000px"
    :visible.sync="showFlag"
    @open="open"
  >
    <el-container style="height: 413px; border: 1px solid #eee">
      <el-aside
        width="200px;"
        style="padding: 5px; border-right: 1px solid #eee"
      >
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="应用类型" prop="appType">
            <el-select
              v-model="form.appType"
              placeholder="请选择应用类型"
              width="100px"
              clearable
              filterable
              @change="getAppTypeValue(form.appType, appPage, appColumns)"
            >
              <el-option
                v-for="(item, index) in appTypeList"
                :key="index"
                :label="item.appTypeName"
                :value="item.appType"
                >{{ item.appTypeName }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="应用页面" prop="appPage">
            <el-select
              v-model="form.appPage"
              placeholder="请选择应用页面"
              clearable
              filterable
              @change="getAppPageValue(appType, form.appPage, appColumns)"
            >
              <el-option
                v-for="(item, index) in appPageList"
                :key="index"
                :label="item.appPageName"
                :value="item.appPage"
                >{{ item.appPageName }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="栏目类型" prop="columnsType">
            <el-select
              v-model="form.columnsType"
              placeholder="请选择应用页面"
              clearable
              filterable
              @change="getColumnsValue(appType, appPage, form.columnsType)"
            >
              <el-option
                v-for="(item, index) in columnsList"
                :key="index"
                :label="item.columnsTypeName"
                :value="item.columnsType"
                >{{ item.columnsTypeName }}</el-option
              >
            </el-select>
          </el-form-item>
          <h3>栏目</h3>
          <el-radio-group v-model="form.radio">
            <el-radio
              v-for="item in radioDataList"
              :key="item.appColumnsId"
              :label="item.appColumnsId"
              @change="getRadioVal(item.appColumnsId)"
              >{{ item.columnsName }}</el-radio
            >
          </el-radio-group>
          <div v-if="radioDataList.length <= 0" style="text-align: center">
            暂无数据
          </div>
        </el-form>
      </el-aside>
      <el-container style="padding: 5px">
        <el-table :data="radioDetailsList" border height="400">
          <el-table-column
            fixed
            prop="objectName"
            label="关联对象名称"
            width="400"
          >
          </el-table-column>
          <el-table-column prop="indexNo" label="顺序" width="150">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="delClick(scope.row)" type="text" size="small"
                >移除</el-button
              >
              <el-button type="text" @click="getIndexNo(scope.row)" size="small"
                >顺序</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-container>
    </el-container>
    <!-- 分页 -->
    <Pagination
      :page-no="page.pageNo"
      :page-size="page.pageSize"
      :total-count="page.totalCount"
      @currentChange="currentPageChange"
      @sizeChange="currentSizeChange"
    />
    <EditInfo :setSelectId="setSelectId" @reload="getList()"></EditInfo>
    <el-dialog
      title="顺序"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
    >
      <el-input v-model="getInputInfo" placeholder="请输入顺序"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getInputInfoClick">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import PaginationMixin from "@/mixin/pagination";
import {
  saveColumns,
  addColumns,
  getColumnsInfoListAll,
  getQueryInfoList,
  delColumnsDetail,
  seveColumnsIndexNo,
} from "@/api/columnInfoManage";
import { createRequiredRules, requestList } from "@/util";
import { getCommuneId, getUserId } from "@/util/auth";
import { querySelect } from "@/api/testManagement";
import EditInfo from "@/views/frontDeskManagement/columnInfoManage/dialog/EditInfo";
export default {
  components: { EditInfo },
  mixins: [PaginationMixin],
  props: {
    isCreate: {
      // 类型: true 新建 false 编辑
      type: Boolean,
      required: true,
    },
    editappColumnsId: {
      // 传入的id
      type: [Number, String],
    },
    appTypeId: {
      // 传入的应用类型
      type: [Number, String],
    },
    appPageId: {
      // 传入的页面类型
      type: [Number, String],
    },
    appColumnsId: {
      // 传入栏目用类型
      type: [Number, String],
    },
  },
  data() {
    return {
      showFlag: false,
      form: {},
      appTypeList: [],
      appPageList: [],
      objectTypeList: [],
      styleTypeList: [],
      radioDataList: [],
      radioDetailsList: [],
      splicingRadioList: [],
      setSelectId: "",
      getInputInfo: "",
      dialogVisible: false,
      getIndexNoObj: {},
      columnsList: [],
      appColumnsList: [],
      appType: "",
      appPage: "",
      appColumns: "",
      rules: createRequiredRules(
        [
          "indexNo",
          "columnsName",
          "appType",
          "appPage",
          "columnsValue",
          "objectType",
          "recordNumber",
          "remark",
          "styleType",
        ],
        [
          "顺序",
          "栏目名称",
          "应用类型",
          "页面",
          "栏目值",
          "对象类型名称",
          "显示记录数",
          "备注",
          "显示类型",
        ]
      ),
    };
  },
  computed: {
    title() {
      return this.isCreate ? "新建" : "编辑";
    },
  },
  methods: {
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isCreate) {
            this.form.accountId = getCommuneId();
            this.form.createUser = getUserId();
            this.form.createTime = new Date();
            await addColumns(this.form);
            this.$message.success("新增成功");
          } else {
            await saveColumns(this.form);
            this.$message.success("保存成功");
          }
          this.showFlag = false;
          this.$emit("reload");
        }
      });
    },

    async open() {
      this.form = {};
      this.$refs.form && this.$refs.form.resetFields();
      // 请求数据字典
      let { data } = await querySelect({
        dictCodes:
          "app_type,app_page,cdm_app_columns_object_type,style_type,columns_type",
      });
      // 按需增加字段
      this.appTypeList = data.app_type;
      for (let i = 0; i < this.appTypeList.length; i++) {
        this.appTypeList[i].appType = this.appTypeList[i].itemCode;
        this.appTypeList[i].appTypeName = this.appTypeList[i].itemName;
      }
      this.appPageList = data.app_page;
      for (let j = 0; j < this.appPageList.length; j++) {
        this.appPageList[j].appPage = this.appPageList[j].itemCode;
        this.appPageList[j].appPageName = this.appPageList[j].itemName;
      }
      this.columnsList = data.columns_type;
      for (let j = 0; j < this.columnsList.length; j++) {
        this.columnsList[j].columnsType = this.columnsList[j].itemCode;
        this.columnsList[j].columnsTypeName = this.columnsList[j].itemName;
      }
      const radiodatalists = await getColumnsInfoListAll();
      this.radioDataList = radiodatalists.data.data;
      this.splicingRadioList = radiodatalists.data.data;
      this.getRadioVal(this.editappColumnsId);
      if (!this.isCreate) {
        this.form.radio = this.editappColumnsId
        this.form.appType = this.appTypeId
        this.form.appPage = this.appPageId
        this.form.columnsType = this.appColumnsId
        this.getFilterData(this.appTypeId, this.appPageId, this.appColumnsId)
      }
    },
    // 获取顺序
    getIndexNo(val) {
      this.dialogVisible = true;
      this.getIndexNoObj = val;
    },
    async getInputInfoClick() {
      this.dialogVisible = false;
      this.getIndexNoObj.indexNo = this.getInputInfo;
      await seveColumnsIndexNo(this.getIndexNoObj);
      this.getInputInfo = "";
      this.getList();
    },
    // 获取当前选中的单选框
    async getRadioVal(val) {
      this.setSelectId = val;
      val != undefined ? this.getList() : "";
    },
    async getList() {
      const params = {
        appColumnsId: this.setSelectId || this.editappColumnsId,
      };
      const data = await requestList(getQueryInfoList, params, this.page);
      this.radioDetailsList = data.data.records;
      if (data) {
        let pageData = {};
        pageData.pageNo = data.data.current;
        pageData.pageSize = data.data.size;
        pageData.totalCount = data.data.total;
        this.page = pageData;
      }
    },
    getFilterData(appType, appPage, appColumns) {
      this.appFilterDataList = [];
      const appDataList = this.splicingRadioList;
      const appTypeList = [];
      const appPageList = [];
      const appColumnsList = [];
      const appTypeOrAppPage = [];
      const appTypeOrAppColumns = [];
      const appPageOrAppColumns = [];
      const appTypeOrappPageOrAppColumns = [];
      if (appType != "" && appPage != "" && appColumns != "") {
        for (let i = 0; i < appDataList.length; i++) {
          if (
            appDataList[i].appType == appType &&
            appDataList[i].appPage == appPage &&
            appDataList[i].columnsType == appColumns
          )
            appTypeOrappPageOrAppColumns.push(appDataList[i]);
        }
      } else if (
        (appType !== "" && appPage != "") ||
        (appType != "" && appColumns != "") ||
        (appPage != "" && appColumns != "")
      ) {
        if (appType !== "" && appPage != "") {
          for (let i = 0; i < appDataList.length; i++) {
            if (
              appDataList[i].appType == appType &&
              appDataList[i].appPage == appPage
            )
              appTypeOrAppPage.push(appDataList[i]);
          }
        } else if (appType != "" && appColumns != "") {
          for (let i = 0; i < appDataList.length; i++) {
            if (
              appDataList[i].appType == appType &&
              appDataList[i].columnsType == appColumns
            )
              appTypeOrAppColumns.push(appDataList[i]);
          }
        } else if (appPage != "" && appColumns != "") {
          for (let i = 0; i < appDataList.length; i++) {
            if (
              appDataList[i].appPage == appPage &&
              appDataList[i].columnsType == appColumns
            )
              appPageOrAppColumns.push(appDataList[i]);
          }
        }
      } else if (appType !== "") {
        for (let i = 0; i < appDataList.length; i++) {
          if (appDataList[i].appType == appType)
            appTypeList.push(appDataList[i]);
        }
      } else if (appPage !== "") {
        for (let i = 0; i < appDataList.length; i++) {
          if (appDataList[i].appPage == appPage)
            appPageList.push(appDataList[i]);
        }
      } else if (appColumns !== "") {
        for (let i = 0; i < appDataList.length; i++) {
          if (appDataList[i].columnsType == appColumns)
            appColumnsList.push(appDataList[i]);
        }
      }

      // push数据
      if (appType != "" && appPage != "" && appColumns != "") {
        this.radioDataList = appTypeOrappPageOrAppColumns;
      } else if (
        (appType !== "" && appPage != "") ||
        (appType != "" && appColumns != "") ||
        (appPage != "" && appColumns != "")
      ) {
        if (appType !== "" && appPage != "") {
          this.radioDataList = appTypeOrAppPage;
        } else if (appType != "" && appColumns != "") {
          this.radioDataList = appTypeOrAppColumns;
        } else if (appPage != "" && appColumns != "") {
          this.radioDataList = appPageOrAppColumns;
        }
      } else if (appType !== "") {
        this.radioDataList = appTypeList;
      } else if (appPage !== "") {
        this.radioDataList = appPageList;
      } else if (appColumns !== "") {
        this.radioDataList = appColumnsList;
      }
      const appColumnsIds = [];
      for (let i = 0; i < this.radioDataList.length; i++) {
        appColumnsIds.push(this.radioDataList[i].appColumnsId);
      }
      if (appColumnsIds.indexOf(this.setSelectId) != -1) {
        this.getSearch(this.setSelectId);
      } else {
        this.getSearch("00001");
      }
    },
    async getSearch(val) {
      const params = {
        appColumnsId: val,
      };
      const data = await requestList(getQueryInfoList, params, this.page);
      this.radioDetailsList = data.data.records;
      if (data) {
        let pageData = {};
        pageData.pageNo = data.data.current;
        pageData.pageSize = data.data.size;
        pageData.totalCount = data.data.total;
        this.page = pageData;
      }
    },
    // 应用类型值
    getAppTypeValue(appType, appPage, appColumns) {
      this.appType = appType;
      this.appPage = appPage;
      this.appColumns = appColumns;
      this.getFilterData(this.appType, this.appPage, this.appColumns);
    },
    // 应用页面
    getAppPageValue(appType, appPage, appColumns) {
      this.appType = appType;
      this.appPage = appPage;
      this.appColumns = appColumns;
      this.getFilterData(this.appType, appPage, this.appColumns);
    },
    // 栏目类型
    getColumnsValue(appType, appPage, appColumns) {
      this.appType = appType;
      this.appPage = appPage;
      this.appColumns = appColumns;
      this.getFilterData(this.appType, this.appPage, appColumns);
    },
    // 移除
    async delClick(val) {
      this.$confirm("确定移除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await delColumnsDetail(val.columnsDetailId);
          this.$message.success("移除成功");
          this.getList();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="stylus" scoped>
.textareaSty {
  /deep/.el-textarea__inner {
    width: 860px;
    height: 100px;
    display: inline-block;
  }
}

/deep/.el-radio-group {
  border: 1px solid #DCDFE6;
  width: 100%;
  border-bottom: none;
}

/deep/.el-radio {
  display: block;
  line-height: 40px;
  border-bottom: 1px solid #DCDFE6;
  padding: 0 20px;
  margin: 0;
}
</style>
