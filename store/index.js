//页面路径：store/index.js
import { createStore } from 'vuex'
const store = createStore({
	state: {
		fanList: [{
				fanChecked0: false
			},
			{
				fanChecked1: false
			},
			{
				fanChecked2: false
			},
			{
				fanChecked3: false
			}
		],
		ledList: [{
				ledChecked0: false
			},
			{
				ledChecked1: false
			},
			{
				ledChecked2: false
			},
			{
				ledChecked3: false
			}
		],
		temperature: 0,
		humidity: 0,
		loginChecked: false,
		mqttChecked: false,
		nickName: '***',
		account:'***',
		headUrl:'',
		// avatarUrl: 'http://www.zweat.site:8082/resource/images/head.png' //要改
	},
	mutations: {
		changeFanState(state) {
			state.fanList[0].fanChecked0 = !state.fanList[0].fanChecked0
		},
		changeNickName(state,payload){
			state.nickName = payload.nickName
		},
		setAccount(state,account){
			state.account = account
		},
		setHeadUrl(state,url){
			state.headUrl = url
		}
	}
})

export default store

// import Vuex from 'vuex'
// import Vue from 'vue'
// Vue.use(Vuex)

// export default new Vuex.Store({
// 	state: {
// 		fanList: [{
// 				fanChecked0: false
// 			},
// 			{
// 				fanChecked1: false
// 			},
// 			{
// 				fanChecked2: false
// 			},
// 			{
// 				fanChecked3: false
// 			}
// 		],
// 		ledList: [{
// 				ledChecked0: false
// 			},
// 			{
// 				ledChecked1: false
// 			},
// 			{
// 				ledChecked2: false
// 			},
// 			{
// 				ledChecked3: false
// 			}
// 		],
// 		temperature: 0,
// 		humidity: 0,
// 		loginChecked: false,
// 		mqttChecked: false,
// 		nickName: '***',
// 		avatarUrl: 'http://www.zweat.site:8082/resource/images/head.png'
// 	},
// 	mutations: {
// 		changeFanState(state) {
// 			state.fanList[0].fanChecked0 = !state.fanList[0].fanChecked0
// 		}
// 	}
// })
