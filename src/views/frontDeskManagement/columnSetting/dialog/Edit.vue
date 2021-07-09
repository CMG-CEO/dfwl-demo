<template>
  <el-dialog
    :title="title"
    width="1000px"
    :visible.sync="showFlag"
    @open="open"
  >
    <el-form ref="form" :model="form" :rules="rules" :inline="true">
      <el-form-item label="应用类型" prop="appType">
        <el-select
          v-model="form.appType"
          placeholder="请选择应用类型"
          width="100px"
          clearable
          filterable
          @change="getAppTypeValue(form.appType)"
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
          @change="getAppPageValue(form.appPage)"
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
          placeholder="请选择栏目类型"
          clearable
          filterable
          @change="getAppColumnsValue(form.columnsType)"
        >
          <el-option
            v-for="(item, index) in columnsTypeList"
            :key="index"
            :label="item.columnsTypeName"
            :value="item.columnsType"
            >{{ item.columnsTypeName }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="栏目名称" prop="columnsName">
        <el-input
          v-model="form.columnsName"
          placeholder="请输入栏目名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="对象类型" prop="objectType">
        <el-select
          v-model="form.objectType"
          placeholder="请选择对象类型"
          clearable
          filterable
          @change="getAppObjectValue(form.objectType)"
        >
          <el-option
            v-for="(item, index) in objectTypeList"
            :key="index"
            :label="item.objectTypeName"
            :value="item.objectType"
            >{{ item.objectTypeName }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="栏目/对象值" prop="columnsValue">
        <el-input
          v-model="form.columnsValue"
          placeholder="请输入栏目/对象值"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="indexNo">
        <el-input
          v-model="form.indexNo"
          placeholder="请输入显示顺序"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow">
        <el-checkbox
          style="width:235px;"
          v-model="form.isShow"
          checked
          true-label="1"
          false-label="0"
        ></el-checkbox>
      </el-form-item>
      <el-form-item label="包含对象明细" prop="isDetail">
        <el-checkbox
          v-model="form.isDetail"
          true-label="1"
          false-label="0"
        ></el-checkbox>
      </el-form-item>
      <el-form-item label="显示类型" prop="styleType">
        <el-select
          v-model="form.styleType"
          placeholder="请选择显示类型"
          clearable
          filterable
          @change="getAppStyleTypeValue(form.styleType)"
        >
          <el-option
            v-for="(item, index) in styleTypeList"
            :key="index"
            :label="item.styleTypeName"
            :value="item.styleType"
            >{{ item.styleTypeName }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="显示列数" prop="showNumber">
        <el-input
          v-model="form.showNumber"
          placeholder="请输入显示列数"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="显示记录数" prop="recordNumber">
        <el-input
          v-model="form.recordNumber"
          placeholder="请输入显示记录数"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="form.remark"
          show-word-limit
          class="textareaSty"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getColumn, saveColumns, addColumns } from "@/api/columnSetting";
import { createRequiredRules } from "@/util";
import { getCommuneId, getUserId } from "@/util/auth";
import { querySelect } from "@/api/testManagement";
export default {
  props: {
    isCreate: {
      // 类型: true 新建 false 编辑
      type: Boolean,
      required: true,
    },
    currentSelect: {
      // 传入的数据
      type: Object,
      default: () => {},
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
      columnsTypeList: [],
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
          "columnsType",
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
          "栏目类型",
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
      if (!this.form.isDetail) {
        this.form.isDetail = "0";
      }
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
      for (var i = 0; i < this.appTypeList.length; i++) {
        this.appTypeList[i].appType = this.appTypeList[i].itemCode;
        this.appTypeList[i].appTypeName = this.appTypeList[i].itemName;
      }
      this.appPageList = data.app_page;
      for (var j = 0; j < this.appPageList.length; j++) {
        this.appPageList[j].appPage = this.appPageList[j].itemCode;
        this.appPageList[j].appPageName = this.appPageList[j].itemName;
      }
      this.objectTypeList = data.cdm_app_columns_object_type;
      for (var g = 0; g < this.objectTypeList.length; g++) {
        this.objectTypeList[g].objectType = this.objectTypeList[g].itemCode;
        this.objectTypeList[g].objectTypeName = this.objectTypeList[g].itemName;
      }
      this.styleTypeList = data.style_type;
      for (let k = 0; k < this.styleTypeList.length; k++) {
        this.styleTypeList[k].styleType = this.styleTypeList[k].itemCode;
        this.styleTypeList[k].styleTypeName = this.styleTypeList[k].itemName;
      }
      this.columnsTypeList = data.columns_type;
      for (let k = 0; k < this.columnsTypeList.length; k++) {
        this.columnsTypeList[k].columnsType = this.columnsTypeList[k].itemCode;
        this.columnsTypeList[k].columnsTypeName =
          this.columnsTypeList[k].itemName;
      }
      if (!this.isCreate) {
        // 栏目设置获取详情
        const { appColumnsId } = this.currentSelect;
        const columnRes = await getColumn({ appColumnsId });
        this.form = columnRes.data.data;
      }
    },
    // 应用类型值
    getAppTypeValue(val) {
      for (var i = 0; i < this.appTypeList.length; i++) {
        if (this.appTypeList[i].appType == val) {
          this.form.appTypeName = this.appTypeList[i].appTypeName;
        }
      }
    },
    // 应用页面
    getAppPageValue(val) {
      for (var i = 0; i < this.appPageList.length; i++) {
        if (this.appPageList[i].appPage == val) {
          this.form.appPageName = this.appPageList[i].appPageName;
        }
      }
    },
    // 栏目类型值
    getAppColumnsValue(val) {
      for (var i = 0; i < this.columnsTypeList.length; i++) {
        if (this.columnsTypeList[i].columnsType == val) {
          this.form.columnsTypeName = this.columnsTypeList[i].columnsTypeName;
        }
      }
    },
    // 对象类型值
    getAppObjectValue(val) {
      for (var i = 0; i < this.objectTypeList.length; i++) {
        if (this.objectTypeList[i].objectType == val) {
          this.form.objectTypeName = this.objectTypeList[i].objectTypeName;
        }
      }
    },
    // 显示类型值
    getAppStyleTypeValue(val) {
      for (var i = 0; i < this.styleTypeList.length; i++) {
        if (this.styleTypeList[i].styleType == val) {
          this.form.styleTypeName = this.styleTypeList[i].styleTypeName;
        }
      }
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
</style>
