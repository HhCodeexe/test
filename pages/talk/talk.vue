<template>
	<view>
	  <h1 class="title">
		欢迎
		<span style="color: #ff5500">{{ nickName }}</span>
		进入聊天室
	  </h1>
	<div class="content">
		<div class="content__chat" v-for="item in words" :key="item">
			<div class="right">
				<div class="dialog">{{ item.isay }}</div>
				<img class="img" v-if="loginChecked" :src="avatarUrl" />
				<img class="img" v-else src="/static/user_img/userhead.png"/>
			</div>
			<div class="left">
				<img class="img" :src="headLeft" />
				<div class="dialog">{{ item.robot }}</div>
			</div>
		</div>
		<div class="sendmass">
			<form @submit="controlDevice(inputValue)">
				<div class="btns__form">
					<input
					@confirm="controlDevice(inputValue)"
					autofocus
					type="text"
					class="words"
					name="word"
					placeholder="说点什么吧~"
					v-model="inputValue"
					/>
				</div>
				<div class= "btns">
					<button class="send" form-type="submit">发送</button>
					<button class="delete" form-type="reset">清空</button>
				</div>
			</form>	
		</div>
	</div>
</view>
</template>

<script>
	import {mapState} from 'vuex'
	// import store from '@/store/index.js'
	export default {
		data() {
			return {
				words: [{
					'robot': '你好！我是蛋黄派派，跟我聊天可以陪你闲聊解闷，快来跟我聊天吧~',
					'isay': '你好呀~'
				}],
				inputValue: '',
				headLeft: '/static/image/xiaopai.png',	
			}
		},
		computed: mapState({
				nickName: state => state.nickName,
				avatarUrl: state => state.avatarUrl,
				ledChecked: state => state.ledChecked,
				fanChecked: state => state.fanChecked,
				loginChecked: state => state.loginChecked,
			}),
		methods: {
			controlDevice(isay) {
				this.inputValue = ''
				if (/开.*灯/g.test(isay)) {
					this.$store.state.ledList[0].ledChecked0 = 1
					this.onPublishDevice()
					this.words.push({
						'robot': '灯已经打开啦~',
						'isay': isay
					})
				} else if (/关.*灯/g.test(isay)) {
					this.$store.state.ledList[0].ledChecked0 = 0
					this.onPublishDevice()
					this.words.push({
						'robot': '灯已经关闭啦~',
						'isay': isay
					})
				} else if (/开.*风扇/g.test(isay)) {
					this.$store.state.fanList[0].fanChecked0 = 1
					this.onPublishDevice()
					this.words.push({
						'robot': '风扇已经打开啦~',
						'isay': isay
					})
				} else if (/关.*风扇/g.test(isay)) {
					this.$store.state.fanList[0].fanChecked0 = 0
					this.onPublishDevice()
					this.words.push({
						'robot': '风扇已经关闭啦~',
						'isay': isay
					})
				} else if (/温湿度/g.test(isay)) {
					this.words.push({
						'robot': '室内温度:' + this.$store.state.temperature + ',室内湿度:' + this.$store.state.humidity,
						'isay': isay
					})
				} else {
					this.converSation(isay)
				}
			},
			converSation(isay) {
				let that = this
				let obj = {}
				that.inputValue = ''
				const key = '' //这里填入图灵机器人的apikey
			
				wx.request({
					url: 'http://www.tuling123.com/openapi/api?key=' + key + '&info=' + isay + '&userid=暂无',
					success(res) {
						console.log(res);
						obj.robot = res.data.text
						obj.isay = isay
						that.words.push(obj)
					}
				})
			},
			
		}
	}
</script>

<style>
	.title {
		width: 100%;
		height: 60rpx;
		font-size: 36rpx;
		text-align: center;
		color: #2d2d2d;
		background-color: #ffff7f;
		letter-spacing: 4rpx;
		padding: 20rpx;
	}
	.content{
		width: 100%;
		height: 820rpx;
		background-color:white;
		overflow-y: scroll;
	}
	.right{
		width: 100%;
		text-align:right;
		margin-bottom: 20rpx;
	}
	.img{
		width: 10%;
		height: 60rpx;
		border-radius: 50%;
		vertical-align:text-bottom;
		margin: 0 10rpx;
	}
	.dialog{
		padding: 15rpx;
		display: inline-block;
		max-width: 510rpx;
		background-color: #ffff7f;
		color: #2d2d2d;
		font-size: 34rpx;
		border-radius: 20rpx;
	}
	.sendmass{
		display:inline-block;
		width: 100%;
		height: 140rpx;
		position: absolute;
		bottom: 0rpx;
		background-color:#ffff7f;
	}
	.btns__form{
		width: 45%;
		height: 100rpx;
		display:inline-block;
		background-color:#ffff7f;
		position: absolute;
		left: 20rpx;
		bottom: 15rpx;
	}
	.words {
		width: 100%;
		height: 100%;
		color: #000000;
		border-radius: 30rpx;
		background-color: white;
	}
	.btns{
		width: 50%;
		height: 100rpx;
		display:inline-block;
	}
	.delete {
		width: 150rpx;
		height: 100rpx;
		display:inline-block;
		position: absolute;
		right: 200rpx;
		bottom: 15rpx;
	}
	.send{
		width: 150rpx;
		height: 100rpx;
		display:inline-block;
		position: absolute;
		right: 20rpx;
		bottom: 15rpx;
	}
	
	
</style>
