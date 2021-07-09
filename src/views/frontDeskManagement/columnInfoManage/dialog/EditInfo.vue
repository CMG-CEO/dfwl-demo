<template>
  <div>
    <!-- 资源弹窗 -->
    <el-form ref="form" :model="searchData" label-width="50px">
      <el-form-item label="商品类型" label-width="100px">
        <el-select
          v-model="searchData.goodsType"
          placeholder="请选择商品类型"
          clearable
        >
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.itemName"
            :value="item.goodsType"
            >{{ item.itemName }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" label-width="100px">
        <el-input
          v-model="searchData.goodsName"
          placeholder="请输入商品名称"
          clearable
        ></el-input>
        <el-button type="primary" size="mini" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table class="table" :data="tableData" height="400" border>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <div class="image-wrap">
            <el-image
              class="image-content"
              :src="scope.row.detailsInfo"
              :preview-src-list="[scope.row.previewUrl]"
            ></el-image>
            <div class="image-info">
              <!-- 名称： -->
              <div>{{ scope.row.goodsName }}</div>
              <!-- 价格 -->
              <!-- <div>{{ scope.row.goodsName }}</div> -->
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          {{ scope.row.shelfStatus | shelfStatusFilter }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="select(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :page-no="page.pageNo"
      :page-size="page.pageSize"
      :total-count="page.totalCount"
      @currentChange="currentPageChange"
      @sizeChange="currentSizeChange"
    />
  </div>
</template>

<script>
import { getListGoods } from "@/api/commodityManage";
import PaginationMixin from "@/mixin/pagination";
import { addColumnsSelect } from "@/api/columnInfoManage";
import { requestList } from "@/util";
import { querySelect } from "@/api/testManagement";
import { getCommuneId, getUserId } from "@/util/auth";

export default {
  mixins: [PaginationMixin],
  props: {
    url: {
      type: String,
      default: "",
    },
    setSelectId: {
      type: [Number, String],
    },
  },
  watch: {
    url: {
      immediate: true,
      handler(val) {
        if (val) this.form = { url: val };
      },
    },
  },
  data() {
    return {
      showFlag: true,
      form: {},
      typeList: [],
      tableData: [],
    };
  },
  filters: {
    shelfStatusFilter(val) {
      if (+val === 2) {
        return "上架";
      } else if (+val === 3) {
        return "下架";
      } else {
        return "待上架";
      }
    },
  },
  created() {
    this.open();
  },
  methods: {
    async select(row) {
      if (!this.setSelectId) {
        this.$message.error("请先选择栏目");
        return;
      }
      const { goodsId, goodsName } = row;
      this.form.goodsName = goodsName;
      this.showFlag = true;
      const addData = {
        accountId: getCommuneId(),
        appColumnsId: this.setSelectId,
        columnsDetailId: "",
        createTime: row.createTime,
        createUser: getUserId(),
        indexNo: 0,
        objectId: row.goodsId,
        objectName: row.goodsName,
        objectType: "1",
        objectTypeName: "商品信息",
      };
      await addColumnsSelect(addData);
      this.$emit("reload");
    },

    /**
     * 商品全部列表展示
     */
    async getList(params = this.searchData) {
      const data = await requestList(getListGoods, params, this.page);
      this.tableData = data.content.map((item) => {
        return item;
      });
      this.page = data.page;
    },
    async open() {
      this.form = {};
      let { data } = await querySelect({
        dictCodes: "goods_type",
      });
      for (var i = 0; i < data.goods_type.length; i++) {
        data.goods_type[i].goodsType = data.goods_type[i].itemCode;
      }
      this.typeList = data.goods_type;
      this.getList();
    },
  },
};
</script>

<style lang="stylus" scoped>
.wh-200 {
  height: 200px;
  width: 200px;
}

.determinebox {
  /deep/.el-form-item__label {
    width: 130px !important;
  }

  .lockAgr {
    margin-left: 20px;
  }

  .inputSmall {
    width: 300px;
  }
}
</style>
