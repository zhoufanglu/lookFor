<template>
  <div class="p-qiniu-upload">
    <van-uploader v-model="fileList"
                  :after-read="afterRead"
                  multiple />

    <div class="operate-panel">
      <span>{{ uploadState }}</span>
      <van-button
          size="small"
          @click="getToken"
      >刷新七牛的token</van-button>

      <van-button
          size="small"
          @click="addQiniuFile"
      >上传</van-button>
    </div>

  </div>
</template>
<script>
//七牛
import * as qiniu from 'qiniu-js'
import { mapState,mapMutations } from 'vuex';
export default {
  name: '',
  components: {},
  data() {
    return {
      uploadState: '上传中',
      fileList: [
      ],//状态 error uploading success
      fileApiList: [],
      count: 0 //判断有没有上传完成
    }
  },
  created() {
    this.getUploadToken()
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['setQiniu']),
    afterRead(){
      this.count = 0
      this.fileList = this.fileList.map(i=>{
        return {
          ...i,
          status: 'uploading',
          message: '0%'
        }
      })
      //七牛云进行上传
      this.uploadFromQiniu()
    },
    uploadFromQiniu() {
      this.fileList.forEach((i, index)=>{
        /**
         * file: file对象
         * key: 文件资源名
         * token: 上传信息，uploadToken
         * config = {  //配置项 可选
                useCdnDomain: true,
                region: qiniu.region.z2
              };
         **/
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
        /**********************生成observable对象***********************/
        const observable = qiniu.upload(
            qiniuUploadInfo.file,
            qiniuUploadInfo.key,
            qiniuUploadInfo.token,
            putExtra,
            config
        )
        /**********************七牛云上传开始***********************/
        observable.subscribe({
          next(res){
            _this.uploadState = '上传中'
            i.message = `${parseInt(res.total.percent)}%`
            console.log('next', res)
          },
          error(err){
            this.uploadState = '上传出错'
            i.status = 'error'
            console.log('err', err)
            _this.$notify({type: 'danger', message: err.message})
          },
          complete(res){
            _this.uploadState = '上传完成'
            _this.count++
            i.status = 'success'
            console.log('complete', res, index)
            _this.fileApiList.push(res)
          }
        })
      })
    },
    async getUploadToken() {
      const res = await this.$api.tool.getUploadToken()
      this.uploadToken = res.data.data
      this.setQiniu({token: this.uploadToken})
    },
    getToken() {
      this.getUploadToken()
    },
    //保存到数据库
    async addQiniuFile() {
      if(this.fileApiList.length===0){
        this.$notify({type: 'danger', message: '添加后保存'})
        return false
      }else{
        const res = await this.$api.tool.addQiniuFile({fileApiList: this.fileApiList})
        this.$notify({type: 'success', message: '上传成功'})
      }
    }
  },
  watch: {
    count(newVal, oldVal){
      console.log(137, newVal)
      if(newVal === this.fileList.length){
        this.addQiniuFile()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.p-qiniu-upload {
  .operate-panel{
    @include vertical-center;
    flex-direction: column;
  }
  .van-progress{
    width: 100%;
  }
}
</style>
