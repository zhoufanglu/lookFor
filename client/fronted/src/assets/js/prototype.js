import Vue from 'vue'
import { Toast,Notify,Dialog} from 'vant';

//接口配置
import api from '@/request/api'

const prototype = ()=>{
  Vue.prototype.$api = api
  Vue.prototype.$tip = Toast
  Vue.prototype.$notify = Notify
  Vue.prototype.$Dialog = Dialog
  Vue.prototype.$qiniuDomain = 'http://lufangzhou.icu'
}
export default prototype

