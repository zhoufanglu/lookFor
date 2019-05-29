import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    token:null,
    userInfo:{
      isLogin: false,
      userName: '',
      password: ''
    },
    networkSuccess: true, //是否断网
    //countTest: 0, //测试计数
  },
  mutations: {
    //判断是否断网
    CHANGE_NETWORK(state,val){
      if(val === false){ //若断了网/直接去断网页面
        router.replace({path:'/refresh'})
      }
      state.networkSuccess = val
    },
    //改变个人信息
    CHANGE_USER_INFO(state,val) {
      state.userInfo = val
    },
    //登录状态
    CHANGE_TOKEN(state,val){
      state.token = val
    },
  },
  actions: {
    changeUserInfo( { commit }, val ){
      commit('CHANGE_USER_INFO', val)
    },
    changeNetwork({ commit }, val){
      commit('CHANGE_NETWORK', val)
    },
    changeToken({ commit }, val){
      commit('CHANGE_TOKEN', val)
    }
  },
  plugins:[vuexLocal.plugin]
})
