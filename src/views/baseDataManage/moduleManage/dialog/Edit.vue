<!--
 * @Author: KokoTa
 * @Date: 2020-12-29 09:58:13
 * @LastEditTime: 2021-01-08 15:51:28
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/baseDataManage/moduleManage/dialog/Edit.vue
-->
<template>
  <el-dialog :title="title" width="375px" :visible.sync="showFlag" @open="open">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="科目名称" prop="subjectId">
        <el-select v-model="form.subjectId" placeholder="请选择科目名称" clearable filterable>
          <el-option
            v-for="(item, index) in subjectList"
            :key="index"
            :label="item.subjectName"
            :value="item.subjectId"
          >{{item.subjectName}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模块名称" prop="moduleName">
        <el-input v-model="form.moduleName" placeholder="请输入模块名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="顺序" prop="indexNo">
        <el-input v-model="form.indexNo" placeholder="请输入顺序" clearable></el-input>
      </el-form-item>
      <el-form-item label="题数" prop="questionCount">
        <el-input disabled v-model="form.questionCount" placeholder="0" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.isActive" prop="isActive">
          <el-radio label="1">启用</el-radio>
          <el-radio label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mockTreeData } from '@/util/mock'
import { addModule, getModule, saveModule } from '@/api/moduleManage'
import { getSubjectOption } from '@/util/option'
import { createRequiredRules } from '@/util'

export default {
  props: {
    isCreate: { // 类型: true 新建 false 编辑
      type: Boolean,
      required: true
    },
    currentSelect: { // 传入的数据
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showFlag: false,
      form: {},
      treeData: mockTreeData(4, 2),
      subjectList: [],
      rules: createRequiredRules([
        'subjectId',
        'moduleName',
        'indexNo',
        'isActive'
      ], [
        '科目名称',
        '模块名称',
        '顺序',
        '状态'
      ])
    }
  },
  computed: {
    title () {
      return this.isCreate ? '新建' : '编辑'
    }
  },
  methods: {
    async submit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isCreate) {
            await addModule(this.form)
            this.$message.success('新增成功')
          } else {
            await saveModule(this.form)
            this.$message.success('保存成功')
          }
          this.showFlag = false
          this.$emit('reload')
        }
      })
    },

    async open () {
      this.form = {}
      this.$refs.form && this.$refs.form.resetFields()
      this.subjectList = await getSubjectOption()

      if (!this.isCreate) {
        const { moduleId } = this.currentSelect
        const moduleRes = await getModule({ moduleId })
        this.form = moduleRes.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
