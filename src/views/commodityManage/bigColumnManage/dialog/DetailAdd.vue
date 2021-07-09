<!--
 * @Author: KokoTa
 * @Date: 2021-01-25 15:54:26
 * @LastEditTime: 2021-02-05 11:09:29
 * @LastEditors: KokoTa
 * @Description: 商品管理-通用附件添加组件
 * @FilePath: /future-bms/src/views/commodityManage/bigColumnManage/dialog/DetailAdd.vue
-->
<template>
  <el-dialog
    :title="`${listTitle}列表`"
    :visible.sync="showFlag"
    @open="open"
    append-to-body
  >
    <!-- 表格区域 -->
    <section>
      <!-- 表格操作 -->
      <div class="table-operation">
        <el-radio-group
          v-show="
            type === CommodityManageType.COLUMN_Manage ||
              type === CommodityManageType.VIP_MANAGE
          "
          v-model="listType"
          @change="listTypeChange"
        >
          <el-radio :label="1">课程</el-radio>
          <el-radio :label="2">视频</el-radio>
          <el-radio v-show="type === CommodityManageType.VIP_MANAGE" :label="3"
            >专栏</el-radio
          >
        </el-radio-group>
      </div>
      <div class="table-operation">
        <el-input
          v-if="type === CommodityManageType.COMMODITY_GROUP"
          class="w-180"
          v-model="searchData.goodsName"
          :placeholder="`请输入${listTitle}名称`"
          clearable
        ></el-input>
        <el-input
          v-else
          class="w-180"
          v-model="searchData.goodsName"
          :placeholder="`请输入${listTitle}名称`"
          clearable
        ></el-input>
        <el-button type="primary" size="small" @click="search">搜索</el-button>
        <span v-if="listType >= 4">
          <span style="margin-left: 10px;">老师：</span>
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
        </span>
      </div>
      <!-- 大专栏页下该组件只添加专栏 -->
      <!-- 专栏页下该组件添加商品管理的商品、商品管理的视频 -->
      <!-- 会员页下该组件添加商品管理的商品、商品管理的视频、专栏 -->
      <!-- 视频页下该组件添加素材管理的视频 -->
      <!-- 商品分组页下该组件商品管理的所有类型(即包括视频、专栏等等) -->
      <!-- 因此只有专栏和会员页下会显示单选组件 -->
      <!-- listType 有 1 2 3 4，分别对应商品管理的所有类型(即包括视频、专栏等等)、商品管理的视频、专栏、素材管理的视频 -->

      <!-- 列表有四种：商品管理的所有类型(即包括视频、专栏等等)、商品管理的视频、专栏、素材管理的视频 -->
      <!-- 前四种复用一个列表，最后一种单独用一个列表 -->
      <!-- 列表 -->
      <el-table
        v-if="listType < 4"
        class="table"
        height="400"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="goodsName" :label="listTitle">
          <template slot-scope="scope">
            <div class="image-wrap">
              <el-image
                class="image-content"
                :src="scope.row.coverUrl"
                :preview-src-list="[scope.row.coverUrl]"
              ></el-image>
              <div class="image-info">
                <div>{{ scope.row.goodsName }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="shelfStatusFormat"
          label="状态"
        ></el-table-column>
      </el-table>
      <!-- 列表 -->
      <el-table
        v-else
        class="table"
        height="400"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="resourceName" label="视频名称"></el-table-column>
        <el-table-column prop="sizeFormat" label="大小"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <Pagination
        :page-no="page.pageNo"
        :page-size="page.pageSize"
        :total-count="page.totalCount"
        @currentChange="currentPageChange"
        @sizeChange="currentSizeChange"
      />
    </section>
    <span slot="footer">
      <el-button type="default" size="small" @click="showFlag = false"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import PaginationMixin from "@/mixin/pagination";
import { CommodityManageType } from "@/util/constant";
import { getEamCatalogResourcesList } from "@/api/eamCatalogResourcesManage";
import { requestList } from "@/util";
import filesize from "filesize";
import { getGoodsGroupGoods } from "@/api/commodityGroup";
import { formatShelfStatus } from "@/util/format";
import { getListGoods } from "@/api/commodityManage";
import {
  getModuleOption,
  getSubjectOption,
  getTeacherOption
} from "@/util/option";
export default {
  mixins: [PaginationMixin],
  props: {
    currentItem: {
      // 选中的表格行的数据（这里不使用 currentSelect 命名是因为会和 mixin 的命名冲突）
      type: Object,
      default: () => {}
    },
    type: {
      // 该组件是从哪个页面调用的，值为 CommodityManageType 枚举中的一个
      type: String,
      required: true
    }
  },
  data() {
    return {
      keyword: "",
      showFlag: false,
      tableData: [],
      isCreate: true,
      CommodityManageType,
      listType: 1,
      selectList: [],
      teacherList: [],
      defaultTeacher: ""
    };
  },
  watch: {
    type: {
      immediate: true,
      handler(type) {
        switch (type) {
          case CommodityManageType.BIG_COLUMN_MANAGE:
            this.listType = 3;
            break;
          case CommodityManageType.COLUMN_Manage:
            this.listType = 1;
            break;
          case CommodityManageType.VIP_MANAGE:
            this.listType = 1;
            break;
          case CommodityManageType.VIDEO_MANAGE:
            this.listType = 4;
            break;
          case CommodityManageType.COMMODITY_GROUP:
            this.listType = 1;
            break;
          default:
            this.listType = 0;
            break;
        }
      }
    }
  },
  computed: {
    listTitle() {
      switch (this.listType) {
        case 1:
          return "课程";
        case 2:
          return "视频";
        case 3:
          return "专栏";
        case 4:
          return "素材视频";
        default:
          return "";
      }
    }
  },
  mounted() {},
  methods: {
    listTypeChange(val) {
      console.log(val);
      this.getList();
    },
    create() {},
    selectChange(rows) {
      console.log(rows);
      this.selectList = [...rows];
    },
    async submit() {
      if(this.defaultTeacher) {
        this.$emit("getSelectList", {
          selectList: this.selectList,
          teacherId: this.defaultTeacher
        });
        this.showFlag = false;
      } else {
        this.$message.warning("请选择老师");
      }
    },
    async getList(params = this.searchData) {
      if (this.type === CommodityManageType.VIDEO_MANAGE) {
        const t = await getTeacherOption();
        this.teacherList = t;

        const res = await requestList(
          getEamCatalogResourcesList,
          { ...params, resourceType: 2 },
          this.page
        );
        this.tableData = res.content.map(item => {
          item.sizeFormat = filesize(item.size);
          return item;
        });
        this.page = res.page;
      }
      if (
        this.type === CommodityManageType.COLUMN_Manage ||
        this.type === CommodityManageType.VIP_MANAGE ||
        this.type === CommodityManageType.BIG_COLUMN_MANAGE
      ) {
        var goodsType =
          this.listType == 1 ? "02" : this.listType == 2 ? "01" : "04";
        const res = await requestList(
          getListGoods,
          { ...params, goodsType: goodsType },
          this.page
        );
        this.tableData = res.content.map(item => {
          // item.sizeFormat = filesize(item.size);
          item.shelfStatusFormat = formatShelfStatus(item.shelfStatus);
          return item;
        });
        this.page = res.page;
      }
      if (this.type === CommodityManageType.COMMODITY_GROUP) {
        const res = await requestList(
          getGoodsGroupGoods,
          { ...params },
          this.page
        );
        this.tableData = res.content.map(item => {
          item.shelfStatusFormat = formatShelfStatus(item.shelfStatus);
          return item;
        });
        this.page = res.page;
      }
    },
    async open() {
      setTimeout(() => {
        this.selectList = [];
        this.getList();
      }, 0);
    }
  }
};
</script>

<style></style>
