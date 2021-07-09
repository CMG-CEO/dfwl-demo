<template>
  <div>
    <el-transfer
      v-model="resvalue"
      :data="data"
      :titles="titles"
      @change="getvalue"
    >
    </el-transfer>
  </div>
</template>

<script>

export default {
  props: [ "data", "value", "titles" ],
  data() {
    return {
      resvalue: this.value
    }
  },
  watch: {
    value(newval, oldval) {
      this.resvalue = newval
      this.getvalue(newval)
    }
  },
  methods: {
    getvalue(val) {
      this.$emit('getData', val)
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-transfer {
  height: 360px;
  margin-top: 40px;
  position: relative;
}
/deep/.el-transfer-panel{
 height: 360px;
}
/deep/ .el-dialog{
  min-width: 700px;
}
/deep/ .el-transfer-panel {
  // min-width: 200px;
  width: 230px;
}
/deep/ .el-transfer-panel:first-child {
  position: absolute;
  left: 412px;
}
/deep/ .el-transfer-panel:last-child {
  position: absolute;
}
/deep/ .el-transfer__buttons{
  position: absolute;
  top: 50%;
  left: 230px;
  margin-top: -31px;
  transform: rotate(180deg);
}
/deep/.el-checkbox-group{
  height: 350px;
}
</style>
