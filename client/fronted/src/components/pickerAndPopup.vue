<template>
    <div class="picker-and-popup">
        <!--底部地区弹窗-->
        <van-popup v-model="pickInfo.isShow"
                   position="bottom"
                   :close-on-click-overlay="false"
                   class="popup-mask"
        >
            <van-picker
                    class="location-picker"
                    show-toolbar
                    :title="pickInfo.title"
                    :columns="pickInfo.dataList"
                    @cancel="onCancel"
                    @confirm="onConfirm"
                    @change="pickerChange"
            />
        </van-popup>
    </div>
</template>
<script>
  import {mapState,mapActions } from 'vuex'
  export default {
    data() {
      return {
        picker:false,
        pickerIsLoading:true,
      }
    },
    methods: {
      onConfirm(value){
        this.changePickerInfo({
            isShow:false,
            currentItem:value.name
        })
      },
      onCancel(){
        this.changePickerInfo({isShow:false})
      },
      pickerChange(obj,val){
        this.changePickerInfo({currentItem:val.name})
      },
      ...mapActions(['changePickerInfo'])
    },
    components: {},
    computed:{
      ...mapState(['pickInfo',])
    },
    mounted() {

    }
  }
</script>
<style lang="scss" scoped>
    .picker-and-popup{

    }
</style>
<style lang="scss">

</style>
