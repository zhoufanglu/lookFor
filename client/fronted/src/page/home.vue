<template>
    <div class="p-home">
        <header-content name="信息采集" isShowReturn="false">
        </header-content>
        <van-steps
                :active="active"
                active-icon="success"
                active-color="#38f"
        >
            <van-step>个人信息</van-step>
            <van-step>商家接单</van-step>
            <van-step>交易完成</van-step>
        </van-steps>
    </div>
</template>
<script>
  import headerContent from '@c/header.vue'
  export default {
    name: '',
    data(){
      return{
        active:3
      }
    },
    methods:{
    },
    mounted(){
      [3, 15, 8, 29, 102, 22].sort((a,b) => {
        return a -b
      });
    },
    components:{
      headerContent
    }
  }
</script>
<style>
</style>
