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
                    <van-radio-group v-model="info.gender">
                        <van-radio name="1">男</van-radio>
                        <van-radio name="2">女</van-radio>
                    </van-radio-group>
                </div>
            </van-cell>

            <van-cell>
                <div slot="title" class="label-no-require">地区</div>
                <div slot="" class="choose-area">
                    <span @click="show=true" :class="info.nowLocation===''?'':'darker'">{{info.nowLocation===''?'请选择地区':info.nowLocation}}</span>
                </div>
            </van-cell>


            <van-cell>
                <div slot="title" class="tip">注:带<span style="color: red">*</span>为必填</div>
            </van-cell>
        </van-cell-group>
        <!--底部地区弹窗-->
        <van-popup v-model="show"
                   position="bottom"
        >
            <van-picker
                    show-toolbar
                    title="地区选择"
                    :columns="nowLocationList"
                    @cancel="onCancel"
                    @confirm="onConfirm"
                    @click="pickerClick()"
            />
        </van-popup>

    </div>
</template>
<script>
  export default {
    name: '',
    data(){
      return{
        info:{
          surname:'',
          name:'',
          nowLocation:'',
          gender:'1'
        },
        nowLocationList:[],
        show:false
      }
    },
    methods:{
      getNowLocation(){
        this.$api.user.getNowLocation().then(res=>{
          this.nowLocationList = res.data.data;
          for(let i=0;i<this.nowLocationList.length;i++){
            this.nowLocationList[i] = Object.assign({text:this.nowLocationList[i].name},this.nowLocationList[i])
            //console.log(71,Object.assign({text:i.name},i))
          }
          //console.log(70,this.nowLocationList)
        })
      },
      onConfirm(value,index){
        this.info.nowLocation = value.name
        this.show=false
      },
      onCancel(){
        this.show = false
      },
      pickerClick(){
        console.log(93,'xx')
      }
    },
    mounted(){
      this.getNowLocation()
      //this.loadVanList()
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
