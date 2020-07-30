<template>
    <div class="p-login">
        <div class="logo">
            <img src="@/assets/img/logo.png"  width="50%">
        </div>
        <div class="p-form" >
            <van-cell-group class="form-content">
                <div class="input-row">
                    <svg class="icon return-icon" aria-hidden="true">
                        <use xlink:href="#iconuser"></use>
                    </svg>
                    <van-field
                            v-model="userName"
                            clearable
                            right-icon="question-o"
                            placeholder="请输入用户名"
                            @click-right-icon="$toast('用户名为admin,密码为123456')"
                    />
                </div>
                <div class="input-row">
                    <svg class="icon return-icon" aria-hidden="true">
                        <use xlink:href="#iconiconzhengli-"></use>
                    </svg>
                    <van-field
                            v-model="password"
                            type="password"
                            placeholder="请输入密码"
                    />
                </div>
            </van-cell-group>
            <van-row class="login-row" type="flex" justify="center">
                <van-col span="8" v-show="loginCate === 'user'"><van-button  @click="login" class="login-button" type="default">登录</van-button></van-col>
                <van-col span="8" v-show="loginCate === 'visitor'"><van-button @click="login" class="login-button" type="default">游客登录</van-button></van-col>
                <van-col span="2" class="icon-item">
                    <van-icon class="icon-exchange" name="exchange" @click="exchangeBtnState" />
                </van-col>
            </van-row>
            <van-row>
                <van-col span="24" class="register-btn">
                    <span @click="goRegister">没有账号？点击注册</span>
                </van-col>
            </van-row>
            <van-row class="p-go-user">
              <van-col>
                <router-link to="/userInfo">查看用户</router-link>
              </van-col>
            </van-row>
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
        userName:'admin',
        password:'123456',
        loginCate:'user',//visitor/user 游客/用户登录
        tokenVal:null
      }
    },
    methods: {
      login() {
        if (this.loginCate === 'visitor') {
          this.userName = '游客'
          this.password =''
        }
      let color = ''
      this.$api.user.login(this.userName,this.password,this.loginCate).then((res)=>{
        if(res.data.state === 'success'){
          color = '#3399ff'
          this.loginCate ==='user' ? this.tokenVal = res.data.data.token : null
          this.changeUserStore(res.data.data.userInfo)
        }else if(res.data.state === 'err'){
          color = '#fe575c'
        }
        this.$notify({
          message: res.data.msg,
          duration: 2000,
          background: color
        })
      })

      },
      changeUserStore(userInfo){
        //store
        this.changeUserInfo({
          isLogin: true,
          userName: this.userName,
          password: this.password,
          userId: this.userName !=='游客'?userInfo.id:-1
        })
        this.changeToken(this.tokenVal)
        this.$router.push({path:'home'})
      },
      exchangeBtnState(){
        let tipVal = ''
        this.loginCate === 'user'
          ? (this.loginCate = 'visitor',tipVal = '游客无需账号密码，直接登录！但信息不会保存！')
          :(this.loginCate = 'user',tipVal = '需账号密码登录！')
        if(tipVal !== ''){
          this.$toast(tipVal)
        }
      },
      goRegister(){
        this.$router.push({path:'/register'})
      },
      ...mapActions(['changeUserInfo','changeToken'])
    },
    components: {},
    computed:{
      ...mapState(['token',])
    },
    mounted() {
      this.redirect = this.$route.query.redirect
      if(this.token){
        this.$router.push({path:'home'})
      }
    }
  }
</script>
<style lang="scss">
    .p-login{
        .p-form{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            margin-top: 30px;
            .input-row{
                @include vertical-center;
            }
            .form-content{
                width: 80%;
            }
            .login-row{
                margin-top: 30px;
                width: 100%;
                .login-button{
                    width: 100px;
                    height: 40px;
                }
                .icon-item{
                    display: flex;
                    align-items: center;
                    .icon-exchange{
                        font-size: 20px;
                    }
                }
            }
        }
        .register-btn{
            color: $theme;
            font-size: 12px;
            margin-top: 12px;
            margin-left: -16px;
            white-space: nowrap;
        }
      .p-go-user{
        margin-top: 20px!important;
      }
    }
</style>
