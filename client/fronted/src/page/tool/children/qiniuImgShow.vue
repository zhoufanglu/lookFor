<template>
  <div class="p-qiniu-img-show">
    <van-button type="danger"
                size="small"
                @click="delAll"
    >清空所有数据</van-button>
    <div></div>
  </div>
</template>
<script>
//七牛
import * as qiniu from 'qiniu-js'
import {mapState} from 'vuex';
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['qiniu'])
  },
  created() {
    console.log(24, this.qiniu)
  },
  mounted() {
  },
  methods: {
    async delAll() {
      qiniu.deleteUploadedChunks(
          this.qiniu.token,
          'Fgi_udq65cr9YUGvK-I2pjXNA5Su',
          {}
    )
      //const res = await this.$api.tool.delAllImg()
      //qiniu.deleteUploadedChunks(token: string, key: stting, uploadInfo: object): Promise

      //this.$notify({type: 'success', message: '删除成功'})
    }
  }
}
</script>
<style lang="scss" scoped>
.p-qiniu-img-show {
}
</style>
