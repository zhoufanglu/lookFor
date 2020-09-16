/**
 * 七牛
 */
import qiniu from "qiniu";

const AK = 'dZ5dM2GJ8wgeLpkbCcwmejkUd9ft7NPx_TEK9tAe'
const SK = 'PwGVWInh9U4a912G85KQjCr7aEyL2kZSBEoZBdmt'
const bucket = 'look-for'//空间名称

const getUploadToken = (_) => {
//鉴权对象mac
  const mac = new qiniu.auth.digest.Mac(AK, SK)
//获取上传的token
  const options = {
    scope: bucket,
    expires: 3600 * 24 //到期时间
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}

export default getUploadToken