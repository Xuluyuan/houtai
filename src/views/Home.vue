<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      sessionStorage.clear("token");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="stylus" scoped></style>
