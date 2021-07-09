<!--
 * @Author: KokoTa
 * @Date: 2021-01-22 11:32:44
 * @LastEditTime: 2021-01-26 17:20:41
 * @LastEditors: KokoTa
 * @Description: 商品管理-通用考试项目树形组件
 * @FilePath: /future-bms/src/views/commodityManage/bigColumnManage/dialog/ProjectTreeDialog.vue
-->

<template>
  <el-dialog width="400px" :visible.sync="showFlag" @open="open" append-to-body>
    <div class="project-tree-dialog">
      <Tree ref="tree" :treeData="treeData" @nodeClick="nodeClick"></Tree>
    </div>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false"
        >取消</el-button  
      >
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Tree from "@/components/Tree";
import { getProjectTree } from "@/api/projectManage";

export default {
  components: { Tree },
  data() {
    return {
      showFlag: false,
      treeData: [],
      target: null
    };
  },
  methods: {
    nodeClick(data) {
      this.target = data;
    },
    async submit() {
      if (this.target.children) {
        this.$message.info("请选择跟节点");
        return;
      }
      if (this.target) {
        this.$emit("nodeClick", { ...this.target });
      }
      this.showFlag = false;
    },
    // 获取树形数据
    async getTree() {
      const res = await getProjectTree({ projectId: 0 });
      this.treeData = res.data;
    },
    async open() {
      this.target = null;
      await this.getTree();
    }
  }
};
</script>

<style lang="scss" scoped>
.project-tree-dialog {
  height: 400px;
  overflow: scroll;
}
</style>
<style>
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: rgba(0, 102, 204, 0.4392156862745098) !important;
}
</style>
