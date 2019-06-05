<template>
    <div class="form-picker">
        <van-cell-group>
            <van-field
                    v-model="info.surname"
                    required
                    clearable
                    label="姓氏"
                    right-icon="question-o"
                    placeholder="请输入姓氏"
                    @click-right-icon="$toast('例：孙，卢,欧阳。')"
            />

            <van-field
                    v-model="info.name"
                    label="姓名"
                    placeholder="请输入名字"
                    required
            />

            <van-cell>
                <div slot="title" class="label">性别</div>
                <div slot="" class="sex-radio">
                    <van-radio-group v-model="info.sex">
                        <van-radio name="男">男</van-radio>
                        <van-radio name="女">女</van-radio>
                    </van-radio-group>
                </div>
            </van-cell>

            <van-cell>
                <div slot="title" class="label-no-require">诞生日</div>
                <span @click="dateClick"
                      :class="info.dateOfBirth===''?'':'darker'"
                      class="date-picker-span"
                >{{info.dateOfBirth===''?'点击选择出生日期':info.dateOfBirth}}</span>
            </van-cell>


            <van-cell>
                <div slot="title" class="label-no-require">地区</div>
                <div slot="" class="choose-area">
                    <span @click="spanClick" :class="pickInfo.currentItem===''?'':'darker'">{{pickInfo.currentItem===''?'点击选择地区':pickInfo.currentItem}}</span>
                </div>
            </van-cell>


            <van-cell>
                <div slot="title" class="tip">注:带<span style="color: red">*</span>为必填</div>
            </van-cell>
            <van-cell class="save-cell">
                <van-button
                        type="default"
                        :loading="btnLoading"
                        @click="saveInfo"
                >{{personal.state==='edit'?'修改信息':'保存信息'}}</van-button>
            </van-cell>
        </van-cell-group>
    </div>
</template>
<script>
  import {mapState,mapActions } from 'vuex'
  import datePicker from '@c/datePicker.vue'
  import eventBus from '@/assets/js/utils/eventBus.js'
  import { dateFormat } from '@/assets/js/utils/validate.js'
  import { personal} from '@/request/api/module/personal.js'

  export default {
    name: '',
    props:['active','personal',],
    data(){
      return{
        info:{
          surname:'',
          name:'',
          nowLocation:'',
          beforeLocation:'',
          sex:'男',
          dateOfBirth:'',
          userId: '',
        },
        nowLocationList:[],
        show:true,
        btnLoading:false,
        datePick:{
          minDate: new Date('1900-01-01'),
          maxDate: new Date(),
          isShow:true
        },
      }
    },
    methods:{
      getNowLocation(){
        this.$api.user.getNowLocation().then(res=>{
          this.nowLocationList = res.data.data;
          for(let i=0;i<this.nowLocationList.length;i++){
            this.nowLocationList[i] = Object.assign({text:this.nowLocationList[i].name},this.nowLocationList[i])
          }
        })
      },
      //以下是响应子组件的方法
      spanClick(){
        this.changePickerInfo({
          isShow:true,
          title:'选择地区',
          dataList:this.nowLocationList,
        })
      },
      saveInfo(){
        let flag = false
        if(String(this.active) === '0'){
          flag = this.valiDate('0')
        }else if(String(this.active) === '1'){

        }
        if(flag){ //保存
          this.btnLoading = true
          console.log(117,this.info)
          this.info.nowLocation = this.pickInfo.currentItem
          this.$api.personal.addPersonalInfo(
            this.info
          ).then(res=>{
            this.btnLoading = false
            this.$notify({
              message: res.data.msg,
              duration: 2000,
              background: '#3399ff'
            })
            console.log(120,res)
          })
        }
      },
      valiDate(cate){
        if(cate === '0'){
            if(this.info.surname ===''||this.info.name===''){
              this.$tip.fail('带*号的为必填！')
              return false
            }else{
              return true
            }
        }else if(cate === '1'){

        }
      },
      initParams(){
        eventBus.$on('setDate',(date)=>{
          this.info.dateOfBirth = date
        })
        this.info.userId = this.userInfo.userId
        //init personal
        console.log(149,this.personal)
        console.log(150,this.personal.state)
        /*if (this.personal.data.length !== 0) {
          console.log(this.personal.data[0])
          this.info.surname = this.personal.data[0].surname
          this.info.name = this.personal.data[0].name
          this.info.sex = this.personal.data[0].sex
          this.info.nowLocation = this.personal.data[0].now_location
          this.info.dateOfBirth = this.personal.data[0].date_of_birth
        }*/
      },
      dateClick(){
        eventBus.$emit('openDatePicker',true)
      },
      ...mapActions(['changePickerInfo'])
    },
    mounted(){
      this.getNowLocation()
      this.initParams()
      //this.loadVanList()
    },
    computed:{
      ...mapState(['pickInfo','userInfo'])
    },
    components:{
      datePicker
    },
    watch:{
      personal(newValue,oldValue){
        console.log(181,newValue) // 这里拿不到吗？拿不到 打开试试
      },
      [`personal.state`]:function(newValue){
        console.log(183,newValue)
      }
    }
  }
</script>
<style lang="scss" scoped>
    .form-picker{
        .tip{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 14px;
            margin-left: 30px;
            color: $stable;
        }
        .label{
            @extend .tip;
            color: $darker;
            &:before{
                content: '*';
                color: red;
                position: absolute;
                left: 7PX;
            }
        }
        .label-no-require{
            @extend .tip;
            color: $darker;
        }
        .choose-area{
            text-align: left;
            span{
                width: 100%;
                display: flex;
            }
        }
        .darker{
            color: $darker;
        }
        .save-cell{
            @include vertical-center;
            >div{
                @include vertical-center;
                .van-button--default{
                    width: 100px;
                    /*background-color: $theme2!important;
                    color: white;
                    font-weight: bolder;*/
                }
            }
        }
        .date-picker-span{
            width: 100%;
            display: flex;
        }
    }
</style>
<style lang="scss">
    .form-picker{
        .van-cell__value{
            flex: 3;
        }
        .sex-radio{
            .van-radio-group{
                display: flex;
                .van-radio:last-child{
                    margin-left: 40px;
                }
                .van-icon{
                    border-color: $theme2;
                    //color: $theme2;
                    background-color: $theme2;
                }
            }
        }
    }
</style>
