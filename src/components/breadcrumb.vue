<template>
  <div class="head-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="path in breadcrumbs" :to="path.url" :key="path.key">{{ path.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: []
    }
  },
  computed: {
    breadcrumbs() {
      let path = [];
      let length = this.$route.matched.length - 1;
      for( let i = 0; i < this.$route.matched.length; i++ ) {
        const m = this.$route.matched[i];
        // 支持让路由自行指定一个父级路由，这样面包屑的可配置度高一些
        if( m.meta.parentPath && m.meta.parentPath.length) {
          m.meta.parentPath.forEach(v => {
            // 客户详情(假如是患者列表进，患者主要信息页面，再进患者详情页面，这样的话，父url是一直变化的是要动态配置的用下面的方法)
            if(v.parentName == '客户详情') {
              v.parentUrl = '/organMgt/' + this.$store.getters.organId
            }
            path.push({
              key: Math.random(),
              url: v.parentUrl,
              name: v.parentName
            });
          })
        }
        path.push({
          key: Math.random(),
          name: m.meta.name,
          // 1、最后一层面包屑，即当前页面自身不加链接
          // 2、每集链接先检查meta.redirect是否设置，有设置的话以redirect为准，否则以其path为目标
          url: i < length ? ( typeof(m.meta.redirect) != 'undefined' ? m.meta.redirect : m.path ) : null
        });
      }
      return path;
    }
  }
};
</script>

<style lang='scss' scoped>
  .head-container {
    height: 40px;
    display: flex;
    align-items: center;
    // background-color: #F5F7FB;
  }
</style>