import {
	mapState
} from 'vuex'
export default {
	data() {
		return {}
	},
	computed: {
		...mapState(['fanList', 'ledList'])
	},
	methods: {
		navigate(url) {
			wx.navigateTo({
				url: url
			})
		},
		controlDevice(checked) {
			this.$store.state.ledList[0].ledChecked0 = (checked == 'led0' ? (!this.$store.state.ledList[0].ledChecked0) : this.$store
				.state.ledList[0].ledChecked0)
			this.$store.state.fanList[0].fanChecked0 = (checked == 'fan0' ? (!this.$store.state.fanList[0].fanChecked0) : this.$store
				.state.fanList[0].fanChecked0)
			this.$device.publish('/' + this.$sdk_device.productKey + '/' + this.$sdk_device.deviceName + '/user/putDevice', JSON
				.stringify({
					ledList: this.$store.state.ledList,
					fanList: this.$store.state.fanList
				}))
			console.log(this.$store.state.ledList,this.$store.state.fanList)
		}
	}
}
