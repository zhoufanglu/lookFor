<template>
    <div class="p-home">
        <header-content name="信息采集" isShowReturn="false">
        </header-content>
        <div class="home-tab">
            <van-tabs v-model="active" animated @change="tabChange">
                <van-tab>
                    <div slot="title" class="title">
                        <svg class="icon personal-icon" aria-hidden="true">
                            <use xlink:href="#iconicon-test14"></use>
                        </svg>个人信息（必填）
                    </div>
                    <form-picker class="form-picker"
                                 :active="active"
                                 :personal="personal"
                    >

                    </form-picker>
                </van-tab>
                <van-tab title="其他信息">
                    <div slot="title" class="title">
                        <svg class="icon personal-icon" aria-hidden="true">
                            <use xlink:href="#iconicon-test7"></use>
                        </svg>
                        其他信息（选填）
                    </div>
                    <div class="other-panel">
                        <!--left nav-->
                        <div class="left">
                            <van-sidebar :active-key="sidebarActiveKey" @change="sideOnChange">
                                <van-sidebar-item
                                        v-for="(i,index) in rightNavList"
                                        :key="index"
                                        :title="i" 
                                        info=""
                                        @click="navClick(i)"
                                />
                            </van-sidebar>
                            <!--增加按钮-->
                            <div class="add-sidebar" @click="(relativeMask=true,pickInfo.currentItem='')">
                                <svg class="icon personal-icon" aria-hidden="true">
                                    <use xlink:href="#iconzengjia"></use>
                                </svg>
                            </div>
                        </div>
                        <!--form-picker-->
                        <div class="right">
                            <form-picker class="form-picker"
                                         v-if="outCurrentRelative!==''"
                                         :active="active"
                                         :personal="personal"
                            >

                            </form-picker>

                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div class="panel">
        </div>
        <!--选择亲戚弹窗-->
        <van-dialog
                class="dialog-mask"
                v-model="relativeMask"
                title=" "
                show-cancel-button
                @confirm="dialogConfirm()"
        >
            <div class="item-row" @click="relativeSpanClick">
                <span :class="pickInfo.currentItem!==''?'':'darker'">{{pickInfo.currentItem===''?'点击选择亲戚名称':pickInfo.currentItem}}</span>
            </div>
        </van-dialog>
        <!--选择器-->
        <picker-and-popup
                :dataList="pickList"
                :title="pickerTitle"
                :show="pickShow"
        >

        </picker-and-popup>
        <!--时间选择器-->
        <datePicker

        ></datePicker>
    </div>
</template>
<script>
  import {mapState,mapActions } from 'vuex'
  import headerContent from '@c/header.vue'
  import formPicker from '@c/formPicker.vue'
  import pickerAndPopup from '@c/pickerAndPopup.vue'
  import datePicker from '@c/datePicker.vue'
  import personal from "../request/api/module/personal";
  export default {
    name: '',
    data(){
      return{
        pickShow:false,
        active:0, //顶部的nav
        sidebarActiveKey:0,
        relativeMask:false,
        pickList:[],
        pickerTitle:'',
        outCurrentRelative:'',//nav的选中
        rightNavList:[], //左侧的亲戚列表
        personal:{
          state:'',//判断是修改状态，还是新增状态  add/edit
          data:[]
        },
      }
    },
    methods:{
      sideOnChange(key){
        this.sidebarActiveKey = key
      },
      //显示亲戚列表
      relativeSpanClick(){
        //console.log(119,this.personal.state)
        this.getRelative()
        this.changePickerInfo({
          isShow:true,
          title:'选择亲戚'
        })
      },
      getRelative(){
        this.$api.relative.getRelative().then((res)=>{
          this.pickList = res.data.data
          for(let i=0;i<this.pickList.length;i++){
            this.pickList[i] = Object.assign({text:this.pickList[i].name},this.pickList[i])
          }
          this.changePickerInfo({
            dataList:this.pickList
          })
        })
      },
      dialogConfirm(){
        if(this.rightNavList.indexOf(this.pickInfo.currentItem) === -1 && this.pickInfo.currentItem !==''){
          this.rightNavList.push(this.pickInfo.currentItem)
          this.outCurrentRelative = this.pickInfo.currentItem
        }
        this.changePickerInfo({
          currentItem:''
        })
      },
      navClick(name){
        this.changePickerInfo({
          currentItem:''
        })
      },
      tabChange(index,title){
        this.changePickerInfo({
          isShow:false,
          currentItem:''
        })
        //console.log(157,index)
      },
      initParams(){
        //如果不是游客登录，查看有没有填过信息
        this.$api.personal.searchPersonalInfo(this.userInfo.userId).then((res)=>{
          /*this.personal = {
            data: res.data.data,
            state: 'edit'
          }*/
          //this.personal.data = [1,2,3]
          // this.personal = 1
          if(res.data.data.length === 0){
            // this.personal.state = 'add'; // 不知道什么原因 只能修改整个对象了
            //this.$set(this.personal, 'state', 'add')
            this.personal = {
              data: res.data.data,
              state: 'add'
            }
          }else{
             this.personal.state = 'edit'
            //this.$set(this.personal, 'state', 'edit')
            this.personal = {
              data: res.data.data,
              state: 'edit'
            }
          }

        })

      },
      ...mapActions(['changePickerInfo'])
    },
    mounted(){

      this.initParams()
    },
    computed:{
      ...mapState(['pickInfo','userInfo'])
    },
    components:{
      headerContent,
      formPicker,
      pickerAndPopup,
      datePicker
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
            .other-panel{
                @include vertical-center;
                align-items: flex-start;
                .left{
                    width: 100px;
                    .add-sidebar{
                        @include vertical-center;
                        width: 100%;
                        margin-top: 10px;
                    }
                }
                .right{
                    width: 100%;
                }
            }
        }
    }
</style>
<style lang="scss" >
    .darker{
        color: $dark;
    }
    .p-home{
        .home-tab{
            .van-tabs__line{
                background-color: $theme2!important;
            }
        }
        .dialog-mask{
            .item-row{
                padding: 20px 0;
                @include vertical-center;
            }
        }
        .other-panel{
            .left{
                .van-sidebar-item--select{
                    border-color: $theme2!important;
                }
            }
        }
    }
</style>
