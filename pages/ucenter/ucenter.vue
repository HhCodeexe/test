<template>
	<view class="all">
		<div class="top">
			<div class="head">
				<image class="head_img" v-bind:src= "headUrl"></image>
			</div>
			<div class="massage">
				<div class="nickname">
					昵称:{{nickName}}
				</div>
				<div class="account">
					账号:{{account}}
				</div>
			</div>
		</div>
		<div class="device_id">
			<div class="inline_block">
				<image class="icon" src="/static/user_img/device.png"></image>
			</div>
			<div class="text-area">
				设备码
			</div>
			<div class="arrow">
				<image class="icon2" src="/static//user_img//arrow.png"></image>
			</div>
		</div>
		<div class="operate">
			<div class="inline_block">
				<image class="icon" v-bind:src="headUrl"></image>
			</div>
			<div class="text-area2" @click="upLoadHead">
				<div class="action">
					修改头像
				</div>
				<div class="arrow">
					<image class="icon2" src="/static//user_img//arrow.png"></image>
				</div>
			</div>
			<!-- 修改昵称 -->
			<div class="inline_block">
				<image class="icon" src="/static//user_img//nickname.png"></image>
			</div>
			<div class="text-area2" @click="open">
				<div class="action">
					修改昵称
				</div>
				<div class="arrow">
					<image class="icon2" src="/static//user_img//arrow.png"></image>
				</div>
			</div>
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog mode="input" title="输入昵称:" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
			<!-- 修改密码 -->
			<div class="inline_block">
				<image class="icon" src="/static//user_img//password.png"></image>
			</div>
			<div class="text-area2" @click="navigateTo">
				<div class="action">
					修改密码
				</div>
				<div class="arrow">
					<image class="icon2" src="/static//user_img///arrow.png"></image>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import store from '@/store/index.js'
	// import index from 'alibabacloud-iot-device-sdk'
	// import dist from 'alibabacloud-iot-device-sdk
	
	// const iot = require('alibabacloud-iot-device-sdk')
	const iot = require('./dist/alibabacloud-iot-device-sdk.js') //引用路径以实际为准    
	 

	export default {
		data() {
			return {
				
			}
		},
		computed:mapState({
			nickName: state => state.nickName,
			account: state => state.account,
			headUrl:state => state.headUrl,
		}),
		methods: {
			aliyun_connect(){
				console.log('开始连接：')
				
				const device = iot.device({
					productKey: `a1B****IEnc`, //将${productKey}修改为实际产品的ProductKey
					deviceName: `WeChat`,//将${deviceName}修改为实际设备的DeviceName
					deviceSecret: `b8cc45e8cb58eb67*****63d8b53fa4a`,//将${deviceSecret}修改为实际设备的DeviceSecret
				})
				
				// 监听connect事件
				device.on('connect', () => {
				  //将${productKey}和${deviceName}修改为实际值
				  // device.subscribe('/a1BB9kEIEnc/WeChat/user/get');
				  console.log('connect successfully!');
				  // device.publish('/a1BB9kEIEnc/WeChat/user/update', 'hello world!');
				})
				// 监听message事件
				device.on('message', (topic, payload) => {
				  console.log(topic, payload.toString());
				})
			},
			open() {
				//console.log('打开')
				this.$refs.popup.open()
			},
			close() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				//console.log('关闭')
				this.$refs.popup.close()
			},
			confirm(value) {
				// 输入框的值
				console.log(value)
				// TODO 做一些其他的事情，手动执行 close 才会关闭对话框
				this.changeNickName(value)
				this.$refs.popup.close()
			},
			changeNickName(value) {//整个对象都作为载荷传给 mutation 函数
				store.commit({
					type: 'changeNickName',
					nickName: value
				})
			},
			setHeadUrl(value) {
				store.commit('setHeadUrl',value)
			},
			navigateTo(){
				uni.navigateTo({
					url:"/pages/changePassword/changePassword"
				})
			},
			upLoadHead(){
				let that = this
				//前端代码
				uni.chooseImage({
				  count: 1,
				  success(res) {
				    console.log('图片选择',res);
				    if (res.tempFilePaths.length > 0) {
						uni.showLoading({
							title: '上传中...'
						})
						let filePath = res.tempFilePaths[0]
						//进行上传操作
						// callback方式，与promise方式二选一即可
						uniCloud.uploadFile({
							filePath: filePath,
							cloudPath:that.account+ '.jpg',
							onUploadProgress: function(progressEvent) {
							  console.log('传输结果',progressEvent);
							  var percentCompleted = Math.round(
								(progressEvent.loaded * 100) / progressEvent.total
							  );
							},
							success() {
								that.setHeadUrl(res.tempFilePaths);
								uniCloud.callFunction({
									name:'changeHeadUrl',
									data:{
										headUrl:res.tempFilePaths
									},
									success() {
										uni.showLoading({
											title: '上传成功！'
										});
										setTimeout(function () {
											uni.hideLoading();
										}, 1500);
									}
								})
								console.log('成功结果',res.tempFilePaths);
							},
							fail() {
								uni.showLoading({
									title: '上传失败！'
								});
								setTimeout(function () {
									uni.hideLoading();
								}, 2000);
								console.log('失败结果',res)
							},
							complete() {
								
							}
						});
				    }
				  }
				});
			},
			
		}
	}
</script>

<style>
	.all{
		background-color: gainsboro;
	}
	.top{
		width: 100%;
		height: 200rpx;
		background-color: white;
	}
	.head{
		border-radius: 20rpx;
		width: 200rpx;
		height: 200rpx;
		display: inline-block;
	}
	.head_img{
		width: 200rpx;
		height: 200rpx;
	}
	.massage{
		position: relative;
		top: -45rpx;
		width: 400rpx;
		height: 200rpx;
		padding:0 50rpx;
		display: inline-block;
	}
	.nickname{
		width: 550rpx;
		height: 100rpx;
		padding: 10rpx 0 10rpx;
		font-size: 150%;
	}
	.account{
		width: 550rpx;
		height: 70rpx;
	}
	.device_id{
		width: 100%;
		height: 100rpx;
		margin: 20rpx 0;
		text-align:left;
		display: inline-block;
		background-color: white;
	}
	.inline_block{
		display: inline-block;
	}
	.text-area{
		position: relative;
		top: -40rpx;
		width: 580rpx;
		height: 50rpx;
		display: inline-block;
		
	}
	.operate{
		width: 100%;
		height: 350rpx;
		background-color: white;
	}
	.text-area2{
		display: inline-block;
		width: 650rpx;
		height: 50rpx;
		border-bottom: 2rpx solid whitesmoke;
	}
	.action{
		position: relative;
		top: -30rpx;
		width: 580rpx;
		height: 50rpx;
		display: inline-block;
	}
	.arrow{
		position: relative;
		top: -30rpx;
		display: inline-block;
	}
	.icon{
		width: 100rpx;
		height: 100rpx;
	}
	.icon2{
		width: 40rpx;
		height: 40rpx;
	}
</style>
