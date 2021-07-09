<template>
  <div></div>
</template>

<script>
export default {
  created() {
    // const jurisdiction = this.$route.query.id.split("-");
    const jurisdiction = this.$route.query.id;
    // 根据路由判断当前用户权限
    const urlQuery = jurisdiction.indexOf("query,read") ? false : true;
    const urlCreate = jurisdiction.indexOf("urlCreate") ? false : true;
    const urlUpdate = jurisdiction.indexOf("urlUpdate") ? false : true;
    const urlDelete = jurisdiction.indexOf("urlDelete") ? false : true;

    let type = {
      urlQuery: urlQuery,
      urlCreate: urlCreate,
      urlUpdate: urlUpdate,
      urlDelete: urlDelete,
    };
    console.log(type);
    this.$emit("getJurisdiction", type);
  },
};
</script>

<style lang="scss" scoped>
</style>
