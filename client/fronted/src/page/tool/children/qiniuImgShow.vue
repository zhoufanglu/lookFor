<template>
  <div class="p-qiniu-img-show">
    <van-button type="danger"
                size="small"
                @click="delAll"
    >清空所有数据</van-button>
    <van-button type="info"
                size="small"
                @click="deleteImg"
    >删除选中</van-button>
    <ul>
      <li
          v-for="(i,index) in imgList"
          :key="index"
      >
        <van-checkbox v-model="i.isCheck"></van-checkbox>

        <van-image
            @click="showImg(i)"
            round
            width="100"
            height="100"
            :src="i.path"
            lazy-load
            fit="cover"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
          <template v-slot:error>加载失败</template>
        </van-image>


        <!--<img
            :src="i.path"
        >-->

      </li>
    </ul>
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
    return {
      imgList: []
    }
  },
  computed: {
    ...mapState(['qiniu'])
  },
  created() {
    this.getQiniufileInfo()
  },
  mounted() {
  },
  methods: {
    async getQiniufileInfo() {
      const res = await this.$api.tool.getQiniufileInfo()
      res.data.data.forEach(i=>{
        this.imgList.push({
          id: i.id,
          path: `${this.$qiniuDomain}/${i.qiniuKey}`,
          isCheck: false
        })
      })
    },
    async delAll() {
      console.log(74, qiniu)
      qiniu.deleteUploadedChunks(
          this.qiniu.token,
          '大图片.jpg',
          {
            id: "5f6459d51051db6e772b4a5e",
            url: "https://upload-z2.qiniup.com"
          }
      )
      //const res = await this.$api.tool.delAllImg()
      //qiniu.deleteUploadedChunks(token: string, key: stting, uploadInfo: object): Promise

      //this.$notify({type: 'success', message: '删除成功'})
    },
    async deleteImg() {
      const list = this.imgList.filter(i=>i.isCheck)
      const ids = list.map(i=>i.id).join(',')
      console.log(86, ids)
      /*const res = await this.$api.tool.delImg({ids: ids, names: names})
      if(res.data.code === 200){
        this.$notify({type: 'success', message: '删除成功'})
        this.getQiniufileInfo()
      }*/
    },
    showImg(i){

    }
  }
}
</script>
<style lang="scss" scoped>
.p-qiniu-img-show {
  ul{
    li{
      @include vertical-center;
      justify-content: flex-start;
      cursor: pointer;
      .van-checkbox{
        padding: 10px;
      }
    }
  }
  img{
    width: 100px;
    height: 100px;
  }
}
</style>
