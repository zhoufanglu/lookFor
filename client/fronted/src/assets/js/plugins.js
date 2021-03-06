import router from '@/router'
//nprogress
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//vuex
import store from '@/store'
//vant 的引入
/*import { Button, Row, Col,Field,Cell,CellGroup,Icon,Tag,NavBar,ActionSheet,Tab, Slider, SidebarItem,
  Tabs,RadioGroup, Radio,Picker,Popup } from 'vant';
export default {
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [NavBar.name]: NavBar,
    [ActionSheet.name]: ActionSheet,
    [Tab.name]: Tab,
    [Slider.name]: Slider,
    [SidebarItem.name]: SidebarItem,
    [Tabs.name]: Tabs,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
}*/
//iconfont
import  '@/assets/iconfont/iconfont.js'

nprogress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from , next) => {
  //未登录
  if(to.meta.requiresAuth){
    if(!store.state.userInfo.isLogin
      &&(to.path!=='/user'&&to.path!=='/401')){
      next(`/401?redirect=${to.path}`)
    }
  }
  // 每次切换页面时，调用进度条
  nprogress.start();

  // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
  next();
});
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  nprogress.done()
})


/**
 * 保持vuex内的数据刷新不消失
 * 这个有个缺陷，当你删除或者修改了state里面的参数，1、先注释掉下面的代码，2、删除localStore里面的参数，再刷新下就好了。。
 * 弃用了这个方法
 * ---->使用了vuex-persist这个插件
 * */
//页面加载时把localStorage的数据放入vuex
/*localStorage.getItem("vuexState(hello-world)")&&
store.replaceState(
  Object.assign(store.state,JSON.parse(localStorage.getItem("vuexState(hello-world)")))
)
//页面刷新前把vuex的数据放入localStorage
window.addEventListener("beforeunload",()=>{
  localStorage.setItem("vuexState(hello-world)",JSON.stringify(store.state))
})*/
