/**
 *用户模块
 */
import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const user = {
  login(username,password,loginState){
    return axios.post(
      `${base.nodeServer}/login`,
      {
        username:username,
        password:password,
        loginState:loginState
      }
    )
  },
	getUserInfo(password){
		return axios.get(
			`${base.nodeServer}/getUserInfo?password=${password.password}`,
		)
	},
  getNowLocation(){
    //console.log(16,`${base.nodeServer}/getNowLocation`)
    return axios.post(
      `${base.nodeServer}/getNowLocation`,
    )
  },
  register(username,password){
    return axios.post(
      `${base.nodeServer}/register`,
      {
        username:username,
        password:password
      }
    )
  }
}
export default user