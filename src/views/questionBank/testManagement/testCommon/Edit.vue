<template>
  <el-dialog
    :title="title"
    width="1500px"
    :visible.sync="showFlag"
    @open="open"
    class="edit"
  >
    <DetailAdd
      ref="DetailAdd"
      :type="CommodityManageType.VIDEO_MANAGE"
      @getSelectList="getSelectList"
    ></DetailAdd>
    <commonTree
      :treeData="treeData"
      ref="commonTree"
      @nodeClick="nodeClick"
    ></commonTree>
    <el-form ref="form" :model="form" label-width="100px">
      <div v-for="(item, index) in formArray2" :key="item.title + index">
        <div class="typeResource">
          <h3>{{ item.title }}</h3>
          <el-button
            type="primary"
            icon="el-icon-plus"
            circle
            v-if="item.title == '考试类型' || item.title == '题源'"
            @click="typeResource(item.title)"
          ></el-button>
        </div>

        <div class="demo-ruleForm" v-if="item.title == '基本信息'">
          <el-form-item
            :label="item2.type !== 'radio' ? item2.label : ''"
            :prop="item2.prop"
            v-for="(item2, index2) in item.content"
            :key="item2.label + index2"
            :class="[
              item2.type !== 'editor' &&
              item2.type !== 'textarea' &&
              item2.type !== 'moreRdaio'
                ? 'commmonItem'
                : 'moreItem'
            ]"
            :style="[{ width: item2.type == 'video' ? '800px' : '' }]"
          >
            <el-input
              v-model="form[item2.prop]"
              :placeholder="`请输入${item2.label}`"
              v-if="item2.type == 'text' || item2.type == 'textarea'"
              :type="item2.type"
            ></el-input>
            <div v-else-if="item2.type == 'moreRdaio'">
              <div class="moreRdaioGroup">
                <div
                  v-for="(item4, index4) in form.qwmQuestionOptions"
                  :key="item4.isAnswer + index4"
                  class="moreRdaio"
                >
                  {{ wordArr[index4] }}
                  <el-checkbox
                    v-model="item4.isAnswer"
                    true-label="1"
                    false-label="0"
                  ></el-checkbox>
                  <quill-editor
                    v-model="item4.optionsValue"
                    class="quillEditor"
                    style="width:980px"
                  ></quill-editor>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    class="deleteButton"
                    circle
                    @click="deleteGroup(form.qwmQuestionOptions, index4)"
                  ></el-button>
                </div>
              </div>

              <el-button type="primary" @click="addRdaio" class="addButton"
                >增加选项</el-button
              >
            </div>
            <el-checkbox
              v-else-if="item2.type == 'radio'"
              v-model="form[item2.prop]"
              true-label="1"
              false-label="0"
              >{{ item2.label }}</el-checkbox
            >
            <div v-else-if="item2.type == 'video'">
              {{ form[item2.prop] }}
              <el-button type="primary" @click="addVideo">选择视频</el-button>
            </div>

            <el-select
              v-model="form[item2.prop]"
              placeholder="请选择"
              v-else-if="item2.type == 'select'"
            >
              <el-option
                v-for="item in item2.content"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <quill-editor
              v-else-if="item2.type == 'editor'"
              v-model="form[item2.prop]"
              class="quillEditor"
            ></quill-editor>
            <el-date-picker
              v-else-if="item2.type == 'date'"
              v-model="form[item2.prop]"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div v-else-if="item.title == '资料内容'">
          <div class="moreRdaioGroup">
            <quill-editor
              v-model="form[item.prop]"
              class="quillEditor"
              style="width:1230px"
            ></quill-editor>
          </div>
        </div>
        <div v-else-if="item.title == '考试类型'">
          <div
            v-for="(item5, index5) in new Set(form.qwmQuestionProjects)"
            :key="item5 + index5"
          >
            {{ item5.path || item5.projectId }}
            <el-button
              type="danger"
              icon="el-icon-delete"
              class="deleteButton"
              circle
              @click="deleteGroup(form.qwmQuestionProjects, index5)"
            ></el-button>
          </div>
        </div>
        <div v-else-if="item.title == '题源'">
          <section
            v-for="(item6, index6) in form.qwmQuestionSources"
            :key="item6 + index6"
            class="typeResource"
          >
            <el-form-item
              :label="item7.label"
              :prop="item7.prop"
              v-for="(item7, index7) in item.content"
              :key="item7.label + index7"
              :class="[
                item7.type !== 'editor' &&
                item7.type !== 'textarea' &&
                item7.type !== 'moreRdaio'
                  ? 'commmonItem'
                  : 'moreItem'
              ]"
            >
              <el-input
                v-model="item6[item7.prop]"
                :placeholder="`请输入${item7.label}`"
                v-if="item7.type == 'text' || item7.type == 'textarea'"
                :type="item7.type"
              ></el-input>
            </el-form-item>
            <el-button
              type="danger"
              icon="el-icon-delete"
              class="deleteButton"
              circle
              style="position: relative;
    bottom: 13px;"
              @click="deleteGroup(form.qwmQuestionSources, index7)"
            ></el-button>
          </section>
        </div>
        <div v-else-if="!item.title">
          <div class="buttonArray">
            <el-button type="primary" @click="save">保存资料</el-button>
            <el-form-item
              label="综合正确率"
              :prop="form.correctRate"
              class="commmonItem"
              style="position: relative;top: 10px;left: 317px;"
            >
              <el-input
                v-model="form.correctRate"
                placeholder="请输入综合正确率"
              ></el-input>
            </el-form-item>
          </div>
          <el-button type="primary" @click="creatTest" :disabled="!parentsId"
            >新增试题</el-button
          >
          <tableCommon
            :tableColumn="tableColumn"
            @methods="methods"
            :content="content"
            :tableData="tableData"
          ></tableCommon>
          <Pagination
            :page-no="page.pageNo"
            :page-size="page.pageSize"
            :total-count="page.totalCount"
            @currentChange="currentPageChange"
            @sizeChange="currentSizeChange"
          />
        </div>
      </div>
    </el-form>

    <div class="buttonArray" v-if="!view">
      <el-button type="primary" @click="review" v-if="!isCreate"
        >审核</el-button
      >
      <el-button type="primary" @click="voidTest" v-if="isCreate"
        >作废</el-button
      >
      <el-button
        type="primary"
        @click="save"
        v-if="!dataQuestion || (dataQuestion && creatTestLog)"
        >保存</el-button
      >

      <el-button type="primary" @click="back">返回</el-button>
    </div>
  </el-dialog>
</template>
<script>
import DetailAdd from "@/views/commodityManage/bigColumnManage/dialog/DetailAdd";
import commonTree from "./commonTree";
import tableCommon from "@/views/orderManagement/orderCommon/tableCommon";
import { CommodityManageType } from "@/util/constant";
import { getProjectTree } from "@/api/projectManage";
import { formArray } from "./commonData";
import { addTest, saveTest, reviewTest, voidTest } from "@/api/testManagement";
import PaginationMixin from "@/mixin/pagination";

import {
  querySelect,
  getTestList,
  dataKnowledgeSelect,
  editTest,
  deleteTest
} from "@/api/testManagement";
import { requestList } from "@/util";
export default {
  components: { DetailAdd, commonTree, tableCommon },
  mixins: [PaginationMixin],
  props: {
    formArrayParents: { type: Array },
    changeGroup: {},
    dataQuestion: { type: Boolean },
    view: { type: Boolean },
    editForm: {},
    currentSelect: {},
    isCreate: {
      // 类型: true 新建 false 编辑
      type: Boolean,
      required: true
    },
    type: {
      // 该组件是从哪个页面调用的，值为 CommodityManageType 枚举中的一个
      type: String,
      required: true
    }
  },
  watch: {
    showFlag(newVal, oldVal) {
      if (newVal == false) {
        this.$emit("update:view", false);
        this.$emit("update:dataQuestion", false);
      }
    }
  },
  data() {
    return {
      CommodityManageType,
      showFlag: false,
      treeData: {},
      tableData: [],
      formArray2: [],
      topicSource: [],

      wordArr: [],
      moreRdaioGroup: [{ isAnswer: "", optionsValue: "", optionsName: "" }],
      form: { video: "", qwmQuestionProjects: [] },
      linkSaleList: [],
      testTypes: [],
      tableColumn: [
        { label: "题目", prop: "content", width: 200 },
        { label: "类型", prop: "questionType" },
        { label: "参考答案", prop: "referenceAnswer", width: 200 },
        { label: "全站正确率", prop: "correctRate" },

        { label: "科目", prop: "subjectId" },

        { label: "正确率", prop: "correctRate" },
        { label: "状态", prop: "status" }
      ],
      content: [{ name: "修改" }, { name: "删除" }, { name: "查看" }],
      formArray,
      parentsId: "",
      creatTestLog: false
    };
  },
  computed: {
    title() {
      return this.isCreate ? "新建" : this.view ? "查看" : "编辑";
    }
  },
  mounted() {
    for (var i = 65; i < 90; i++) {
      this.wordArr.push(String.fromCharCode(i));
    }
  },
  methods: {
    async voidTest() {
      await voidTest({ ...this.form });
      this.$message.success("作废成功");
    },
    async review() {
      await reviewTest({ ...this.form });
      this.$message.success("审核成功");
    },
    nodeClick(val) {
      console.log(val);
      console.log(this.form.qwmQuestionProjects);
      this.testTypes.push(val);
      this.form.qwmQuestionProjects.push({ projectId: val.id, path: val.path });
    },
    typeChange(val, type, chooseItem) {
      this.formArray.forEach(item => {
        if (val && item.prop == type) {
          //   console.log(type);
          //   console.log(val);
          //   console.log(item);
          item.content.forEach(item3 => {
            if (val == item3.value) {
              //   console.log(item3);
              chooseItem[type] = item3.label;
            }
          });
        }
      });
    },
    async getList() {
      const data = await requestList(
        getTestList,
        { parentQuestionId: this.parentsId },
        this.page
      );
      console.log(data);
      let { pages, size, total, current } = data.data;
      const actions = new Map([
        ["payStatus", "payChangeStatus"],
        ["orderStatus", "orderChangeStatus"],
        ["logisticsStatus", "logisticsStatusChangeStatus"],
        ["orderSource", "orderResourceChangeStatus"]
      ]);
      //   this.tableDataOriginal = [...data.content];
      this.tableData = data.data.records.map(item => {
        // item.shelfStatusName = formatShelfStatus(item.shelfStatus);

        this.changeGroup.forEach(item2 => {
          this.typeChange(item[item2], item2, item);
        });

        // ["payStatus", "orderStatus", "logisticsStatus", "orderSource"].forEach(
        //   item2 => {
        //     let action = actions.get(item[item2]);
        //     console.log(action);
        //   }
        // );

        // item.orderTime = item.orderTime
        //   ? formatTableTime(item.orderTime)
        //   : formatTableTime(item.createTime);
        return item;
      });
      console.log(this.tableData);
      this.page = { pageNo: current, pageSize: size, totalCount: total };
    },
    methods() {},
    topicSourceAdd() {
      this.form.qwmQuestionSources.push({
        examName: "",
        examYear: "",
        provinceName: "",
        cityName: ""
      });
    },
    typeResource(name) {
      switch (name) {
        case "考试类型":
          this.testType();
          break;
        case "题源":
          this.topicSourceAdd();
          break;
      }
    },
    async edit() {
      let data = await editTest({
        questionId: this.parentsId
      });
      this.form = { ...data.data };
      console.log(this.form);
      this.$refs.Edit.showFlag = true;
    },
    async testType() {
      const res = await getProjectTree({ projectId: 0 });
      this.treeData = res.data;
      this.$refs.commonTree.showFlag = true;
    },
    async getSelectList({ selectList, teacherId }) {
      this.form.videoUrl = selectList[0].resourceUrl;
      this.form = { ...this.form };
      console.log(this.form);
      // console.log(teacherId);
    },
    deleteGroup(data, index) {
      data.splice(index, 1);
    },
    back() {
      this.showFlag = false;
    },
    async save() {
      if (this.isCreate) {
        this.form.qwmQuestionOptions.forEach((item, index) => {
          item.optionsName = this.wordArr[index];
          item.indexNo = index + 1;
        });
        if (this.dataQuestion) {
          this.form.questionType = "6";
        }

        let data = await addTest({ ...this.form });
        console.log(data.data.questionId);
        //资料题
        if (this.dataQuestion) {
          //非新增试题的情况下
          if (!this.creatTestLog) {
            this.parentsId = data.data.questionId;
          } else {
            //新增试题
            this.formArray2 = [...this.formArray];
            this.formArray2.splice(0, 1);

            this.form = {
              qwmQuestionProjects: [],
              qwmQuestionSources: []
            };
            this.getList();
            this.edit();
          }
        } else {
          this.dataQuestionOrTest();
        }
        this.$message.success("新增成功");
      } else {
        await saveTest({ ...this.form });
        this.$message.success("编辑成功");
      }
    },
    dataQuestionOrTest() {
      this.showFlag = false;
      this.$emit("reload");
    },
    addVideo() {
      this.$refs.DetailAdd.showFlag = true;
    },
    creatTest() {
      this.creatTestLog = true;
      this.formArray2 = [...this.formArray];
      this.form = {
        parentQuestionId: this.parentsId,
        video: "",
        qwmQuestionProjects: [],
        qwmQuestionSources: [],
        qwmQuestionOptions: []
      };
      this.formArray2.splice(1, 1);
      this.formArray2.splice(3, 1);
      this.selectAssignment();
      console.log(this.creatTestLog);
      console.log(this.form);
    },
    addRdaio() {
      this.form.qwmQuestionOptions.push({
        isAnswer: "",
        optionsValue: "",
        optionsName: ""
      });
    },
    selectAssignment() {
      this.formArrayParents.forEach(item => {
        this.formArray2[0].content.forEach(item2 => {
          if (item2.label == item.label) {
            item2.content = item.content;
          }
        });
      });
    },
    async open() {
      this.formArray2 = [...this.formArray];
      this.form = {
        video: "",
        qwmQuestionProjects: [],
        qwmQuestionSources: [],
        qwmQuestionOptions: []
      };

      this.$refs.form && this.$refs.form.resetFields();
      this.$refs.selectMaterial && (this.$refs.selectMaterial.form = {});
      if (this.editForm && !this.isCreate) {
        this.form = this.editForm;
        const res = await getProjectTree({ projectId: 0 });
        this.treeData = res.data;

        console.log(this.treeData);
        console.log(this.form);
      }
      if (this.dataQuestion) {
        this.formArray2.splice(0, 1);
        // this.formArray2.splice(3, 1);
      } else {
        this.formArray2.splice(1, 1);
        this.formArray2.splice(3, 1);
        this.selectAssignment();
      }
      console.log(this.formArray2);
      console.log(this.formArrayParents);

      //   this.commodityGroup = await getGoodsGroupListOption();

      // if (!this.isCreate) {
      //   // 根据类型获取对应详情
      //   const { goodsId } = this.currentSelect;
      //   switch (this.type) {
      //     case CommodityManageType.COMMODITY_MANAGE:
      //       this.form = (await getGoods({ goodsId })).data;
      //       break;
      //     case CommodityManageType.COLUMN_Manage:
      //       this.form = (await getSmallColumn({ goodsId })).data;
      //       break;
      //     case CommodityManageType.VIDEO_MANAGE:
      //       this.form = (await getGoodsVideo({ goodsId })).data;
      //       break;
      //     case CommodityManageType.VIP_MANAGE:
      //       this.form = (await getVipmange({ goodsId })).data;
      //       break;
      //   }
      // }
    }
  }
};
</script>
<style scoped>
.el-checkbox:last-of-type {
  margin-right: 0;
  margin-left: 10px;
}
</style>
<style scoped lang="scss">
@import "orderCommon";
.buttonArray {
  @include displayFlex(row, center, center);
}

.deleteButton {
  background: #ffd668;
  border-color: #ffd668;
  color: white;
}
.moreRdaio {
  @include displayFlex(row, flex-start, center);
  margin-top: 5px;
}
.typeResource {
  @include displayFlex(row, flex-start, center);
}
.moreRdaioGroup {
  @include displayFlex(column, flex-start, center);
}
.el-input,
.el-select {
  width: 200px;
}
.addButton {
  margin: 10px;
}
.el-textarea {
  width: 100%;
}

.demo-ruleForm {
  @include displayFlex;
  width: 100%;
}
.quillEditor {
  margin-left: 20px;
}
</style>
<style>
.edit .el-form-item__label {
  width: 120px !important;
}
.commmonItem {
  width: 320px;
}
.moreItem {
  width: 1200px;
}
.moreItem .el-textarea {
  width: 90%;
}
/* .demo-ruleForm .el-form-item {
  width: 320px;
} */
</style>
