/**
 * api接口的统一出口
 */
// 商品模块接口
import store from '@/request/api/module/store';
import user from '@/request/api/module/user';
import relative from '@/request/api/module/relative';
import personal from '@/request/api/module/personal';
import tool from '@/request/api/module/tool';
// 其他模块的接口……

// 导出接口
export default {
  store,
  user,
  relative,
  personal,
  tool
  // ……
}