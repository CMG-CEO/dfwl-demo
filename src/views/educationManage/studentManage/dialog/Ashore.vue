<!--
 * @Author: KokoTa
 * @Date: 2021-01-19 14:53:12
 * @LastEditTime: 2021-01-19 15:47:32
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/educationManage/studentManage/dialog/Ashore.vue
-->

<template>
  <el-dialog title="上岸" width="375px" :visible.sync="showFlag" @open="open">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="注册日期" prop="registerTime">
        <el-date-picker
          v-model="form.registerTime"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="笔试成绩" prop="writtenScore">
        <el-input-number v-model="form.writtenScore" :min="0" placeholder="笔试成绩" clearable></el-input-number>
      </el-form-item>
      <el-form-item label="面试成绩" prop="interviewScore">
        <el-input-number v-model="form.interviewScore" :min="0" placeholder="面试成绩" clearable></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createRequiredRules } from '@/util'
import { ashoreStudent } from '@/api/studentManage'

export default {
  props: {
    currentItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showFlag: false,
      form: {},
      rules: createRequiredRules([
        'registerTime',
        'writtenScore',
        'interviewScore'
      ], [
        '注册日期',
        '笔试成绩',
        '面试成绩'
      ])
    }
  },
  methods: {
    async submit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { studentId } = this.currentItem
          await ashoreStudent({ ...this.form, studentId, ashoreFlag: 1 })
          this.$message.success('操作成功')
          this.$emit('reload')
          this.showFlag = false
        }
      })
    },

    async open () {
      setTimeout(() => {
        this.form = { ...this.currentItem }
        this.$refs.form && this.$refs.form.resetFields()
      }, 0)
    }
  }
}
</script>

<style>
</style>
