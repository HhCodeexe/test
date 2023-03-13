<template>
	<view>
		<div class="device">
			<div class="led">
				<div class="led__image">
					<img class="img" v-if="ledList[0].ledChecked0 == 0" src="/static/control_img/led_off.png" />
					<img class="img" v-else src="/static/control_img/led_on.png" />
				</div>
				<div class="led__info">
					<h1 class="ledtitle">主灯泡:</h1>
					<switch class="ledswitch-btn" :checked="ledList[0].ledChecked0" @change="controlDevice('led0')" active-color="#FFB300" inactive-color="#664800" />
					<!-- <button class="add-btn" @click="navigate('/pages/control/modules/AddLed/index')">新增灯泡</button> -->
				</div>
			</div>
			<div class="fan">
				<div class="fan__image">
					<img class="img" v-if="fanList[0].fanChecked0 == 0" src="/static/control_img/fan_off.png" />
					<img class="img" v-else src="/static/control_img/fan_on.png" />
				</div>
				<div class="fan__info">
					<h1 class="fantitle">主风扇:</h1>
					<switch class="fanswitch-btn" :checked="fanList[0].fanChecked0" @change="controlDevice('fan0')" active-color="#1C86E5" inactive-color="#082845" />
					<!-- <button class="add-btn" @click="navigate('/pages/control/modules/AddFan/index')" style="background-color: #1C86E5;">新增风扇</button> -->
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: mapState({
				ledChecked: state => state.ledChecked,
				fanList: state => state.fanList,
				ledList: state => state.ledList,
		}),
		methods: {
			
		}
	}
</script>

<style>
	.device{
		padding: 50rpx;
	}
	.led{
		width: 100%;
		height: 50%;
	}
	.led__image{
		width: 150rpx;
		height: 150rpx;
		display:inline-block;
		background-color: white;
	}
	.led__info{
		position: relative;
		top: -60rpx;
		width: 50%;
		height: 150rpx;
		display:inline-block;
		background-color: white;
	}
	.ledtitle{
		position: relative;
		top: 0;
		background-color: greenyellow;
		width: 100%;
		height: 30%;
		font-size: 40rpx;
		color: #000000;
		letter-spacing: 6rpx;
	}
	.ledswitch-btn{
		/* position: relative;
		top: 70rpx;
		left: 50rpx; */
	}
	.fen{
		width: 100%;
		height: 50%;
	}
	.fan__image{
		width: 150rpx;
		height: 150rpx;
		display: inline-block;
		background-color: white;
	}
	.fan__info{
		position: relative;
		top: -56rpx;
		width: 50%;
		height: 150rpx;
		display: inline-block;
		background-color: white;
	}
	.fantitle{
		background-color: greenyellow;
		font-size: 40rpx;
		color: #000000;
		letter-spacing: 6rpx;
	}
	.fanswitch-btn{
		/* position: absolute;
		top: 520rpx;
		left: 420rpx; */
	}
	.img{
		width: 100%;
		height: 100%;
	}
</style>
