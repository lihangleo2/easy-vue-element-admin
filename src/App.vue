<template>
  <div id="nav" v-loading="loading">
    <el-container style="height: 100%" v-if="isShowSideBar">
      <Siderbar></Siderbar>
      <el-container direction="vertical">
        <Header></Header>
        <el-main>
          <Breadcrumb></Breadcrumb>
          <div class="main-wrap">
            <router-view v-slot="{ Component }">
              <transition :name="transitionName">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <el-container style="height: 100%" v-else>
      <router-view />
    </el-container>
  </div>
</template>

 





<script>
import Header from './components/header.vue'
import Siderbar from './components/siderbar.vue'
import Breadcrumb from './components/breadcrumb.vue'
export default {
  data() {
    return {
      isShowSideBar: false,
      transitionName: '',
    }
  },
  //部件
  components: { Siderbar, Header, Breadcrumb },
  //静态
  props: {},
  //对象内部的属性监听，也叫深度监听
  watch: {
    $route: {
      handler: function (to, from) {
        if (!to.name) return
        let showItem = ['Login'] // 不展示菜单的路由
        this.isShowSideBar = !showItem.includes(to.name)
        if (to && to.meta && from && from.meta) {
          if (to.meta.index > from.meta.index) {
            //设置动画名称
            this.transitionName = 'slidleft'
          } else {
            this.transitionName = 'slidright'
          }
        }
      },
      immediate: true,
    },
  },
  //属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
  computed: {
    loading() {
      let loadingFlag = this.$store.state.loading
      if (loadingFlag > 0) {
        return true
      } else {
        return false
      }
    },
  },
  //方法表示一个具体的操作，主要书写业务逻辑；
  methods: {},
  //请求数据
  created() {},
  mounted() {},
}
</script>

<style scoped lang="scss">
#nav {
  height: 100%;
  .el-main {
    background: #f7f7fd;
    width: 100%;
    padding-top: 0;
  }

  .main-wrap {
    position: relative;
    width: 100%;
  }
}
.slidright-leave-active,
.slidright-enter-active,
.slidleft-leave-active,
.slidleft-enter-active {
  will-change: transform;
  transition: all 600ms;
  position: absolute;
}

.slidleft-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slidleft-enter-from {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slidright-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slidright-enter-from {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>

