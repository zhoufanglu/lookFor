/**
 *文件模块
 */
import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例

const files = {
  uploadImg(params){
    return axios.post(
      `${base.nodeServer}/uploadImg`,
      { headers: 'form', ...params}
    )
  },
}

export default files