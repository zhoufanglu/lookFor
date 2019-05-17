<template>
    <div class="header-content">
        <van-nav-bar
                :title=name
                left-text="返回"
                right-text="注销"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
    </div>
</template>
<script>
  import {mapActions } from 'vuex';
  export default {
    name: '',
    props:['name'],
    data() {
      return {}
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      onClickRight() {
        this.logout()
      },
      logout(){
        this.changeUserInfo({})
        this.changeToken(false)
        this.$router.replace({
          path:'login'
        })
      },
      ...mapActions(['changeUserInfo','changeToken'])
    },
    components: {},
    mounted() {
    }
  }
</script>
<style lang="scss">
    .header-content{

    }
</style>
<style lang="scss"scoped>
    .header-content{
        .van-nav-bar__text{
            color: $dark;
        }
    }
</style>
