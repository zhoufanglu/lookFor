<template>
    <div class="p-login">
        <div class="logo">
            <img src="@/assets/img/logo.png"  width="50%">
        </div>
        <div class="p-form" >
            <van-cell-group class="form-content">
                <van-field
                        v-model="userName"
                        required
                        clearable
                        label="用户名"
                        right-icon="question-o"
                        placeholder="请输入用户名"
                        @click-right-icon="$toast('用户名为admin,密码为123456')"
                />

                <van-field
                        v-model="password"
                        type="password"
                        label="密码"
                        placeholder="请输入密码"
                        required
                />
            </van-cell-group>
            <van-row class="login-row" type="flex" justify="center">
                <van-col span="8" v-show="loginBtnState === 'login'"><van-button  @click="login" class="login-button" type="default">登录</van-button></van-col>
                <van-col span="8" v-show="loginBtnState === 'visitor'"><van-button @click="login" class="login-button" type="default">游客登录</van-button></van-col>
                <van-col span="2" class="icon-item">
                    <van-icon class="icon-exchange" name="exchange" @click="exchangeBtnState" />
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
        loginBtnState:'login'//visitor 游客登录/登录
      }
    },
    methods: {
      login() {
        if (this.loginBtnState === 'login') {
          let mes = ''
          let color = ''
          //登录成功
          if (this.userName === 'admin' && this.password === '123456') {
            mes = '登录成功！'
            color = '#3399ff'
            //store
            this.changeUserInfo({
              isLogin: true,
              userName: this.userName,
              password: this.password
            })
            this.changeToken(true)
            this.$router.push({path:'home'})
          }
          //登录失败
          else {
            mes = '账号密码有误！'
            color = '#fe575c'
          }
          this.$notify({
            message: mes,
            duration: 2000,
            background: color
          })
        } else if (this.loginBtnState === 'visitor') {
          /*this.$route.push({

          })*/
        }
      },
      exchangeBtnState(){
        let tipVal = ''
        this.loginBtnState === 'login'
          ? (this.loginBtnState = 'visitor',tipVal = '游客无需账号密码，直接登录！')
          :(this.loginBtnState = 'login',tipVal = '需账号密码登录！')
        if(tipVal !== ''){
          this.$toast(tipVal)
        }
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
        this.$router.go(-1)
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
    }
</style>
