<template>
    <div class="p-home">
        <header-content name="信息采集" isShowReturn="false">
        </header-content>
        <div class="home-tab">
            <van-tabs v-model="active" animated>
                <van-tab>
                    <div slot="title" class="title">
                        <svg class="icon personal-icon" aria-hidden="true">
                            <use xlink:href="#iconicon-test14"></use>
                        </svg>个人信息
                    </div>
                    <form-picker>

                    </form-picker>
                </van-tab>
                <van-tab title="其他信息">
                    <div slot="title" class="title">
                        <svg class="icon personal-icon" aria-hidden="true">
                            <use xlink:href="#iconicon-test7"></use>
                        </svg>
                        其他信息
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div class="panel">
        </div>
    </div>
</template>
<script>
  import headerContent from '@c/header.vue'
  import formPicker from '@c/formPicker.vue'
  export default {
    name: '',
    data(){
      return{
        active:0
      }
    },
    methods:{
      nextBtn(){
        if(this.active<=2) {
          this.active++
        }
      }
    },
    mounted(){
    },
    components:{
      headerContent,
      formPicker
    }
  }
</script>
<style lang="scss" scoped>
    .p-home{
        .home-tab{
            .title{
                @include vertical-center;
                .personal-icon{
                    margin-right: 6px;
                }
            }
        }
    }
</style>
<style lang="scss" >
    .p-home{
        .home-tab{
            .van-tabs__line{
                background-color: #FEE27F!important;
            }
        }
    }
</style>
