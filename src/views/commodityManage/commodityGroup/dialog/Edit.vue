<!--
 * @Author: KokoTa
 * @Date: 2021-01-06 10:56:01
 * @LastEditTime: 2021-01-08 14:04:17
 * @LastEditors: KokoTa
 * @Description: 新增/编辑分组
 * @FilePath: /future-bms/src/views/commodityManage/commodityGroup/dialog/Edit.vue
-->
<template>
  <el-dialog :title="title" width="400px" :visible.sync="showFlag" @open="open">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="分组名称" prop="name">
        <el-input v-model="form.name" placeholder="分组名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" placeholder="请输入备注" clearable></el-input>
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
import { addGoodsGroup, getGoodsGroup, saveGoodsGroup } from '@/api/commodityGroup'

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
      rules: createRequiredRules([
        'name'
      ], [
        '分组名称'
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
            await addGoodsGroup(this.form)
            this.$message.success('新增成功')
          } else {
            await saveGoodsGroup(this.form)
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
      if (!this.isCreate) {
        setTimeout(async () => {
          const { goodsGroupId } = this.currentSelect
          const detail = await getGoodsGroup({ goodsGroupId })
          this.form = detail.data
        }, 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
