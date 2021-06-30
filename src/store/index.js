import { createStore } from 'vuex'
//Vuex数据状态持久化，这里不懂可以查查，有几种如永久持久化之类等
import createPersistedState from "vuex-persistedstate"

export default createStore({
  plugins: [createPersistedState()],
  state: {
    loading: 0,  // 全局loading，这里用int型，如果为0则不展示loading;如果有2个网络请求，其中1个成功就取消了不符合
    userInfo: {},
  },
  mutations: {
    SET_LOADING(state) {
      state.loading += 1;
    },
    CANCLE_LOADING(state) {
      state.loading -= 1;
      if (state.loading < 0) {
        state.loading = 0;
      }
    },
    SET_USER: (state, user) => {
      state.userInfo = user;
    },
  },
  getters: {
    user: state => state.userInfo,
  },
  actions: {
  },
  modules: {
  }
})
