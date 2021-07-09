<template>
  <el-dialog width="1000px" :visible.sync="showFlag">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        v-for="(item, index) in addressFormArray"
        :key="item.label + index"
      >
        <el-input
          v-model="form[item.prop]"
          :placeholder="`请输入${item.label}`"
          v-if="item.type == 'text' || item.type == 'textarea'"
          :type="item.type"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="buttonArray">
      <el-button type="primary" @click="save">保存</el-button>

      <el-button type="primary" @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ["addressFormArray"],
  data() {
    return {
      showFlag: false,
      form: {}
    };
  },
  methods: {
    cancel() {
      this.showFlag = false;
    },
    save() {
      this.$emit("addressSave", this.form);
      this.showFlag = false;
    }
  }
};
</script>
<style scoped lang="scss">
@import "orderCommon";
.buttonArray {
  @include displayFlex(row, center, center);
}
.el-input,
.el-select {
  width: 300px;
}
.el-textarea {
  width: 55%;
}
</style>
