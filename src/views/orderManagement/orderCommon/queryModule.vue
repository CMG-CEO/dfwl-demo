<template>
  <div>
    <div class="wrap">
      <!-- 搜索区域 -->
      <section class="panel">
        <commonTree
          :treeData="treeData"
          ref="commonTree"
          @nodeClick="nodeClick"
        ></commonTree>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="right"
        >
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            v-for="(item, index) in formArray"
            :key="item.prop + index"
          >
            <el-input
              v-if="item.type == 'input'"
              v-model="ruleForm[item.prop]"
              @focus="inputMethods(item)"
            ></el-input>
            <el-select
              v-model="ruleForm[item.prop]"
              placeholder="请选择"
              v-else-if="item.type == 'select'"
              clearable
            >
              <el-option
                v-for="item2 in item.content"
                :key="item2.label"
                :label="item2.label"
                :value="item2.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span class="query" v-if="!queryButtonGroup">
          <el-button type="primary" @click="moduleQuery">查询</el-button>
          <el-button type="primary" @click="clear">重置</el-button>
        </span>
        <span v-else class="query">
          <el-button
            type="primary"
            @click="methods(item2)"
            v-for="(item2, index2) in queryButtonGroup"
            :key="item2 + index2"
            >{{ item2 }}</el-button
          ></span
        >
      </section>
    </div>
  </div>
</template>
<script>
import commonTree from "@/views/questionBank/testManagement/testCommon/commonTree.vue";
import { getProjectTree } from "@/api/projectManage";
export default {
  props: ["formArray", "queryButtonGroup"],
  components: {
    commonTree
  },
  data() {
    return {
      treeData: []
    };
  },
  methods: {
    async testType() {
      const res = await getProjectTree({ projectId: 0 });
      this.treeData = [...res.data];
      this.$refs.commonTree.showFlag = true;
    },
    moduleQuery() {
      this.$emit("moduleQuery", this.ruleForm);
    },
    clear() {
      this.ruleForm = {};
      this.$emit("clear");
    },
    inputMethods(val) {
      console.log(val);
      switch (val.label) {
        case "考试项目":
          this.testType();
          break;
      }
    },
    methods(typeName) {
      this.$emit("typeName", { name: typeName, data: this.ruleForm });
    },
    nodeClick(val) {
      console.log(val);
      this.ruleForm.projectId = val.id;
      this.ruleForm.projectName = val.path;
      this.ruleForm = { ...this.ruleForm };
      console.log(this.ruleForm);
    }
  },
  data() {
    return {
      ruleForm: {},
      treeData: []
    };
  }
};
</script>

<style lang="scss" scoped>
@import "orderCommon";
.el-input,
.el-select {
  width: 200px;
}
.demo-ruleForm {
  @include displayFlex;
  width: 80%;
}
.panel {
  @include displayFlex(row, flex-start, flex-end);
  .query {
    padding-bottom: 20px;
  }
}
</style>
