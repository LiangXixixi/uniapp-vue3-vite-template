<template>
	<view class="global-box" :style="{ paddingTop: `${staticHeight + 10}px`, color: textColor, background: boxBackground }" :class=" isFixed ? 'fixed' : '' ">
		<view class="global-title" v-if="isShow">
			<!-- #ifndef APP-NVUE -->
			<view class="back iconfont xlys-tubiaokongjian-15" @click="navBack"></view>
			<!-- #endif -->
			<!-- #ifdef APP-NVUE -->
			<view class="back" @click="navBack">
				<image class="image" src="@/static/images/index-footer-layer-arrow.png" mode="aspectFit"></image>
			</view>
			<!-- #endif -->
			<view class="text" v-if="text">
				<text class="t">{{ text }}</text>
			</view>
			<!-- #ifdef APP-NVUE -->
			<view class="placeholder"></view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue'

/**
 * @param {string} text 页面文本
 * @param {boolean} isShow 是否显示global-title
 */
defineProps({
	text: {
		type: String,
		default: ''
	},
	isShow: {
		type: Boolean,
		default: true
	},
	textColor: {
		type: String,
		default: '#1E1E1E'
	},
	isFixed: {
		type: Boolean,
		default: false
	},
	boxBackground: {
		type: String,
		default: '#00000000'
	}
})

const staticHeight = computed(() => uni.getSystemInfoSync().statusBarHeight)

const emits = defineEmits(['navBack'])
/**
 * 返回上一个页面 抛出返回成功回调
 */
const navBack = () => {
	uni.navigateBack({
		success: () => {
			emits('navBack')
		}
	})
}
</script>

<style scoped>
.global-box{width:100%;}
.global-box.fixed{position:fixed;top:0;z-index:1;left:0;right:0;}
/* #ifndef APP-NVUE */
.global-box .global-title{padding:20rpx;display:grid;grid-template-columns:repeat(3,1fr);align-items:center;}
/* #endif */
/* #ifdef APP-NVUE */
.global-box .global-title{padding:20rpx;display: flex;flex-direction: row;justify-content: space-between;}
/* #endif */
.global-box .global-title .back{font-weight:700;font-size:26rpx;}
.global-box .global-title .back .image{width: 30rpx;height: 30rpx;}
.global-box .global-title .text{text-align:center;}
.global-box .global-title .text .t{font-size:30rpx;}
.global-box .global-title .placeholder{width: 20px;}
</style>
