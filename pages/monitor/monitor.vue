<template>
	<view>
		<div class="">
		  <div class="info" style="background-image: url(../../static/monitor_img/bg-1.png);">
		    <div class="show">
		      <image class="image" src="/static/monitor_img/icon-1.png"></image>
		      <i class="i">监控状态 :</i>
			  <i class="i" style="color: rgba(9,27,246,0.91)" v-if="mqttChecked">正常</i> 
			  <i class="i" style="color: rgba(170, 0, 0, 0.9)" v-else>异常</i> 
		    </div>
		    <div class="show">
		      <image class="image" src="/static/monitor_img/icon-2.png"></image>
		      <i class="i">异常告警 :</i>
		      <i class="i" style="color: rgba(246,60,32,0.91)">{{ count }}</i>
		    </div>
		  </div>
		  <div class="vedio" style="background-image: url(../../static/monitor_img/bg-3.png);">
			  <img src="http://192.168.31.224:8080/?action=stream" />
			  <!-- <image src="/static/smarthome.png"></image> -->
		    <ul class="tool">
		      <li @click="onPlice">
		        <image class="phone" src="/static/monitor_img/police.png"></image>
		      </li> 
		    </ul>
		  </div>
		  <button @click="open()">一键报警</button>
		  <uni-popup ref="popup" type="dialog">
		  	<uni-popup-dialog mode="base" title = "报警!" content = "拨打110!" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		  </uni-popup>
		  <div class="date">
			  <image class="dataImg" src="../../static/monitor_img/lowTemp.png" v-if="temperature<40"></image>
			  <image class="dataImg" src="../../static/monitor_img/highTemp.png" v-else></image>
			  温度:{{temperature}}
		  </div>
		  <div class="date">
			  <image class="dataImg" src="../../static/monitor_img/lowHum.png" v-if="humidity<40"></image>
			  <image class="dataImg" src="../../static/monitor_img/highHum.png" v-else></image>
			  湿度:{{humidity}}
		  </div>
		</div>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				count:0,
			}
		},
		computed: mapState({
			mqttChecked: state => state.mqttChecked,
			temperature: state => state.temperature,
			humidity: state => state.humidity,
		}),
		methods: {
			open() {
				//console.log('打开')
				this.$refs.popup.open()
			},
			close() {
				//console.log('关闭')
				this.$refs.popup.close()
			},
			confirm(value) {
				//console.log('确认')
				this.count++
				wx.makePhoneCall({
					phoneNumber: '110'
				})
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
	.info {
		background-size: 100% 100%;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		padding-top: 20rpx;
		padding-left: 0rpx;
		padding-right: 0rpx;
		padding-bottom: 20rpx;
	}
	.show {
		width: 50%;
		color: #ffffff;
		font-size: 28rpx;
		text-align: center;
	}
	.i{
		display: inline-block;
	}
	.image {
		display: block;
		height: 80%;
		width: 20%;
		margin: 0 auto;
	}
	.vedio{
		background-size: 100% 100%;
		position: relative;
	}
	.tool{
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		left: 50rpx;
		top: 50rpx;
		border-radius: 30rpx;
		border-bottom: 10px solid #8f8f94;
		background-color: red;
		padding: 30rpx;
	}
	.phone{
		display: block;
		width: 40rpx;
		height: 40rpx;
	}
	.date{
		width: 50%;
		height: 200rpx;
		display: inline-block;
	}
	.dataImg{
		width: 150rpx;
		height: 150rpx;
	}
</style>
