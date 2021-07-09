<!--
 * @Author: KokoTa
 * @Date: 2021-01-13 10:23:44
 * @LastEditTime: 2021-01-20 16:45:25
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/educationManage/teacherManage/dialog/Edit.vue
-->

<template>
  <el-dialog :title="title" width="400px" :visible.sync="showFlag" @open="open">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <h4>基本信息</h4>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.nickName" placeholder="请输入昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="授课简要" prop="teachMemo">
        <el-input v-model="form.teachMemo" placeholder="请输入授课简要" clearable></el-input>
      </el-form-item>
      <el-form-item label="授课科目" required prop="objectList">
        <SMChoice ref="SMChoice" @choice="selectSubjectOrModule"></SMChoice>
        <div class="sm-list">
          <div class="sm-item" v-for="(item, index) in form.subjectList" :key="index">
            <span>{{item.name}}</span>
            <i class="el-icon-remove-outline remove" @click="removeSubjectOrModule(item)"></i>
          </div>
        </div>
        <div class="sm-list">
          <div class="sm-item" v-for="(item, index) in form.moduleList" :key="index">
            <span>{{item.name}}</span>
            <i class="el-icon-remove-outline remove" @click="removeSubjectOrModule(item)"></i>
          </div>
        </div>
        <el-button type="default" size="mini" @click="openSMChoice">添加科目/模块</el-button>
      </el-form-item>
      <el-form-item label="课程头像" prop="lessonPic">
        <SelectMaterial
          ref="selectMaterial1"
          :url="form.lessonPic"
          :resourceType="resourceType"
          @selected="handleSelectLesPic"
        ></SelectMaterial>
      </el-form-item>
      <el-form-item label="形象图片" prop="artsyShots">
        <SelectMaterial
          ref="selectMaterial2"
          :url="form.artsyShots"
          :resourceType="resourceType"
          @selected="handleSelectArtsyShots"
        ></SelectMaterial>
      </el-form-item>
      <h4>老师简介</h4>
      <el-form-item label="文本简介" prop="introduce">
        <el-input v-model="form.introduce" type="textarea" placeholder="请输入文本简介" clearable></el-input>
      </el-form-item>
      <el-form-item label="图片简介" prop="picIntroduce">
        <SelectMaterial
          ref="selectMaterial3"
          :url="form.picIntroduce"
          :resourceType="resourceType"
          @selected="handleSelectPicIntroduce"
        ></SelectMaterial>
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
import SMChoice from '@/views/educationManage/teacherManage/dialog/SMChoice'
import SelectMaterial from '@/components/SelectMaterial'
import { ResourceType } from '@/util/constant'
import { saveTeacher } from '@/api/teacherManage'

export default {
  components: { SMChoice, SelectMaterial },
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
    /**
     * 验证函数
     */
    const checkObjectList = (rule, value, callback) => {
      const { subjectList, moduleList } = this.form
      if (subjectList.length === 0 && moduleList.length === 0) {
        callback(new Error('授课科目不可为空'))
      } else {
        callback()
      }
    }

    return {
      showFlag: false,
      form: {
        subjectList: [],
        moduelist: []
      },
      rules: {
        ...createRequiredRules([
          'nickName',
          'teachMemo',
          'lessonPic',
          'artsyShots',
          'introduce',
          'picIntroduce'
        ], [
          '昵称',
          '授课简要',
          '课程头像',
          '形象图片',
          '文本简介',
          '图片简介'
        ]),
        objectList: [
          { validator: checkObjectList, trigger: 'blur' }
        ]
      },
      resourceType: ResourceType.IMAGE
    }
  },
  computed: {
    title () {
      return this.isCreate ? '新建' : '编辑'
    }
  },
  methods: {
    /**
     * 课程选择操作
     */
    openSMChoice () {
      this.$refs.SMChoice.showFlag = true
    },
    selectSubjectOrModule (item) {
      // 科目
      if (+item.objectType === 1) {
        const index = this._findIndex(this.form.subjectList, item)
        if (index === -1) this.form.subjectList.push(item)
      }
      // 模块
      if (+item.objectType === 2) {
        const index = this._findIndex(this.form.moduleList, item)
        if (index === -1) this.form.moduleList.push(item)
      }
    },
    removeSubjectOrModule (item) {
      if (+item.objectType === 1) {
        const index = this._findIndex(this.form.subjectList, item)
        this.form.subjectList.splice(index, 1)
      }
      if (+item.objectType === 2) {
        const index = this._findIndex(this.form.moduleList, item)
        this.form.moduleList.splice(index, 1)
      }
    },
    _findIndex (arr, target) {
      return arr.findIndex((item) => item.id === target.id)
    },

    /**
     * 资源选择操作
     */
    handleSelectLesPic (url) {
      this.form = { ...this.form, lessonPic: url }
    },
    handleSelectArtsyShots (url) {
      this.form = { ...this.form, artsyShots: url }
    },
    handleSelectPicIntroduce (url) {
      this.form = { ...this.form, picIntroduce: url }
    },

    /**
     * 提交操作
     */
    async submit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.isCreate) {

          } else {
            // 学科信息只要传ID数组就好
            const moduleIds = this.form.moduleList.map((item) => item.id)
            const subjectIds = this.form.subjectList.map((item) => item.id)
            const {
              teacherId,
              nickName,
              teachMemo,
              lessonPic,
              artsyShots,
              introduce,
              picIntroduce,
              remark
            } = this.form
            await saveTeacher({
              teacherId,
              nickName,
              teachMemo,
              lessonPic,
              artsyShots,
              introduce,
              picIntroduce,
              remark,
              moduleIds,
              subjectIds
            })
            this.$message.success('保存成功')
          }
          this.showFlag = false
          this.$emit('reload')
        }
      })
    },

    async open () {
      this.form = {
        subjectList: [],
        moduleList: []
      }
      this.$refs.form && this.$refs.form.resetFields()
      this.$refs.selectMaterial1 && (this.$refs.selectMaterial1.form = {})
      this.$refs.selectMaterial2 && (this.$refs.selectMaterial2.form = {})
      this.$refs.selectMaterial3 && (this.$refs.selectMaterial3.form = {})
      if (!this.isCreate) {
        setTimeout(async () => {
          this.form = { ...this.currentSelect }
        }, 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sm-item {
  display: flex;
  align-items: center;
  line-height: 1.5;
  .remove {
    font-size: 16px;
    padding: 0 5px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
