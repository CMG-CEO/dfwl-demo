<!--
 * @Author: KokoTa
 * @Date: 2021-01-25 15:54:18
 * @LastEditTime: 2021-02-05 11:03:50
 * @LastEditors: KokoTa
 * @Description: 商品管理-通用详情组件
 * @FilePath: /future-bms/src/views/commodityManage/bigColumnManage/dialog/Detail.vue
-->
<template>
  <el-dialog title="详情" width="1000px" :visible.sync="showFlag" @open="open">
    <!-- 头消息 -->
    <div
      v-if="type === CommodityManageType.COMMODITY_GROUP"
      class="detail-title"
    >
      <span class="info">商品分组名称：{{ detailInfo.name }}</span>
      <span class="info">备注：{{ detailInfo.remark }}</span>
    </div>
    <div v-else class="detail-title detail-flex">
      <img class="detail-img" :src="currentItem.coverUrl" alt />
      <div class="detail-content">
        <h4 class="detail-content-header">{{ currentItem.goodsName }}</h4>
        <p class="detail-content-seq">{{ currentItem.introduce }}</p>
        <!-- <div class="text-red">¥{{ currentItem.price }}</div> -->
        <div class="text-red">
          {{ changeStatus(currentItem) }}
        </div>
      </div>
    </div>

    <!-- 表格区域 -->
    <section>
      <!-- 表格操作 -->
      <div class="table-operation">
        <el-button type="primary" size="small" @click="add"
          >添加{{ detailName }}</el-button
        >
      </div>
      <!-- 大专栏页下该组件只有专栏列表 -->
      <!-- 专栏页下该组件只有商品列表 -->
      <!-- 会员页下该组件有专栏列表和商品列表 -->
      <!-- 视频页下该组件只有视频列表 -->
      <!-- 商品分组页下该组件只有商品列表 -->
      <!-- 因此只有会员页下会显示单选组件 -->
      <div class="table-operation">
        <el-radio-group
          v-show="type === CommodityManageType.VIP_MANAGE"
          v-model="listType"
          @change="changeListType"
        >
          <el-radio :label="1">专栏</el-radio>
          <el-radio :label="2">单品</el-radio>
          <!-- <el-radio :label="3">视频</el-radio> -->
        </el-radio-group>
      </div>
      <!-- 列表有三种：专栏、商品、视频 -->
      <el-table
        v-show="listType === 1 && this.type !== CommodityManageType.VIP_MANAGE"
        class="table"
        height="500"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="专栏名称" width="250px">
          <template slot-scope="scope">
            <div class="image-wrap">
              <el-image
                class="image-content"
                :src="scope.row.coverUrl"
                :preview-src-list="[scope.row.coverUrl]"
              ></el-image>
              <div class="image-info">
                <div>{{ scope.row.goodsName }}</div>
                <div class="text-red">
                  {{ changeStatus(scope.row) }}
                </div>
                <!-- <div class="text-red">价格：¥{{ scope.row.price }}</div> -->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="soldQuantity" label="已购买数"></el-table-column>
        <el-table-column
          prop="shelfStatusFormat"
          label="状态"
        ></el-table-column>
        <el-table-column
          prop="createTimeFormat"
          label="关联时间"
        ></el-table-column>
        <el-table-column
          prop="operator"
          label="关联操作人"
          width="100px"
        ></el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <!-- <el-button type="text" @click="sort">排序</el-button>
            <el-button type="text" @click="sort">查看</el-button>
            <el-button type="text" @click="detail">详情</el-button> -->
            <el-button type="text" @click="share">分享</el-button>
            <el-button type="text" @click="del">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="listType === 2 || this.type == CommodityManageType.VIP_MANAGE"
        class="table"
        height="500"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="单品名称" width="250px">
          <template slot-scope="scope">
            <div class="image-wrap">
              <el-image
                class="image-content"
                :src="scope.row.coverUrl"
                :preview-src-list="[scope.row.coverUrl]"
              ></el-image>
              <div class="image-info">
                <div>{{ scope.row.goodsName }}</div>
                <div class="text-red">
                  {{ changeStatus(scope.row) }}
                </div>
                <!-- <div class="text-red">价格：¥{{ scope.row.price }}</div> -->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="soldQuantity" label="已购买数"></el-table-column>
        <el-table-column
          prop="shelfStatusFormat"
          label="状态"
        ></el-table-column>
        <el-table-column
          prop="shelfDateFormat"
          label="上架时间"
        ></el-table-column>
        <el-table-column
          prop="createTimeFormat"
          label="关联时间"
        ></el-table-column>
        <el-table-column
          prop="operator"
          label="关联操作人"
          width="100px"
        ></el-table-column>
        <el-table-column label="操作" width="200">
          <template>
            <!-- <el-button type="text" @click="sort">排序</el-button> -->
            <!-- <el-button type="text" @click="sort">查看</el-button> -->
            <el-button type="text" @click="share">分享</el-button>
            <el-button type="text" @click="del">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-show="listType === 3 && this.type !== CommodityManageType.VIP_MANAGE"
        class="table"
        height="500"
        :data="tableData"
        border
        @row-click="getCurrentSelect"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="fileName" label="视频名称" width="300px">
          <template slot-scope="scope">
            <div class="image-wrap">
              <el-image
                class="image-content"
                :src="scope.row.thumbnailUrl"
                :preview-src-list="[scope.row.thumbnailUrl]"
              ></el-image>
              <div class="image-info">
                <div>{{ scope.row.fileName }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="length" label="时长"></el-table-column>
        <el-table-column prop="sizeFormat" label="视频大小"></el-table-column>
        <el-table-column prop="teacherName" label="老师"></el-table-column>
        <el-table-column
          prop="uploadTimeFormat"
          label="上传时间"
        ></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text" @click="sort">排序</el-button>
            <el-button type="text" @click="del">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- <Pagination
        :page-no="page.pageNo"
        :page-size="page.pageSize"
        :total-count="page.totalCount"
        @currentChange="currentPageChange"
        @sizeChange="currentSizeChange"
      /> -->
    </section>

    <!-- 商品列表 -->
    <DetailAdd
      ref="DetailAdd"
      :currentItem="currentSelect"
      :type="type"
      @getSelectList="getSelectList"
    ></DetailAdd>

    <!-- 商品排序 -->
    <DetailSort
      ref="DetailSort"
      :currentItem="currentSelect"
      @reload="getDetail()"
    ></DetailSort>
  </el-dialog>
</template>

<script>
import PaginationMixin from "@/mixin/pagination";
import DetailAdd from "@/views/commodityManage/bigColumnManage/dialog/DetailAdd";
import { CommodityManageType } from "@/util/constant";
import {
  addGoodsVideoAttach,
  delGoodsVideoAttach,
  getGoodsVideo
} from "@/api/videoManage";
import filesize from "filesize";
import { formatShelfStatus, formatTableTime } from "@/util/format";
import DetailSort from "@/views/commodityManage/bigColumnManage/dialog/DetailSort";
import {
  addGoodsGroupGoods,
  delGoodsGroupGoods,
  getGoodsGroup
} from "@/api/commodityGroup";
import {
  getVipmange,
  addVipmanager,
  delVipInterests
} from "@/api/smallColumnmembershipCard";
import axios from "axios";
import {
  getBigColumn,
  addBigColumnCommodity,
  delBigColumnSingleProduct
} from "@/api/bigColumnManage";
import {
  getSmallColumn,
  addSmallColumnCommodity,
  delSmallColumnSingleProduct
} from "@/api/smallColumnManage";
import {
  getModuleOption,
  getSubjectOption,
  getTeacherOption
} from "@/util/option";
export default {
  components: { DetailAdd, DetailSort },
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
  watch: {
    type: {
      immediate: true,
      handler(type) {
        switch (type) {
          case CommodityManageType.BIG_COLUMN_MANAGE:
            this.detailName = "专栏";
            this.listType = 1;
            break;
          case CommodityManageType.COLUMN_Manage:
            this.detailName = "单品";
            this.listType = 2;
            break;

          case CommodityManageType.VIP_MANAGE:
            this.detailName = "会员卡权益";
            this.listType = 1;
            break;
          case CommodityManageType.VIDEO_MANAGE:
            this.detailName = "视频";
            this.listType = 3;
            break;
          case CommodityManageType.COMMODITY_GROUP:
            this.detailName = "商品";
            this.listType = 2;
            break;
          default:
            this.detailName = "";
            this.listType = 0;
            break;
        }
      }
    }
  },
  data() {
    return {
      showFlag: false,
      tableDataBackup: [],
      tableData: [],
      isCreate: true,
      CommodityManageType,
      detailName: "",
      listType: 1,
      detailInfo: {},
      teacherList: []
    };
  },
  methods: {
    changeStatus({ singleSaleType, price }) {
      console.log(singleSaleType)
      switch (singleSaleType) {
        case "1":
          return `${price}元`;
          break;
        case "2":
          return "免费";
          break;
        case "3 ":
          return "加密";
          break;
      }
    },
    changeListType() {
      this.getDetail();
    },
    add() {
      this.$refs.DetailAdd.showFlag = true;
    },
    sort() {
      this.$refs.DetailSort.showFlag = true;
    },
    del() {
      this.$confirm("确定删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          if (this.type === CommodityManageType.VIDEO_MANAGE) {
            const { goodsAttachId } = this.currentSelect;
            await delGoodsVideoAttach({ goodsAttachId });
          }
          if (this.type === CommodityManageType.COMMODITY_GROUP) {
            const { goodsId } = this.currentSelect;
            await delGoodsGroupGoods({ goodsId });
          }
          if (this.type === CommodityManageType.BIG_COLUMN_MANAGE) {
            const { goodsLinkId } = this.currentSelect;
            await delBigColumnSingleProduct({ goodsLinkId });
          }
          if (this.type === CommodityManageType.COLUMN_Manage) {
            const { goodsLinkId } = this.currentSelect;
            await delSmallColumnSingleProduct({ goodsLinkId: goodsLinkId });
          }
          if (this.type === CommodityManageType.VIP_MANAGE) {
            const { goodsLinkId } = this.currentSelect;
            await delVipInterests({ goodsLinkId: goodsLinkId });
          }
          this.$message.success("删除成功");
          this.getDetail();
        })
        .catch(() => {});
    },
    detail() {},
    share() {
      this.$message.info("暂无实现");
    },
    async getSelectList({ selectList, teacherId }) {
      const { goodsId, goodsGroupId } = this.currentItem;
      if (this.type === CommodityManageType.VIDEO_MANAGE) {
        const ids = selectList.map(item => item.catalogResourceId);
        await addGoodsVideoAttach({
          catalogResourceIds: ids,
          goodsId,
          teacherId
        });
        this.$message.success("视频添加成功");
      }
      if (this.type === CommodityManageType.COLUMN_Manage) {
        console.log(selectList);
        const ids = [];
        selectList.map(item => {
          ids.push(item.goodsId);
        });
        // axios
        //   .post("/api2//basic/goodsColumn/subGoods", {
        //     cgoodsIds: ids,
        //     goodsId
        //   })
        //   .then(function(response) {
        //     console.log(response);
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });
        await addSmallColumnCommodity({ cgoodsIds: ids, goodsId });
        this.$message.success("专栏商品添加成功");
      }

      if (this.type === CommodityManageType.COMMODITY_GROUP) {
        const ids = selectList.map(item => item.goodsId);
        await addGoodsGroupGoods({ goodsIds: ids, goodsGroupId });
        this.$message.success("商品添加成功");
      }
      if (this.type === CommodityManageType.BIG_COLUMN_MANAGE) {
        const ids = selectList.map(item => item.goodsId);

        await addBigColumnCommodity({ cgoodsIds: ids, goodsId });
        this.$message.success("商品添加成功");
      }
      if (this.type === CommodityManageType.VIP_MANAGE) {
        const ids = selectList.map(item => item.goodsId);
        await addVipmanager({ cgoodsIds: ids, goodsId });
        this.$message.success("会员权益添加成功");
      }

      this.getDetail();
    },

    async getList() {
      const { pageNo, pageSize } = this.page;
      if (this.tableDataBackup) {
        this.page.totalCount = this.tableDataBackup.length;
        this.tableData = this.tableDataBackup
        // 限制展示10条
        // this.tableData = this.tableDataBackup.slice(
        //   (pageNo - 1) * pageSize,
        //   pageNo * pageSize
        // );
      }
    },

    async getDetail() {
      if (this.type === CommodityManageType.VIP_MANAGE) {
        const { goodsId } = this.currentItem;
        let goodsType =
          this.listType == 1 ? "04" : this.listType == 2 ? "02" : "01";
        const res = await getVipmange({
          goodsId
        });
        this.detailInfo = res.data;
        // 根据 listType 赋予对应的列表值
        if (this.listType === 1)
          this.tableDataBackup = this.detailInfo.childColumnList;
        if (this.listType === 2)
          this.tableDataBackup = this.detailInfo.childSingleGoodsList;
        // if (this.listType === 3) {
        //   this.tableDataBackup = this.detailInfo.childResourceList
        //     ? this.detailInfo.childResourceList.map(item => {
        //         item.sizeFormat = filesize(item.size);
        //         item.uploadTimeFormat = formatTableTime(item.uploadTime);
        //         return item;
        //       })
        //     : [];
        // }
      }
      if (this.type === CommodityManageType.VIDEO_MANAGE) {
        const { goodsId } = this.currentItem;
        const t = await getTeacherOption();
        this.teacherList = t;
        const res = await getGoodsVideo({ goodsId });
        this.detailInfo = res.data;
        // 根据 listType 赋予对应的列表值
        if (this.listType === 1)
          this.tableDataBackup = this.detailInfo.childColumnList;
        if (this.listType === 2)
          this.tableDataBackup = this.detailInfo.childSingleGoodsList;
        if (this.listType === 3) {
          this.tableDataBackup = this.detailInfo.childResourceList.map(item => {
            item.sizeFormat = filesize(item.fileSize);
            try {
              this.teacherList.forEach(item2 => {
                if (item2.teacherId == item.teacherId) {
                  item.teacherName = item2.nickName;
                  throw new Error("Error");
                }
              });
            } catch (e) {
              console.log(e);
            }
            item.uploadTimeFormat = formatTableTime(item.uploadTime);

            return item;
          });
        }
      }
      if (this.type === CommodityManageType.COLUMN_Manage) {
        const { goodsId } = this.currentItem;
        const res = await getSmallColumn({ goodsId });
        this.detailInfo = res.data;
        this.tableDataBackup = this.detailInfo.childSingleGoodsList.map(
          item => {
            item.createTimeFormat = formatTableTime(item.createTime);
            item.shelfDateFormat = formatTableTime(item.shelfDate);
            item.shelfStatusFormat = formatShelfStatus(item.shelfStatus);
            return item;
          }
        );
      }
      if (this.type === CommodityManageType.BIG_COLUMN_MANAGE) {
        const { goodsId } = this.currentItem;
        const res = await getBigColumn({ goodsId });
        this.detailInfo = res.data;
        this.tableDataBackup = this.detailInfo.childColumnList.map(item => {
          item.createTimeFormat = formatTableTime(item.createTime);
          item.shelfDateFormat = formatTableTime(item.shelfDate);
          item.shelfStatusFormat = formatShelfStatus(item.shelfStatus);
          return item;
        });
      }
      if (this.type === CommodityManageType.COMMODITY_GROUP) {
        const { goodsGroupId } = this.currentItem;
        const res = await getGoodsGroup({ goodsGroupId });
        this.detailInfo = res.data;
        this.tableDataBackup = this.detailInfo.childGoodsList.map(item => {
          item.createTimeFormat = formatTableTime(item.createTime);
          item.shelfDateFormat = formatTableTime(item.shelfDate);
          item.shelfStatusFormat = formatShelfStatus(item.shelfStatus);
          return item;
        });
      }

      this.getList();
    },
    async open() {
      setTimeout(async () => {
        this.getDetail();
      }, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-title {
  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 10px;
  .info {
    display: block;
    font-size: 16px;
    line-height: 2;
  }
}
.detail-flex {
  display: flex;
  .detail-img {
    width: 200px;
    height: 200px;
  }
  .detail-content {
    margin-left: 20px;
  }
}
</style>
