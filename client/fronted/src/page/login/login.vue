<template>
    <div class="p-login">
        <div style="margin: 20px;"></div>
        <div class="p-form" >
            <input type="text">
            <van-button type="primary">主要按钮</van-button>
            <div class="test-body">
                123
            </div>
        </div>
    </div>
</template>
<script>
  import {mapState,mapActions } from 'vuex'
  import { validUsername } from '@/assets/js/utils/validate'
  export default {
    name: '',
    data() {
      return{

      }
    },
    methods: {
      login(formName){
        this.$refs[formName].validate((valid)=>{
           if(valid){
             this.loading = true
             this.$api.user.login(
               '/login',
               {
                 userName: this.formLabelAlign.userName,
                 password: this.formLabelAlign.password
               },
             ).then((res)=>{
               this.loading = false
               this.changeUserInfo({
                 isLogin: true,
                 userName: this.formLabelAlign.userName,
                 password: this.formLabelAlign.password
               })
               this.changeToken(true)
               let path = this.redirect?this.redirect:'/home'
               this.$router.replace({
                 path: path
               })
             }).catch((err)=>{
               this.loading = false
             })
           }else{

           }
        })
      },
      ...mapActions(['changeUserInfo','changeToken'])
    },
    components: {},
    computed:{
      ...mapState(['token',])
    },
    mounted() {
      this.$tip('进来了')
      this.redirect = this.$route.query.redirect
      if(this.token){
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss">
    .p-login{
        .p-form{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            .test-body{
                width: 100px;
                height: 50px;
                border: solid 1px red;
            }
        }
    }
</style>
