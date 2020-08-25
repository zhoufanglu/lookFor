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
    loading: false,
    userInfo:{
      userId: 0,
      isLogin: false,
      userName: '',
      password: ''
    },
    networkSuccess: true, //是否断网
    //pickInfo 下拉选择器组件信息
    pickInfo:{
      isShow:false,
      title:'',
      dataList:[],
      currentItem:''
    }
  },
  mutations: {
    setLoading(state, val) {
      state.loading = val
    },
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
    //改变选择器组件参数
    CHANGE_PICKERINFO(state,val){
      if(val.isShow === false || val.isShow === true){
        state.pickInfo.isShow = val.isShow
      }
      if(val.title){
        state.pickInfo.title = val.title
      }
      if(val.dataList){
        state.pickInfo.dataList = val.dataList
      }
      if(val.currentItem || val.currentItem ===''){
        state.pickInfo.currentItem = val.currentItem
      }
    }
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
    },
    changePickerInfo({ commit }, val){
      commit('CHANGE_PICKERINFO', val)
    }
  },
  plugins:[vuexLocal.plugin]
})
