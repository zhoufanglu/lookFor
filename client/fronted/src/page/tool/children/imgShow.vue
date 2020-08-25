<template>
  <div class="p-img-show">
    <van-button type="info"
      size="small"
      @click="deleteImg"
    >删除选中</van-button>
    <van-button type="danger"
                size="small"
                @click="delAll"
    >清空所有数据</van-button>
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

    <van-popup v-model="popUp.show">
      <van-image
          :src="popUp.img.path"
      />
    </van-popup>

  </div>
</template>
<script>
  import base from '@/request/api/base.js'
  import eventBus from "@/assets/js/utils/eventBus"
  export default {
    name: '',
    components: {},
    data() {
      return {
        imgList: [],
        url: '',
        popUp: {
          show: false,
          img: {}
        }
      }
    },
    created() {
      this.url = base
      this.getImgNameList()
    },
    mounted() {
      eventBus.$on('refreshImgs',(_)=>{
        this.$nextTick(()=>{
          this.getImgNameList()
        })
      })
    },
    beforeDestroy () {
      //eventBus.$bus.off('refreshImgs')
    },
    methods: {
      async getImgNameList() {
        const arr = await this.$api.tool.getImgNameList(100)
        const imgList = arr.data.data
        this.imgList = []
        imgList.forEach((img, index)=>{
          this.imgList.push(
            {
              id: img.id,
              name: img.name,
              isCheck: false,
              path: `${this.url.fileServer}/img/${img.name}`
            }
          )
        })
        this.imgList.forEach((i,index)=>{
          this.$set(this.imgList, index, i)
        })
      },
      showImg(img) {
        console.log(img)
        this.popUp.show = true
        this.popUp.img = img
      },
      async deleteImg() {
        const list = this.imgList.filter(i=>i.isCheck)
        const ids = list.map(i=>i.id).join(',')
        const names = list.map(i=>i.name).join(',')
        const res = await this.$api.tool.delImg({ids: ids, names: names})
        if(res.data.code === 200){
          this.$notify({type: 'success', message: '删除成功'})
          this.getImgNameList()
        }
      },
      async delAll() {
        const res = await this.$api.tool.delAllImg()
        this.$notify({type: 'success', message: '删除成功'})
        this.getImgNameList()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .p-img-show {
    padding: 10px;
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

<style lang="scss">
  .p-img-show{
    .van-popup{
      background-color:transparent;
    }
  }
</style>
