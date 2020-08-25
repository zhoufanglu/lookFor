<template>
  <div class="p-global-loading">
    <van-overlay :show="show" @click=""
      class="p-overlay"
    >
      <van-loading color="#1989fa" />
    </van-overlay>
  </div>
</template>
<script>
  export default {
    name: '',
    components: {
    },
    data() {
      return {
        show: true
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .p-global-loading {
    .p-overlay{
      @include vertical-center;
    }
  }
</style>
