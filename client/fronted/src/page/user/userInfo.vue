<template>
  <div class="p-user-info">
    <header-content name="用户信息" isShowReturn="true"></header-content>
    <div class="p-row">
      <span></span>
      <span>名称</span>
      <span>密码</span>
    </div>
    <div class="p-row"
      v-for="(i, index) in users"
    >
      <span>{{index+1}}</span>
      <span>{{i.userName}}</span>
      <span>{{i.password}}</span>
    </div>
  </div>
</template>
<script>
  import headerContent from '@c/header.vue'
  export default {
    name: '',
    components: {headerContent},
    data() {
      return {
        users: []
      }
    },
    created() {
      this.$api.user.getUserInfo({password: 123456})
        .then(res => {
          console.log(14, res.data.data)
          this.users = res.data.data
        })
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .p-user-info {
    .p-row{
      margin-bottom: 20px;
      padding: 6px;
      @include vertical-center;
      width: 100%;
      >span{
        flex: 1;
        display: flex;
        justify-content: flex-start;
      }
    }
  }
</style>
