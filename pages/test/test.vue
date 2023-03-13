<template>
	<view>
		<uni-forms ref="form" :modelValue="formData" :rules="rules">
			<uni-forms-item label="姓名" name="name">
				<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="邮箱" name="email">
				<input class="input" v-model="formData.email" type="text" placeholder="请输入用户名" @input="binddata('email',$event.detail.value)" />
			</uni-forms-item>
		</uni-forms>
		<button @click="submit">Submit</button>
	</view>
</template>
			 

<script>
	
	
	export default {
		data() {
			return {
				// 表单数据
				formData: {
					name: 'LiMing',
					email: 'dcloud@email.com'
				},
				rules: {
					// 对name字段进行必填验证
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名',
							},
							{
								minLength: 3,
								maxLength: 5,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					// 对email字段进行必填验证
					email: {
						rules: [{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址',
						}]
					}
				}
			}
		},
		created(){
			this.aliyun_connect();
		},
		methods: {
			
		}
	}
</script>


<style>

</style>
