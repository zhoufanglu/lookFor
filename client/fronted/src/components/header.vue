<template>
    <div class="header-content">
        <!--head-->
        <div class="head-row">
            <van-row type="flex" justify="space-between" align="center">
                <van-col span="2">
                    <svg v-if="isShowReturn!=='false'" class="icon return-icon" aria-hidden="true"@click="onClickLeft">
                        <use xlink:href="#iconicon-test2"></use>
                    </svg>
                </van-col>
                <van-col span="20" class="title">
                    {{name}}
                    <span class="username">({{userInfo.userName}})</span>
                </van-col>
                <van-col span="2">
                    <svg class="icon return-icon" aria-hidden="true" @click="onClickRight">
                        <use xlink:href="#icongengduo1"></use>
                    </svg>
                </van-col>
            </van-row>
        </div>
        <!--operate btn mask-->
        <van-action-sheet
                v-model="operateInfo.show"
                :actions="initHead"
                @select="onSelect"
                cancel-text="取消"
                @cancel="onCancel"
        />
    </div>
</template>
<script>
  import {mapActions,mapState} from 'vuex';
  export default {
    name: '',
    props:['name','isShowReturn','isShowLogout'],
    data() {
      return {
        operateInfo:{
          show: false,
          actions: []
        },
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      onClickRight() {
        this.operateInfo.show = true
      },
      onSelect(item){
        if(item.name === '注销'){
          this.logout()
        }
        //this.logout()
      },
      onCancel(){

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
        //this.initHead()
    },
    computed:{
      initHead(){
        if(this.isShowLogout === 'false'){
          return []
        }else{
          return [{
            name: '注销'
          },]
        }
      },
      ...mapState(['userInfo'])
    }
  }
</script>
<style lang="scss" scoped>
    .header-content{
        .head-row{
            padding: 16px 6px;
            .title{
                font-size: 18px;
                .edit-icon{
                    margin-right: 6px;
                }
                @include vertical-center;
                .username{
                    color: $dark;
                    font-size: 14px;
                    margin-left: 6px;
                }
            }
        }
    }
</style>
<style lang="scss"scoped>
   /* .header-content{
        .van-nav-bar__text{
            color: $dark;
        }
    }*/
</style>
