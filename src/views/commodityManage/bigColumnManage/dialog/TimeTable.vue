<!--
 * @Author: KokoTa
 * @Date: 2021-02-02 09:39:00
 * @LastEditTime: 2021-02-03 14:19:31
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/views/commodityManage/bigColumnManage/dialog/TimeTable.vue
-->
<template>
  <el-dialog
    title="课程表"
    width="1400px"
    :visible.sync="showFlag"
    @open="open"
  >
    <!-- 操作栏 -->
    <section style="margin-bottom: 10px;">
      <el-button @click="add">新增</el-button>
      <el-button @click="paste">粘贴</el-button>
      <el-upload
        style="display: inline; margin: 0 10px;"
        action="#"
        :show-file-list="false"
        :http-request="importTable"
      >
        <el-button>导入课表</el-button>
      </el-upload>
      <el-button @click="clearTable">课表清除</el-button>
      <span style="margin-left: 10px;">默认老师：</span>
      <el-select
        class="w-180"
        v-model="defaultTeacher"
        placeholder="选择默认老师"
        clearable
        filterable
      >
        <el-option
          v-for="item in teacherList"
          :key="item.teacherId"
          :label="item.nickName"
          :value="item.teacherId"
        ></el-option>
      </el-select>
    </section>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="编号">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.couseNo"
            placeholder="输入编号"
            clearable
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="课程内容">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.couseContent"
            placeholder="输入课程内容"
            clearable
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="250px">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.startTime"
            type="datetime"
            placeholder="选择日期时间"
            clearable
          ></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="250px">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.endTime"
            type="datetime"
            placeholder="选择日期时间"
            clearable
          ></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="时长" width="250px">
        <template slot-scope="scope">
          {{ scope.row.timeLength }}
        </template>
      </el-table-column>
      <el-table-column label="主讲老师">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.teacherId"
            placeholder="请选择主讲老师"
            clearable
            filterable
          >
            <el-option
              v-for="item in teacherList"
              :key="item.teacherId"
              :label="item.nickName"
              :value="item.teacherId"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="科目">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.subjectId"
            placeholder="请选择科目"
            clearable
            filterable
          >
            <el-option
              v-for="item in subjectList"
              :key="item.subjectId"
              :label="item.subjectName"
              :value="item.subjectId"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="模块">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.moduleId"
            placeholder="请选择模块"
            clearable
            filterable
          >
            <el-option
              v-for="item in moduleList"
              :key="item.moduleId"
              :label="item.moduleName"
              :value="item.moduleId"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="copy(scope.row)">复制</el-button>
          <el-button type="text" @click="del(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getModuleOption,
  getSubjectOption,
  getTeacherOption
} from "@/util/option";
import {
  addTimetableList,
  getTimetableList,
  saveTimetableList
} from "@/api/commodityManage";
import { timeFn } from "@/components/Upload/common.js";
export default {
  props: {
    currentItem: {
      // 传入的数据
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showFlag: false,
      form: {},
      tableData: [],
      teacherList: [],
      subjectList: [],
      moduleList: [],
      defaultTeacher: "",
      backupObject: {},
      teacherId: ""
    };
  },
  watch: {
    // defaultTeacher(teacherId) {
    //   this.tableData = this.tableData.map(item => {
    //     item.teacherId = teacherId;
    //     return item;
    //   });
    // }
  },
  methods: {
    add() {
      this.tableData.push({ teacherId: this.defaultTeacher });
    },
    paste() {
      this.tableData.push({ ...this.backupObject });
      console.log(this.tableData);
    },
    async importTable(obj) {
      const { file } = obj;
      const { goodsId } = this.currentItem;
      await addTimetableList({ goodsId, file });
      this.$message.success("导入成功");
      this.getTableList();
    },
    clearTable() {
      this.tableData = [];
    },
    copy(row) {
      this.backupObject = { ...row };
      this.$message.success("复制成功");
    },
    del(scope) {
      const { $index } = scope;
      this.tableData.splice($index, 1);
    },
    async submit() {
      const { goodsId } = this.currentItem;
      const list = [...this.tableData];
      if (
        list.some((item, index, array) => {
          return new Date(item.startTime) > new Date(item.endTime);
        })
      ) {
        this.$message.error("保存失败,开始时间不能小于结束时间");
      } else {
        await saveTimetableList({ goodsId, list });
        this.$message.success("保存成功");
        this.showFlag = false;
        // this.getTableList();
      }
    },

    async getTableList() {
      const { goodsId } = this.currentItem;
      const data = await getTimetableList({ goodsId });
      data.data.forEach(item => {
        item.timeLength = timeFn(item.startTime, item.endTime);
      });
      this.tableData = data.data;
    },

    async open() {
      // 获取教师列表

      const t = await getTeacherOption();
      this.teacherList = t;
      // 获取科目列表
      const s = await getSubjectOption();
      this.subjectList = s;
      // 获取模块列表
      const m = await getModuleOption();
      this.moduleList = m;
      // 获取课表数据
      this.getTableList();
    }
  }
};
</script>

<style lang="scss" scoped></style>
