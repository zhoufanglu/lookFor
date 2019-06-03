<template>
    <div class="date-picker">
        <!--底部地区弹窗-->
        <van-popup v-model="datePick.isShow"
                   position="bottom"
                   :close-on-click-overlay="false"
                   class="popup-mask"
        >
            <van-datetime-picker
                    v-model="datePick.birthOfData"
                    type="date"
                    :min-date="datePick.minDate"
                    :max-date="datePick.maxDate"
                    :formatter="formatter"
                    @confirm="onConfirm"
                    @cancel="onCancel"
            />
        </van-popup>
    </div>
</template>
<script>
  import eventBus from '@/assets/js/utils/eventBus.js';
  import { dateFormat } from '@/assets/js/utils/validate.js'

  export default {
    data() {
      return {
        datePick:{
          minDate: new Date('1900-01-01'),
          maxDate: new Date(),
          isShow:false,
          birthOfData: new Date('2000-01-01')
        },
      }
    },
    methods: {
      formatter(type,value){
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }else if (type === 'day') {
          return `${value}日`
        }
        return value;
      },
      onConfirm(value){
        eventBus.$emit('setDate',dateFormat(value))
        this.datePick.isShow = false
      },
      onCancel(){
        this.datePick.isShow = false
      },
    },
    components: {},
    computed:{

    },
    mounted() {
        eventBus.$on('openDatePicker',(open)=>{
          this.datePick.isShow = open
        })
    }
  }
</script>
<style lang="scss" scoped>
    .date-picker{

    }
</style>
<style lang="scss">

</style>
