<template>
  <div class="p-img-upload">
    imgUpload
    <input type="file"
           accept=".png, .jpg, .jpeg"
           multiple="multiple"
           name="imgFile"
           @change="imgFileChange"
    >
    <ul class="img-panel">
      <li v-for="(i,index) in pathList">
        <span>图片{{index}}</span>
        <img :src="i" alt="">
      </li>
    </ul>
    <van-button type="info" @click="upload">上传</van-button>
    <span>状态：{{uploadState}}</span>
  </div>
</template>
<script>
  import eventBus from "@/assets/js/utils/eventBus"
  export default {
    name: '',
    components: {  },
    data() {
      return {
        fileList: [],
        pathList: [],
        uploadState: '未上传'
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      imgFileChange(e) {
        this.fileList = e.target.files
        //[object FileList] 对象 转 数组
        this.fileList = Array.prototype.slice.call(this.fileList)
        Promise.all(this.fileList.map(file=>this.createFilePromise(file)))
          .then(res => {
            this.pathList = res
          })
          .catch(err => {
            console.log(56, err)
          })
      },
      createFilePromise(file) {
        let reader = new FileReader()
        return new Promise((resolve, reject) => {
          reader.readAsDataURL(file)
          reader.onload = e => {
            resolve(e.target.result)
          }
          /*reader.onerror(err=>{
            reject(reader.error)
          })*/
        })
      },
      upload() {
        //console.log(62, this.fileList)
        //模拟form对象
        let formData = new FormData
        eventBus.$emit('imgUploadSuccess')
        const filePromise = new Promise(resolve => {
          this.fileList.forEach((file, index) => {
            formData.append('imgList', file)
          })
          //formData.get('imgList')
          resolve(formData)
        })
        filePromise.then(res => {
          this.$api.tool.uploadImg(
            res
          )
            .then(res => {
              this.$notify({type: 'success', message: '上传成功'})
              //响应同级组件事件
              eventBus.$emit('uploadSuccess')
            })
        })
      }
      //一般方法
      /*imgFileChange(e) {
        this.fileList = e.target.tool

        let reader, promiseList = []
        //响应图片获取的事件
        this.fileList.forEach(file=>{
          promiseList.push(
            new Promise(resolve => {
              reader = new FileReader()
              reader.onload = e =>{
                resolve(e.target.result)
              }
              reader.readAsDataURL(file)
            })
          )
        })

        Promise.all(promiseList)
          .then(res=>{
            console.log(53, res)
            this.pathList = res
          })
          .catch(err=>{
            console.log(56, err)
          })
      }*/
    }
  }
</script>
<style lang="scss" scoped>
  .p-img-upload {
    .img-panel{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      li{
        min-width: 100px;
        height: 200px;
        border: solid 1px red;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
