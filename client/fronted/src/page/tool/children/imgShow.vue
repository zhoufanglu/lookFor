<template>
  <div class="p-img-show">
    <ul>
      <li
          v-for="(i,index) in imgList"
          :key="index"
      >
        <img
            :src="`${url.fileServer}/img/${i.name}`"
        >
      </li>
    </ul>
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
        url: ''
      }
    },
    created() {
      this.url = base
      this.$nextTick(()=>{
        this.getImgNameList()
      })
    },
    mounted() {
    },
    methods: {
      async getImgNameList() {
        const arr = await this.$api.tool.getImgNameList(100)
        this.imgList = arr.data.data
        this.imgList.forEach(img=>{
          console.log(18, `${base.nodeServer}/img/${img.name}`)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .p-img-show {
    img{
      width: 100px;
      height: 100px;
    }
  }
</style>
