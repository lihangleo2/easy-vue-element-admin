<template>
  <div class="out_color">
    <div class="title">脑机运营后台</div>

    <el-aside width="200px">
      <el-menu
        style="border: none"
        background-color="#545c64"
        text-color="#fff"
        :router="true"
        :default-active="currentPath"
        :unique-opened="false"
      >
        <el-submenu index="1">
          <template #title><i class="el-icon-message"></i>患者</template>
          <el-menu-item index="/patientMessage">患者信息</el-menu-item>
          <el-menu-item index="/patientManager">患者管理</el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <template #title><i class="el-icon-menu"></i>康复</template>
          <el-menu-item index="/recoverPlan">康复方案</el-menu-item>
          <el-menu-item index="/recoverRecord">康复记录</el-menu-item>
        </el-submenu>

        <el-menu-item index="/setting">
          <template #title><i class="el-icon-setting"></i>设置</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPath: '/patientMessage',
    }
  },
  //部件
  components: {},
  //静态
  props: {},
  //对象内部的属性监听，也叫深度监听
  watch: {
    '$route.path'(v) {
      if (v) {
        this.getCurrnetPath(v)
      }
    },
  },
  //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
  computed: {},
  //方法表示一个具体的操作，主要书写业务逻辑；
  methods: {
    getCurrnetPath(v) {
      if (v.startsWith('/patientMessageEditor')) {
        this.currentPath = '/patientMessage'
      } else {
        this.currentPath = v
      }
    },
  },
  //请求数据
  created() {},
  mounted() {
    this.getCurrnetPath(this.$route.path)
  },
}
</script>

<style lang="scss" scoped>
.out_color {
  background-color: #545c64;
  width: 200px;
  height: 100vh;

  .title {
    text-align: center;
    font-size: 24px;
    color: #fff;
    margin: 23px 0 43px;
  }
}
</style>
