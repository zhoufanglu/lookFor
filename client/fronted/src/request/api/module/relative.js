/**
 *亲戚模块
 */
import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例

const relative = {
  getRelative(){
    return axios.post(
      `${base.nodeServer}/getRelative`,
    )
  },
}

export default relative