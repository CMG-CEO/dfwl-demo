<!--
 * @Author: KokoTa
 * @Date: 2021-01-13 11:22:16
 * @LastEditTime: 2021-01-20 16:02:27
 * @LastEditors: KokoTa
 * @Description: 科目或模块选择框
 * @FilePath: /future-bms/src/views/educationManage/teacherManage/dialog/SMChoice.vue
-->

<template>
  <el-dialog title="授课科目" width="400px" :visible.sync="showFlag" @open="open" append-to-body>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">科目</el-radio>
          <el-radio :label="2">模块</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="form.type === 1 ? '科目' : '模块'" prop="objectId">
        <el-select v-model="form.objectId" placeholder="请选择" clearable filterable>
          <el-option
            v-for="(item, index) in objectList"
            :key="index"
            :label="item.moduleName || item.subjectName"
            :value="item.moduleId || item.subjectId"
          >{{item.moduleName || item.subjectName}}</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false">取消</el-button>
      <el-button type="primary" size="small" @click="submit">添加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createRequiredRules } from '@/util'
import { getModuleOption, getSubjectOption } from '@/util/option'

export default {
  data () {
    return {
      showFlag: false,
      form: {},
      rules: createRequiredRules([
        'objectId'
      ], [
        '科目/模块'
      ]),
      subjectList: [],
      moduleList: [],
      objectList: []
    }
  },
  watch: {
    'form.type' (val) {
      // 1 科目 2 模块
      if (val === 1) this.objectList = this.subjectList
      if (val === 2) this.objectList = this.moduleList
      delete this.form.objectId
    }
  },
  methods: {
    async submit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { objectId } = this.form
          const item = this.objectList.find((item) => item.moduleId === objectId || item.subjectId === objectId)
          const { subjectName, moduleName, subjectId, moduleId } = item
          const { type } = this.form
          this.showFlag = false
          this.$emit('choice', {
            name: moduleName || subjectName,
            id: moduleId || subjectId,
            objectType: type
          })
        }
      })
    },

    async open () {
      this.form = { type: 1 }
      this.$refs.form && this.$refs.form.resetFields()
      this.subjectList = await getSubjectOption()
      this.moduleList = await getModuleOption()
      this.objectList = this.subjectList
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
