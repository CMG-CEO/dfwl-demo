<template>
  <div>
    <el-button
      style="margin: 30px 0"
      size="mini"
      type="primary"
      @click="showFlag = true"
      >添加</el-button
    >
    <!-- 资源弹窗 -->
    <el-dialog
      title="选择资源"
      :visible.sync="showFlag"
      @open="open"
      append-to-body
    >
      <!-- 文件查询 -->
      <el-form
        ref="form"
        v-if="type === 'testFile'"
        :model="searchData"
        label-width="50px"
      >
        <el-form-item label="分类">
          <el-select
            v-model="searchData.catalogId"
            placeholder="请选择分类"
            clearable
          >
            <el-option
              v-for="item in typeList"
              :key="item.catalogId"
              :label="item.catalogName"
              :value="item.catalogId"
              >{{ item.catalogName }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input
            v-model="searchData.resourceName"
            placeholder="请输入名称"
            clearable
          ></el-input>
          <el-button type="primary" size="mini" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
      <!-- 试卷查询 -->
      <el-form
        v-if="type === 'testPaper'"
        ref="form"
        :model="form"
        label-width="100px"
      >
        <el-form-item label="考试项目">
          <el-input
            @focus="getProject"
            placeholder="请输入试卷名称"
            :value="form.projectName"
            clearable
            @clear="clearableClick"
          ></el-input>
          <ProjectTreeDialog
            ref="ProjectTreeDialog"
            @nodeClick="nodeClick"
          ></ProjectTreeDialog>
        </el-form-item>
        <el-form-item label="试卷名称">
          <el-input
            placeholder="请输入试卷名称"
            v-model="paperSearchData"
            @change="getPaperSearchData"
            clearable
          ></el-input>
          <el-button type="primary" size="mini" @click="paperSearch"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 试卷表格 -->
      <el-table
        v-if="type === 'testPaper'"
        class="table"
        :data="typeListPage"
        height="400"
        border
        @select="selectStatus"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="试卷名称" width="350">
          <template slot-scope="scope">
            <div class="image-wrap">
              <div class="image-info">
                <div>{{ scope.row.examName }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="考试时长">
          <template slot-scope="scope">
            <div class="image-wrap">
              <div class="image-info">
                <div>{{ scope.row.examLength }}分钟</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="难度系数" width="220">
          <template slot-scope="scope">
            <div class="image-wrap">
              <div class="image-info">
                <div>{{ scope.row.difficultyCoefficient }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 文件表格 -->
      <el-table
        v-if="type === 'testFile'"
        class="table"
        :data="tableData"
        height="400"
        border
        @select="selectStatus"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="文件名称" width="450">
          <template slot-scope="scope">
            <div class="image-wrap">
              <div class="image-info">
                <div>{{ scope.row.resourceName }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="uploadTime"
          label="上传时间"
          width="430"
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination
        :page-no="page.pageNo"
        :page-size="page.pageSize"
        :total-count="page.totalCount"
        @currentChange="currentPageChange"
        @sizeChange="currentSizeChange"
      />
      <el-form :rules="rules">
        <el-form-item prop="shelfType">
          <el-radio-group
            v-if="type === 'testPaper'"
            class="sheShelfType"
            v-model="shelfType"
          >
            <el-radio label="1">立即下发，随时做题 </el-radio>
            <el-radio label="2"
              >定时下发
              <el-form-item style="display: inline-block" prop="timeValue">
                <el-date-picker
                  v-model="timeValue"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-radio>
            <el-radio label="3">暂不下发</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button type="default" size="small" @click="showFlag = false"
          >取消</el-button
        >
        <el-button type="primary" size="small" @click="submit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCatalogList,
  getcourseSpecListPage,
  addsGsmGoodsExam,
  addsGsmGoodsFileList,
} from "@/api/itemManage";
import PaginationMixin from "@/mixin/pagination";
import { getEamCatalogResourcesList } from "@/api/eamCatalogResourcesManage";
import { checkIsVideoOrAudio, requestList, createRequiredRules } from "@/util";
import { getUserId, getCommuneId } from "@/util/auth";
import filsize from "filesize";
import { formatTableTime } from "@/util/format";
import mediaImage from "@/assets/imgs/media.jpg";
import ProjectTreeDialog from "@/views/commodityManage/bigColumnManage/dialog/ProjectTreeDialog";
export default {
  components: { ProjectTreeDialog },
  mixins: [PaginationMixin],
  props: {
    type: {
      type: String,
    },
    paperData: {
      type: Object,
    },
  },
  data() {
    const saleFlagValidator2 = (rule, value, callback) => {
      this.shelfType = "2";
      if (this.timeValue && new Date() > new Date(this.timeValue)) {
        callback(new Error("定时上架时间要大于等于当前时间"));
        return;
      }
      callback();
    };
    return {
      showFlag: false,
      form: {},
      typeList: [],
      tableData: [],
      shelfType: "3",
      timeValue: "",
      resourceType: "4",
      typeListPage: [],
      paperSearchData: "",
      getSelectList: [],
      rules: {
        ...createRequiredRules(["timeValue"], ["时间"]),
        timeValue: [{ validator: saleFlagValidator2, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 考试项目选择
    getProject() {
      this.$refs.ProjectTreeDialog.showFlag = true;
    },
    nodeClick(item) {
      this.form = { ...this.form, projectId: item.id, projectName: item.path };
    },
    getPaperSearchData() {
      this.form = { ...this.form, examName: this.paperSearchData };
    },
    clearableClick() {
      this.form.projectName = "";
      this.form.projectId = "";
    },
    // 获取文件列表
    async getList(params = this.searchData) {
      const { resourceType } = this;
      const data = await requestList(
        getEamCatalogResourcesList,
        { ...params, resourceType },
        this.page
      );
      this.tableData = data.content.map((item) => {
        item.filesize = filsize(item.size);
        item.uploadTimeFormat = formatTableTime(item.uploadTime);
        item.previewUrl = checkIsVideoOrAudio(item.resourceUrl)
          ? mediaImage
          : item.resourceUrl;
        return item;
      });
      this.page = data.page;
    },
    // 获取文件查询列表
    async getTypeList() {
      const { resourceType } = this;
      const data = await getCatalogList({ resourceType, page: 1, size: 10 });
      this.typeList = data.data.content;
    },
    // 获取试卷查询列表
    async getcourseSpecListPage() {
      const { examName } = this.form;
      const { projectId } = this.form;
      const data = await getcourseSpecListPage({
        examName,
        projectId,
        page: 1,
        size: 10,
      });
      this.typeListPage = data.data.data.records;
    },
    // 批量新增试卷
    async getAddsGsmGoodsExam() {
      const editData = this.getSelectList;
      for (var i = 0; i < editData.length; i++) {
        editData[i].status = this.shelfType;
        editData[i].answerTime = this.timeValue;
        editData[i].createUser = getUserId();
        editData[i].goodsId = this.paperData.goodsId;
        editData[i].accountId = getCommuneId();
        editData[i].fileName = editData[i].resourceName;
        editData[i].fileUrl = editData[i].catalogId;
      }
      const datas = {};
      datas.goodsId = this.paperData.goodsId;
      datas.goodsName = this.paperData.goodsName;
      datas.introduce = this.paperData.introduce;
      datas.price = this.paperData.price;
      // 判断 试卷/文件类型
      if (this.type === "testPaper") {
        // 试卷
        datas.gsmGoodsExamDetailAddVos = this.getSelectList;
        await addsGsmGoodsExam(datas);
      } else if (this.type === "testFile") {
        // 文件
        for (let i = 0; i < this.getSelectList.length; i++) {
          this.getSelectList[i].fileUrl = this.getSelectList[i].previewUrl;
        }
        datas.gsmGoodsFileDetailAddVos = this.getSelectList;
        await addsGsmGoodsFileList(datas);
      }
      this.showFlag = false;
      this.$emit("endfile");
    },

    async open() {
      this.form = {};
      if (this.type === "testPaper") {
        this.getcourseSpecListPage();
      } else {
        this.getTypeList();
        this.getList();
      }
    },
    // 搜索
    paperSearch() {
      this.getcourseSpecListPage();
    },
    // 获取选中状态
    selectStatus(rows) {
      this.getSelectList = rows;
    },
    submit() {
      // 点击确定把值重新渲染传入
      this.getAddsGsmGoodsExam();
    },
  },
};
</script>

<style lang="stylus" scoped>
.sheShelfType {
  width: 100%;
  height: 160px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 160px;
}
</style>
