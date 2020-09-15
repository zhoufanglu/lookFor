<template>
  <div class="p-qiniu-upload">
    <van-uploader v-model="fileList"
                  :after-read="afterRead"
                  multiple />
  </div>
</template>
<script>
//七牛
import * as qiniu from 'qiniu-js'
export default {
  name: '',
  components: {},
  data() {
    return {
      AK: 'dZ5dM2GJ8wgeLpkbCcwmejkUd9ft7NPx_TEK9tAe',
      SK: 'PwGVWInh9U4a912G85KQjCr7aEyL2kZSBEoZBdmt',
      uploadToken: '',
      fileList: [
      ],
    }
  },
  created() {
    console.log(19, qiniu)
    this.getUploadToken()
  },
  mounted() {
  },
  methods: {
    afterRead(){
      console.log(28, this.fileList)
      /**
       * file: file对象
       * key: 文件资源名
       * token: 上传信息，uploadToken
       * config = {  //配置项 可选
                useCdnDomain: true,
                region: qiniu.region.z2
              };
      **/
      this.fileList.forEach(i=>{
        const _this = this
        //七牛信息
        const qiniuUploadInfo = {
          file: i.file,
          key: i.file.name,
          token: this.uploadToken,
        }
        const putExtra = {
          fname: i.file.name, // 文件原文件名
          params: {}, // 用来放置自定义变量
          mimeType: null // 用来限制上传文件类型，为 null 时表示不对文件类型限制；eg: ["image/png", "image/jpeg"]
        }
        const config = {
          useCdnDomain: true,//cdn加速
          region: qiniu.region.z2 //区域
        }
        const observable = qiniu.upload(
            qiniuUploadInfo.file,
            qiniuUploadInfo.key,
            qiniuUploadInfo.token,
            putExtra,
            config
        )
        //上传开始
        observable.subscribe({
          next(res){
            console.log('next', res)
          },
          error(err){
            console.log('err', err)
            _this.$notify({type: 'danger', message: err.message})
          },
          complete(res){
            console.log('complete', res)
          }
        })
      })


     /* //上传

      var observable = qiniu.upload(this.fileList, key, token, putExtra, config)

      var subscription = observable.subscribe(next, error, complete) // 这样传参形式也可以

      subscription.unsubscribe() // 上传取消*/

    },
    async getUploadToken() {
      const res = await this.$api.tool.getUploadToken()
      this.uploadToken = res.data.data
      /*this.$api.user.getUserInfo({password: 123456})
      const res2 = await qiniu.getUploadUrl(config, this.uploadToken)
      console.log(44, this.uploadToken)*/
    }
  }
}
</script>
<style lang="scss" scoped>
.p-qiniu-upload {
}
</style>
