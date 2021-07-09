<!--
 * @Author: KokoTa
 * @Date: 2021-01-06 14:19:31
 * @LastEditTime: 2021-01-12 14:24:27
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/educationManage/itemManage/dialog/EditType.vue
-->
<template>
  <el-dialog :title="title" width="375px" :visible.sync="showFlag" @open="open">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="分类名称" prop="catalogName">
        <el-input v-model="form.catalogName" placeholder="请输入分类名称" clearable></el-input>
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
import { addCatalog, getCatalog, saveCatalog } from '@/api/itemManage'

export default {
  props: {
    isCreate: { // 类型: true 新建 false 编辑
      type: Boolean,
      required: true
    },
    currentSelect: { // 传入的数据
      type: Object,
      default: () => {}
    },
    resourceType: { // 分类的类型，其中 100 为物品
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      showFlag: false,
      form: {},
      rules: createRequiredRules([
        'catalogName'
      ], [
        '分类名称'
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
      const { resourceType } = this
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isCreate) {
            await addCatalog({ ...this.form, resourceType })
            this.$message.success('新增成功')
          } else {
            await saveCatalog({ ...this.form, resourceType })
            this.$message.success('保存成功')
          }
          this.showFlag = false
          this.$emit('reload')
        }
      })
    },

    async open () {
      setTimeout(async () => {
        this.form = {}
        this.$refs.form && this.$refs.form.resetFields()
        if (!this.isCreate) {
          const { catalogId } = this.currentSelect
          const res = await getCatalog({ catalogId })
          this.form = res.data
        }
      }, 0)
    }
  }
}
</script>

<style>
</style>
