<template>
  <div class="p-img-show">
    imgShow
  </div>
</template>
<script>
  export default {
    name: '',
    components: {},
    data() {
      return {}
    },
    created() {
      this.getImgNameList()
    },
    mounted() {
    },
    methods: {
      async getImgNameList() {
        const arr = await this.$api.tool.getImgNameList(100)
        console.log(21, arr.data.data)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .p-name {
  }
</style>
