/**
 *文件模块
 */
import base from '../base'; // 导入接口域名列表
import axios from '@/request/http'; // 导入http中创建的axios实例

const tool = {
  getImgNameList(number) {
    return axios.get(
      `${base.nodeServer}/tool/getImgNameList?number=${number}`,
    )
  },
  uploadImg(params){
    /*const data = qs.stringify({ headers: 'form', ...params})
    console.log(11, data)*/
    const config = {
      headers:{
        'Content-Type' : 'multipart/form-data',
      }
    };
    return axios.post(
      `${base.nodeServer}/tool/uploadImg`,
      params,
      config
      /*{ headers: 'form', ...params}*/
    )
  },
  delImg(params) {
    return axios.post(
      `${base.nodeServer}/tool/delImg`,
      params
    )
  },
  delAllImg() {
    return axios.post(
      `${base.nodeServer}/tool/delAllImg`,
    )
  },
}

export default tool