<!--
 * @Author: KokoTa
 * @Date: 2020-12-28 09:10:16
 * @LastEditTime: 2021-01-08 15:52:21
 * @LastEditors: KokoTa
 * @Description: 项目管理
 * @FilePath: /future-bms/src/views/baseDataManage/projectManage/index.vue
-->
<template>
  <div class="tree-manage-wrap">
    <!-- 左侧树形菜单 -->
    <div class="panel left">
      <Tree
        ref="tree"
        :showOperation="true"
        :treeData="treeData"
        @nodeClick="nodeClick"
        @treeAppend="treeAppend"
        @treeAdd="treeAdd"
        @treeRemove="treeRemove"
        @treeReload="treeReload"
      ></Tree>
    </div>
    <!-- 右侧表单 -->
    <div v-if="form" class="panel right">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="上级名称">
          <el-input v-model="form.pprojectName" placeholder="上级名称" clearable disabled></el-input>
        </el-form-item>
        <el-form-item label="项目编码" prop="projectNo">
          <el-input v-model="form.projectNo" placeholder="请输入项目编码" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="顺序" prop="indexNo">
          <el-input-number v-model="form.indexNo" placeholder="请输入顺序" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="标签" prop="isLabel">
          <el-radio-group v-model="form.isLabel" clreadable>
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="课程显示" prop="isShowGsm">
          <el-radio-group v-model="form.isShowGsm" clreadable>
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="题库显示" prop="isShowQwm">
          <el-radio-group v-model="form.isShowQwm" clreadable>
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="国考" prop="isCountry">
          <el-radio-group v-model="form.isCountry" clreadable>
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="isActive">
          <el-radio-group v-model="form.isActive" clreadable>
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button v-if="typeof form.projectId === 'number'" type="primary" @click="save">保存</el-button>
          <el-button v-else type="primary" @click="add">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Tree from '@/components/Tree'
import { addProject, delProject, getProject, getProjectTree, saveProject } from '@/api/projectManage'
import { createRequiredRules } from '@/util'

export default {
  components: { Tree },
  data () {
    return {
      treeData: [],
      form: null,
      rules: createRequiredRules([
        'projectNo',
        'projectName',
        'indexNo',
        'isLabel',
        'isActive',
        'isShowGsm',
        'isShowQwm'
      ], [
        '项目编码',
        '项目名称',
        '顺序',
        '标签',
        '状态',
        '课程显示',
        '题库显示'
      ])
    }
  },
  methods: {
    /**
     * 操作函数
     */
    // 点击节点获取详情
    nodeClick (data) {
      const { id: projectId } = data
      // 有 id 说明是已存在的节点，用这个节点 id 取获取详情，没有则说明是新节点，直接用当前节点信息作为详情
      if (projectId >= 0) {
        this.getDetail(projectId)
      } else {
        this.form = data
      }
    },
    // 新增节点
    treeAppend (data) {
      this.form = data
    },
    // 新增未保存节点
    treeAdd (data) {
      this.form = data
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.add()
        } else {
          this.$refs.form.resetFields()
          this.treeReload()
        }
      })
    },
    // 删除节点
    treeRemove (data) {
      this.form = data
      this.del()
    },
    // 刷新树形数据
    treeReload () {
      this.treeData = []
      this.getTree()
    },
    /**
     * 请求函数
     */
    // 获取树形数据
    async getTree () {
      const res = await getProjectTree({ projectId: 0 })
      this.treeData = res.data
    },
    // 获取节点详情
    async getDetail (projectId) {
      // 获取父节点信息
      const node = this.$refs.tree.$refs.tree.getNode(projectId)
      let parentData = null
      if (node) parentData = node.parent.data

      const detail = await getProject({ projectId })
      this.form = detail.data
      if (parentData) {
        this.form.pprojectName = parentData.label
        this.form.pprojectId = parentData.id
      }
    },
    // 保存节点数据
    async save () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            await saveProject(this.form)
            this.$message.success('保存成功')
          } finally {
            this.treeReload()
          }
        }
      })
    },
    // 新增节点数据
    async add () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            await addProject(this.form)
            this.$message.success('新增成功')
            this.$refs.tree.appendNode = null
          } finally {
            this.treeReload()
          }
        }
      })
    },
    // 删除节点数据
    async del () {
      const { id: projectId } = this.form
      try {
        await delProject({ projectId })
        this.$message.success('删除成功')
      } finally {
        this.treeReload()
      }
    }
  },
  mounted () {
    this.getTree()
  }
}
</script>

<style lang="scss" scoped>
</style>
