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
     /* //上传

      var observable = qiniu.upload(this.fileList, key, token, putExtra, config)

      var subscription = observable.subscribe(next, error, complete) // 这样传参形式也可以

      subscription.unsubscribe() // 上传取消*/

    },
    async getUploadToken() {
      const res = this.$api.tool.getUploadToken()
      this.uploadToken = res.data
    }
  }
}
</script>
<style lang="scss" scoped>
.p-qiniu-upload {
}
</style>
