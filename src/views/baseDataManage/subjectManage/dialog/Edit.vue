<!--
 * @Author: KokoTa
 * @Date: 2020-12-28 15:29:56
 * @LastEditTime: 2021-01-08 15:52:45
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/baseDataManage/subjectManage/dialog/Edit.vue
-->
<template>
  <el-dialog :title="title" width="600px" :visible.sync="showFlag" @open="open">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="科目名称" prop="subjectName">
        <el-input v-model="form.subjectName" placeholder="请输入科目名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="顺序" prop="indexNo">
        <el-input-number v-model="form.indexNo" placeholder="请输入顺序" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="题数" prop="questionCount">
        <el-input-number disabled v-model="form.questionCount" placeholder="0" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="标签" prop="isLabel">
        <el-radio-group v-model="form.isLabel">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="isActive">
        <el-radio-group v-model="form.isActive">
          <el-radio label="1">启用</el-radio>
          <el-radio label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="belong-wrap">
      <div class="belong-left">
        <div class="belong-title">项目</div>
        <div class="belong-left-content">
          <Tree ref="tree" :showCheckbox="true" :treeData="treeData" @checkChange="checkChange"></Tree>
        </div>
      </div>
      <div class="belong-right">
        <div class="belong-title">所属项目</div>
        <div class="belong-right-content">
          <div v-for="(item, index) in nodeArr" :key="index">
            <div>{{item.path}}</div>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false">取消</el-button>
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { userType, baseStatus } from '@/util/option'
import Tree from '@/components/Tree'
import { getProjectTree } from '@/api/projectManage'
import { addSubject, getSubject, saveSubject } from '@/api/subjectManage'
import { createRequiredRules } from '@/util'

export default {
  components: { Tree },
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
      treeData: [],
      nodeArr: [],
      userType,
      baseStatus,
      rules: createRequiredRules([
        'subjectName',
        'indexNo',
        'isActive',
        'isLabel'
      ], [
        '科目名称',
        '顺序',
        '标签',
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
    checkChange (data) {
      const index = this.nodeArr.findIndex((node) => node.path === data.path)
      if (data.checked && index === -1) {
        this.nodeArr.push(data)
      }
      if (!data.checked && index !== -1) {
        this.nodeArr.splice(index, 1)
      }
    },
    async submit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const projectIds = this.nodeArr.map((item) => item.id)
          const data = { ...this.form, projectIds }
          if (this.isCreate) {
            await addSubject(data)
            this.$message.success('新增成功')
          } else {
            await saveSubject(data)
            this.$message.success('保存成功')
          }
          this.showFlag = false
          this.$emit('reload')
        }
      })
    },

    async open () {
      // 获取项目树
      const treeRes = await getProjectTree({ projectId: 0 })
      this.treeData = treeRes.data
      // 清空表单，有了 rules 才能用 resetFields 方法
      this.form = {}
      this.$refs.form && this.$refs.form.resetFields()
      this.nodeArr = []
      this.$refs.tree.$refs.tree.setCheckedKeys([])

      if (!this.isCreate) {
        // 获取科目详情
        const { subjectId } = this.currentSelect
        const subjectRes = await getSubject({ subjectId })
        this.form = subjectRes.data
        // 设置树对应的 checkbox
        this.$refs.tree.$refs.tree.setCheckedKeys(this.form.projectIds)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.belong-wrap {
  display: flex;
  .belong-left {
    flex: 1;
  }
  .belong-right {
    flex: 1;
    margin-left: 20px;
    box-sizing: border-box;
  }
  .belong-left-content,
  .belong-right-content {
    max-height: 300px;
    overflow: scroll;
  }
  .belong-right-content {
    line-height: 1.5;
    // & div:hover {
    //   cursor: pointer;
    //   background: $hover;
    // }
  }
  .belong-title {
    padding-bottom: 5px;
  }
}
</style>
