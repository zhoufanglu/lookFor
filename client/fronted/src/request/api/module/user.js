/**
 *用户模块
 */
import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const user = {
  login(params){
    return axios.post(
      '/user',
      params
    )
  },
  getNowLocation(){
    //console.log(16,`${base.nodeServer}/getNowLocation`)
    return axios.post(
      `${base.nodeServer}/getNowLocation`,
    )
  },
  register(username){
    return axios.post(
      `${base.nodeServer}/register`,
      {username:username}
    )
  }
}
export default user