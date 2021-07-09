<!--
 * @Author: KokoTa
 * @Date: 2021-01-15 11:33:19
 * @LastEditTime: 2021-01-22 15:15:55
 * @LastEditors: KokoTa
 * @Description:
 * @FilePath: /future-bms/src/components/SelectMaterial/index.vue
-->
<template>
  <div>
    <img
      :class="[type ? 'wh-200' : 'wh-100']"
      v-if="form.url && resourceType != 4 && iShow"
      :src="form.url"
    />
    <!-- 协议说明 -->
    <div v-if="resourceType == 4" class="determinebox">
      <el-input
        class="inputSmall"
        size="small"
        :placeholder="form.agreementName || '请选择协议'"
        :disabled="true"
      ></el-input>
      <el-button class="lockAgr" size="mini" @click="readAgreement"
        >查看协议</el-button
      >
      <el-button size="mini" :disabled="disabled" @click="showFlag = true"
        >选择协议</el-button
      >
    </div>
    <el-button
      v-if="resourceType != 4"
      size="mini"
      :disabled="disabled"
      @click="showFlag = true"
      >选择素材</el-button
    >
    <!-- 资源弹窗 -->
    <el-dialog
      title="选择资源"
      :visible.sync="showFlag"
      @open="open"
      append-to-body
    >
      <el-form ref="form" label-width="50px">
        <el-form-item label="分类">
          <el-select
            v-model="queryParam.catalogId"
            placeholder="请选择分类"
            clearable
          >
            <el-option
              v-for="item in typeList"
              :key="item.catalogId"
              :label="item.catalogName"
              :value="item.catalogId"
              >{{ item.catalogName }}</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input
            v-model="queryParam.resourceName"
            placeholder="请输入名称"
            clearable
          ></el-input>
          <el-button type="primary" size="mini" @click="searchQuery"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table class="table" :data="tableData" height="400" border>
        <el-table-column label="资源" width="250">
          <template slot-scope="scope">
            <div class="image-wrap">
              <el-image
                v-if="resourceType != 4"
                class="image-content"
                :src="scope.row.previewUrl"
                :preview-src-list="[scope.row.previewUrl]"
                :z-index="3000"
              ></el-image>
              <div class="image-info">
                <div>名称：{{ scope.row.resourceName }}</div>
                <!-- <div>价格：{{ scope.row.resourceName }}</div> -->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="filesize" label="大小"></el-table-column>
        <el-table-column
          prop="uploadTimeFormat"
          label="上传时间"
          width="120"
        ></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="select(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination :ipagination="ipagination" @pagination="handlePag" />
    </el-dialog>
  </div>
</template>

<script>
import { getCatalogList } from "@/api/itemManage";
// import PaginationMixin from "@/mixin/pagination";
import Pagination from "@/components/Pagination";
import { getEamCatalogResourcesList } from "@/api/eamCatalogResourcesManage";
import { checkIsVideoOrAudio, requestList } from "@/util";
import filsize from "filesize";
import { formatTableTime } from "@/util/format";
import mediaImage from "@/assets/imgs/media.jpg";
import { dfwlListMixin } from "@/mixin/dfwlListMixin";

export default {
  name: "SelectMaterial",
  mixins: [dfwlListMixin],
  components: { Pagination },
  props: {
    resourceType: {
      // 资源类型
      type: Number,
      required: true
    },
    type: {
      type: String
    },
    disabled: {
      // 选择资源按钮是否可点击
      type: Boolean,
      default: false
    },
    iShow: {
      type: Boolean
    },
    url: {
      type: String,
      default: ""
    },
    agreementName: {
      type: String,
      default: ""
    },
    agreementUrl: {
      type: String,
      default: ""
    }
  },
  watch: {
    url: {
      immediate: true,
      handler(val) {
        if (val) this.form = { url: val };
      }
    },
    agreementName: {
      immediate: true,
      handler(val) {
        if (val) this.form = { agreementName: val };
      }
    }
  },
  data() {
    return {
      showFlag: false,
      form: {},
      typeList: [],
      tableData: [],
      queryParam: {
        catalogId: [],
        resourceName: ""
      },
      disableMixinCreated: true
    };
  },
  created() {
    console.log(this.iShow);
  },
  methods: {
    async select(row) {
      const { resourceUrl, resourceName } = row;
      this.form.url = resourceUrl;
      this.form.resourceName = resourceName;
      this.resourceType === 4
        ? this.$emit("selected", row)
        : this.$emit("selected", resourceUrl);
      this.showFlag = false;
    },

    /**
     * 请求函数
     */
    async getList() {
      const params = this.getQueryParams();
      const { data } = await getEamCatalogResourcesList(params);
      this.tableData = data.content.map(item => {
        item.filesize = filsize(item.size);
        item.uploadTimeFormat = formatTableTime(item.uploadTime);
        item.previewUrl = checkIsVideoOrAudio(item.resourceUrl)
          ? mediaImage
          : item.resourceUrl;
        return item;
      });
      this.ipagination.total = data.totalElements;
      this.ipagination.pageCount = data.totalPages;
    },
    async getTypeList() {
      const { resourceType } = this;
      const data = await getCatalogList({
        resourceType
      });
      this.typeList = data.data.content;
    },

    open() {
      this.form = {};
      this.getTypeList();
      this.getList();
    },
    async readAgreement(val) {
      window.open(this.agreementUrl);
    },
    searchQuery() {
      this.getTypeList();
      this.getList();
    },
    handlePag(isPageChange, page) {
      if (isPageChange) {
        this.ipagination.current = page;
      } else {
        this.ipagination.pageSize = page;
      }
      this.getList();
    }
  }
};
</script>

<style lang="stylus" scoped>
.wh-200 {
  height: 200px;
  width: 200px;
}
.determinebox{
    /deep/.el-form-item__label{
      width: 130px !important;
    }
    .lockAgr{
      margin-left: 20px;
    }
    .inputSmall{
      width: 300px;
    }
  }
</style>
