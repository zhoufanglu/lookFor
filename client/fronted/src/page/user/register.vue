<template>
    <div class="p-register">
        <headerContent name="注册">
        </headerContent>

        <van-cell-group>
            <van-field
                    v-model="username"
                    required
                    clearable
                    label="用户名"
                    right-icon="question-o"
                    placeholder="请输入用户名"
                    :error-message="userErr"
                    @click-right-icon="$toast('用户名至少为4位')"
            />
            <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    :error-message="pswErr"
                    required
            />
        </van-cell-group>
        <van-button  @click="register" class="register-button" type="default">注册</van-button>
    </div>
</template>
<script>
  import headerContent from '@c/header.vue'
  import {trim} from '@/assets/js/utils/validate'
  export default {
    name: '',
    data() {
      return {
        username:'',
        password:'',
        userErr:'',
        pswErr:''
      }
    },
    methods: {
      register(){
        if(trim(this.username) === ''){
          this.userErr = '用户名不能为空'
          return false
        }else if(trim(this.username).length <4){
          this.userErr = '用户名不能少于4位'
          return false
        }
        else{
          this.userErr = ''
        }
        if(trim(this.password) === ''){
          this.pswErr = '密码不能为空'
          return false
        }else{
          this.pswErr = ''
        }

        this.$api.user.register(this.username).then(res=>{
          if(res.data.state === 'err' ){
            this.userErr = res.data.msg
          }else if(res.data.state === 'success'){
            this.userErr = ''
            this.$notify({
              message: res.data.msg,
              duration: 2000,
              background: '#3399ff'
            })
          }
        })

      }
    },
    components: {
      headerContent
    },
    mounted() {
    }
  }
</script>
<style lang="scss" scoped>
    .p-register{
        .register-button{
            margin-top: 30px;
        }
    }
</style>
