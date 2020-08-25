<template>
  <div id="app">
    <Loading v-show="$store.state.loading"></Loading>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: '',
    components: {},
    data() {
      return {
      }
    },
    created() {
      //console.log(16, this.$store.state.loading)
    },
    mounted() {
    },
  }
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .icon {
    width: .75rem; height: .75rem;
    vertical-align: -0.15rem;
    fill: currentColor;
    overflow: hidden;
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
