<template>
	<view class="content">
		<image class="logo" src="/static//image/smarthome.png"></image>
		<view  v-if="flag">
			<text class="title">{{title}}</text>
			<view>
				用户名：<input focus placeholder="请输入用户名" v-model="username"/>
			</view>
			<view>
				密码：<input password type="text" placeholder="请输入密码" v-model="password"/>
			</view>
			<view>
				<button type="primary" @click="usersubmit">登录</button>
				<button type="default" @click="flag=!flag">注册</button>
			</view>
		</view>
		<view v-else>
			<view>
				用户名：<input focus placeholder="请输入用户名 2-17个字" v-model="username"/>
			</view>
			<view>
				密码：<input password type="text" placeholder="请输入密码" v-model="password"/>
			</view>
			<view>
				密码：<input password type="text" placeholder="请确认密码" v-model="repassword"/>
			</view>
			<view>
				<button type="default" @click="userregister">注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database();
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				flag: true,
				title: 'Hello',
				username: '',
				password: ''
			}
		},
		methods: {
			setAccount(value){
				store.commit('setAccount',value)
			},
			setHeadUrl(value){
				store.commit('setHeadUrl',value)
			},
			usersubmit : function(){
				console.log(this.username);
				console.log(this.password);
				db.collection('myusers')
					.where({
						name: this.username,
						password: this.password,
					})
					.get()
					.then((res)=>{
						console.log('数据库返回结果',res.result)
						// res.result.data[0].headUrl
						if(res.result.data.length == 1){
							uni.showToast({
								title: "登录成功！",
								icon: "success",
							});
							this.setAccount(res.result.data[0].name);
							this.setHeadUrl(res.result.data[0].headUrl);
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/ucenter/ucenter'
								})
							},2000)
						}else{
							uni.showToast({
								title: "登录失败！",
								icon: "error",
								duration: 3000
							})
						}
					})
					.catch((err)=>{
						console.log(err)
					})
			},
			userregister : function(){
				if(this.username==""){
					uni.showToast({
						title: '用户名为空！',
						icon: 'error',
						duration: 2500
					})
				}else if(this.password==""){
					uni.showToast({
						title: '密码为空！',
						icon: 'error',
						duration: 2500
					})
				}else if(this.password!=this.repassword){
					uni.showToast({
						title: '前后密码不一致',
						icon: 'error',
						duration: 2500
					})
				}else{
					db.collection("myusers")
						.where({name:this.username})
						.count()
						.then((res)=>{
							console.log(res);
							if(res.result.affectedDocs == 1){
								uni.showToast({
									title: '用户名已存在！',
									icon: 'error',
									duration: 2500
								})
							}else{
								db.collection("myusers").add({name: this.username,
															password: this.password,
														})
														.then((res)=>{
															console.log(res);
															//console.log('返回结果：' + res.result.errCode);
															if(res.result.errCode == 0){
																uni.showToast({
																	title: "注册成功！",
																	icon: "success",
																});
																this.setAccount(res.result.data[0].name);
																this.setHeadUrl(res.result.data[0].headUrl);
																setTimeout(()=>{
																	uni.switchTab({
																		url:'/pages/ucenter/ucenter'
																	})
																},2500)
															}else{
																uni.showToast({
																	title: "注册失败！",
																	icon: "error",
																	duration: 3000
																	})
																}
														})
														.catch((err)=>{
															console.log(err);
														});
							}
						})
						.catch((err)=>{
							console.log(err)
						});
				}
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
