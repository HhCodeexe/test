<template>
	<view>
		<!-- <form @submit="changePassword">
			
		</form> -->
		<uni-forms ref="form" :modelValue="passwordData" :rules="rules" >
			<uni-forms-item label="账号:" name="account">
				<input type="text" v-model="passwordData.account" placeholder="请输入账号" />
			</uni-forms-item>
			<uni-forms-item label="新密码:" name="password">
				<input type="text" v-model="passwordData.password" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item label="确认密码:" name="repassword">
				<input type="text" v-model="passwordData.repassword" placeholder="请确认密码" />
			</uni-forms-item>
		</uni-forms>
		<button @click="submit">提交</button>
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				passwordData: {
					account: '',
					password: '',
					repassword:'',
				},
				//校验规则
				rules:{
					account:{
						rules:[
							{
								required: true,
								errorMessage: '请输入账号',
							},
						]
					},
					password:{
						rules:[
							{
								required: true,
								errorMessage: '请输入密码',
							}
						]
					},
					repassword:{
						rules:[
							{
								required: true,
								errorMessage: '请确认密码',
							},{
								validateFunction:function(rule,value,data,callback){
									if (value != data.password) {
										callback('前后密码不一致')
									}
									return true
								}
							}
						]
					}
				}
			}
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			submit(form) {
				this.$refs.form.validate().then(res=>{
					console.log('表单数据信息：', res);
					//改密码这里
					db.collection('myusers')
						.where({name: res.account})
						.update({password: res.repassword})
						.then((res)=>{
							console.log('数据库返回结果',res.result.updated)
							if(res.result.updated == 0){
								uni.showToast({
									title: "修改失败！",
									icon: "success",
								});
							}else{
								uni.showToast({
									title: "修改成功！",
									icon: "success",
								});
								setTimeout(()=>{
									uni.switchTab({
										url:'/pages/ucenter/ucenter'
									})
								},2000)
							}
						})
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			},
		}
	}
</script>

<style>

</style>
