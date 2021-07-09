<template>
  <el-dialog
    :title="title"
    width="1000px"
    :visible.sync="showFlag"
    @open="open"
  >
    <div class="paperfile">
      <img class="paperfile_img" :src="paperData.coverUrl" alt="" />
      <div class="paperfile_info">
        <div>{{ paperData.goodsName }}</div>
        <div>{{ paperData.introduce }}</div>
        <div>￥{{ paperData.price }}</div>
      </div>
    </div>
    <AddFile
      @endfile="open"
      ref="AddFile"
      :type="type"
      :paperData="paperData"
    ></AddFile>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        v-if="type === 'testPaper'"
        fixed
        prop="examName"
        label="试卷名称"
        width="300"
      >
      </el-table-column>
      <el-table-column
        v-if="type === 'testFile'"
        fixed
        prop="fileName"
        label="文件名称"
        width="400"
      >
      </el-table-column>
      <el-table-column
        v-if="type === 'testPaper'"
        prop="status"
        label="下发状态"
        width="260"
      >
      </el-table-column>
      <el-table-column
        v-if="type === 'testPaper'"
        prop="answerTime"
        label="关联时间"
        width="260"
      >
      </el-table-column>
      <el-table-column
        v-if="type === 'testFile'"
        prop="createTime"
        label="关联时间"
        :width="360"
      >
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="type === 'testPaper'"
            @click="setShelfClick(scope.row)"
            type="text"
            size="small"
            >设置</el-button
          >
          <el-button type="text" size="small" @click="delGsm(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="showFlag = false"
        >确定</el-button
      >
    </span>
    <!-- 上架设置 -->
    <el-dialog
      class="setStatus"
      :modal="false"
      title=""
      :visible.sync="dialogFormVisible"
    >
      <el-form :rules="rules">
        <el-form-item prop="shelfType">
          <el-radio-group
            v-if="type === 'testPaper'"
            class="sheShelfType"
            v-model="shelfType"
          >
            <el-radio label="1">立即下发，随时做题 </el-radio>
            <el-radio label="2"
              >定时下发
              <!-- value-format="yyyy-MM-dd HH:mm:ss" -->
              <el-form-item style="display: inline-block" prop="timeValue">
                <el-date-picker
                  v-model="timeValue"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-radio>
            <el-radio label="3">暂不下发</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveShelf">确 定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>
<script>
// 添加 试卷
import AddFile from "@/views/commodityManage/bigColumnManage/dialog/AddFile";
import {
  getGsmGoodsExamById,
  delgsmGoodsExam,
  delgsmGoodsFile,
  getGsmGoodsFileById,
  gsmGoodsExam,
} from "@/api/itemManage";
import { createRequiredRules } from "@/util";
export default {
  components: { AddFile },
  props: {
    currentItem: {
      // 传入的数据
      type: String,
      default: "0",
    },
    type: {
      // 传入的数据
      type: String,
      default: "",
    },
  },
  data() {
    const saleFlagValidator2 = (rule, value, callback) => {
      this.shelfType = "2";
      if (this.timeValue && new Date() > new Date(this.timeValue)) {
        callback(new Error("定时上架时间要大于等于当前时间"));
        return;
      }
      callback();
    };
    return {
      showFlag: false,
      form: { hideFlag: false },
      title: "",
      tableData: [],
      paperData: {},
      dialogFormVisible: false,
      shelfType: "",
      timeValue: "",
      setDataRes: "",
      rules: {
        ...createRequiredRules(["timeValue"], ["时间"]),
        timeValue: [{ validator: saleFlagValidator2, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 设置
    setShelfClick(row) {
      console.log(row);
      this.shelfType = row.status;
      this.timeValue = row.answerTime;
      this.setDataRes = row;
      this.dialogFormVisible = true;
    },
    // 保存上架设置
    async saveShelf() {
      this.dialogFormVisible = false;
      this.timeValue = this.shelfType === "2" ? this.timeValue : "";
      console.log(this.timeValue)
      const data = {
        answerTime: this.timeValue,
        goodsExamId: this.setDataRes.goodsExamId,
        goodsId: this.setDataRes.goodsId,
        status: this.shelfType,
      };
      await gsmGoodsExam(data);
      this.getGsmGoodsExamById();
    },
    // 添加试卷
    addFileClick() {
      this.$refs.AddFile.showFlag = true;
    },
    // 删除试卷/文件
    async delGsm(val) {
      if (this.type === "testPaper") {
        await delgsmGoodsExam(val.goodsExamId);
        this.getGsmGoodsExamById();
      } else if (this.type === "testFile") {
        await delgsmGoodsFile(val.goodsFileId);
        this.getGsmGoodsFile();
      }
    },
    // 试卷列表
    async getGsmGoodsExamById() {
      const goodsId = this.currentItem;
      const goodsData = await getGsmGoodsExamById(goodsId);
      this.paperData = goodsData.data;
      this.tableData = goodsData.data.gsmGoodsExamDetailAddVos;
    },
    // 文件列表
    async getGsmGoodsFile() {
      const goodsId = this.currentItem;
      const goodsData = await getGsmGoodsFileById(goodsId);
      this.paperData = goodsData.data;
      this.tableData = goodsData.data.gsmGoodsFileDetailAddVos;
    },
    async open() {
      // 判断打开方式
      if (this.type === "testPaper") {
        // 试卷
        this.title = "试卷"
        this.getGsmGoodsExamById();
      } else if (this.type === "testFile") {
        // 文件
        this.title = "文件"
        this.getGsmGoodsFile();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.paperfile {
  width: 100%;
  height: 160px;
  display: flex;
  justify-content: space-between;
  .paperfile_img {
    height: 160px;
    width: 160px;
  }
  .paperfile_info {
    flex: 1;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding-left: 30px;
    font-size: 16px;
  }
  .paperfile_info div:first-child {
    font-weight: bold;
  }
  .paperfile_info div:last-child {
    color: red;
  }
}
.setStatus {
  background: rgba(0, 0, 0, 0.1);
  .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.sheShelfType {
  width: 100%;
  height: 160px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 160px;
}
</style>
