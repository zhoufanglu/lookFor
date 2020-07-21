<template>
    <div class="p-user-info">
        <h3>userInfo</h3>
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
			this.$api.user.getUserInfo({password: 123456})
			.then(res=>{
				console.log(14, res.data.data)
            })
		},
		mounted() {
		},
		methods: {}
	}
</script>
<style lang="scss" scoped>
    .p-user-info {
    }
</style>
