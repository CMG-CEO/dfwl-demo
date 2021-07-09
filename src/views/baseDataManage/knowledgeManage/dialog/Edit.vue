<!--
 * @Author: KokoTa
 * @Date: 2020-12-29 11:45:05
 * @LastEditTime: 2021-01-12 15:07:56
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/baseDataManage/knowledgeManage/dialog/Edit.vue
-->
<template>
  <el-dialog :title="title" width="400px" :visible.sync="showFlag" @open="open">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="是否一级">
        <el-radio-group v-model="form.nodeType">
          <el-radio :label="1">一级节点</el-radio>
          <el-radio :label="2">非一级节点</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group
          v-model="form.subjectModuleFlag"
          prop="subjectModuleFlag"
        >
          <el-radio label="1">科目</el-radio>
          <el-radio label="2">模块</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="科目/模块名称" prop="objectId">
        <el-select
          v-model="form.objectId"
          placeholder="选择科目/模块"
          clearable
          filterable
        >
          <el-option
            v-for="(item, index) in objectList"
            :key="index + item"
            :label="item.moduleName || item.subjectName"
            :value="item.moduleId || item.subjectId"
            >{{ item.moduleName || item.subjectName }}</el-option
          >
        </el-select>
      </el-form-item>
      <template v-if="form.nodeType === 2">
        <div>
          <el-form-item label="上级名称" prop="pknowledgeId">
            <el-select
              v-model="form.pknowledgeId"
              placeholder="请选择上级名称"
              clearable
              filterable
            >
              <el-option
                v-for="(item, index) in knowledgeList"
                :key="index"
                :label="item.knowledgeName"
                :value="item.knowledgeId"
                >{{ item.knowledgeName }}</el-option
              >
            </el-select>
          </el-form-item>
        </div>
      </template>
      <el-form-item label="知识点名称" prop="knowledgeName">
        <el-input
          v-model="form.knowledgeName"
          placeholder="请输入知识点名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="顺序" prop="indexNo">
        <el-input
          v-model="form.indexNo"
          placeholder="请输入顺序"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="题数" prop="questionCount">
        <el-input
          v-model="form.questionCount"
          placeholder="0"
          clearable
          disabled
        ></el-input>
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
import {
  getKnowledgeOption,
  getModuleOption,
  getSubjectOption
} from "@/util/option";
import { addKnowledge, saveKnowledge } from "@/api/knowledgeManage";
import { createRequiredRules } from "@/util";

export default {
  props: {
    isCreate: {
      // 类型: true 新建 false 编辑
      type: Boolean,
      required: true
    },
    currentSelect: {
      // 传入的数据
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showFlag: false,
      form: {},
      objectList: [],
      rules: createRequiredRules(
        [
          "subjectModuleFlag",
          "objectId",
          "pknowledgeId",
          "knowledgeName",
          "indexNo"
        ],
        ["类型", "科目/模块名称", "上级名称", "知识点名称", "顺序"]
      )
    };
  },
  watch: {
    "form.subjectModuleFlag"(val) {
      // this.form.objectId = null;
      this.$set(this.form, "objectId", "");
      if (+val === 1) {
        this.objectList = this.subjectList;
      }
      if (+val === 2) {
        this.objectList = this.moduleList;
      }
    },
    "form.nodeType"(val) {
      if (+val === 1 && this.form.pknowledgeId) {
        delete this.form.pknowledgeId;
      }
    }
  },
  computed: {
    title() {
      return this.isCreate ? "新建" : "编辑";
    }
  },
  methods: {
    async submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.isCreate) {
            await addKnowledge({ ...this.form, isActive: 1 });
            this.$message.success("新增成功");
          } else {
            await saveKnowledge({ ...this.form });
            this.$message.success("保存成功");
          }
          this.showFlag = false;
          this.$emit("reload");
        }
      });
    },

    async open() {
      this.form = { nodeType: 1 };
      this.$refs.form && this.$refs.form.resetFields();
      this.subjectList = await getSubjectOption();
      this.moduleList = await getModuleOption();
      this.knowledgeList = await getKnowledgeOption();
      if (!this.isCreate) {
        const { pknowledgeId } = this.currentSelect;
        // 为 0 说明是一级节点，否则说明是非一级节点
        if (+pknowledgeId === 0) {
          this.form.nodeType = 1;
        } else {
          this.form.nodeType = 2;
        }
        this.form = { ...this.form, ...this.currentSelect };
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
