<template>
  <div class="p-img-show">
    <ul>
      <li
          v-for="(i,index) in imgList"
          :key="index"
          @click="showImg(i)"
      >
        <van-checkbox v-model="i.isCheck"></van-checkbox>

        <van-image
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
          round
          :src="popUp.img.path"
      />
    </van-popup>

  </div>
</template>
<script>
  import base from '@/request/api/base.js'
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
    },
    methods: {
      async getImgNameList() {
        const arr = await this.$api.tool.getImgNameList(100)
        const imgList = arr.data.data
        imgList.forEach((img, index)=>{
          this.imgList.push(
            {
              id: img.id,
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
      }
    }
  }
</script>
<style lang="scss" scoped>
  .p-img-show {
    ul{
      margin-top: 10px;
      li{
        @include vertical-center;
        justify-content: flex-start;
        padding-left: 10px;
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
