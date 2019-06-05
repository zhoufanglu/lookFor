/**
 *用户信息模块
 */
import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

//user_id,surname,name,sex,before_location,now_location,date_of_birth
const personal = {
  addPersonalInfo(req){
    return axios.post(
      `${base.nodeServer}/addPersonalInfo`,
      {
        userId:req.userId,
        surname:req.surname,
        name:req.name,
        sex:req.sex,
        beforeLocation:req.beforeLocation,
        nowLocation: req.nowLocation,
        dateOfBirth:req.dateOfBirth
      }
    )
  },
  searchPersonalInfo(userId){
    /*return axios.post(
      `${base.nodeServer}/personal/search`,
      {
        userId:userId,
      }
    )*/
    return new Promise((resolve, reject) => {
      axios.post(`${base.nodeServer}/personal/search`, {
        userId:userId,
      }).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  },

}
export default personal