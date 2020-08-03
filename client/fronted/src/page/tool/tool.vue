<template>
  <div class="p-tool">
    <header-content name="工具类" isShowReturn="true"></header-content>
    <van-tabs v-model="active" @change="go">
      <van-tab v-for="(i,index) in toolList"
               :title="i.meta.ZHName"
               :key="index"
               ></van-tab>
    </van-tabs>
    <!--<router-link to="/tool/imgShow">
      图片展示
    </router-link>
    <router-link to="/tool/imgUpLoad">
      上传图片
    </router-link>-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import headerContent from '@c/header.vue'
  import routerList from '@/router.js'
  export default {
    name: '',
    components: {headerContent},
    data() {
      return {
        active: 0,
        toolList: []
      }
    },
    created() {
      this.toolList = routerList.options.routes.find(i => i.name === 'tool')
      this.toolList = JSON.parse(JSON.stringify(this.toolList.children))
      //选中当前的路由tab
      this.active = this.toolList.findIndex(i=>{
        return i.name === this.$route.name
      })
    },
    mounted() {
    },
    methods: {
      go(index, title){
        this.$router.push({path: this.toolList[index].path})
      }
    }
  }
</script>
<style lang="scss" scoped>
  .p-name {
  }
</style>
