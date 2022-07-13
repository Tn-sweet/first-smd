<template>
	<view class="index">
		<musichead title="Tn-Sweet" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search" @tap="handleTosearch()">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲">
				</view>
				<view class="index-list">
					<!-- <view class="index-list-item">
						<view class="index-list-img">
							<image src="../../static/img/z1.jpg" mode=""></image>
							<text>每日更新</text>
						</view>
						<view class="index-list-text">
							<view>1.与我无关 - 阿冗</view>
							<view>2.与我无关 - 阿冗</view>
							<view>3.与我无关 - 阿冗</view>
						</view> 
					</view> -->
					<view class="index-list-item" v-for="(item,index) in topList" :key="index" @tap="handleToList(item.listId)">
						<view class="index-list-img">
							<image :src="item.coverImgUrl" mode=""></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="index-list-text">
							<view v-for="(item,index) in item.tracks" :key="index">{{index + 1}}.{{item.first}} - {{item.second}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template> 

<script> 
	import musichead from '../../components/musichead/musichead.vue';
	import { topList } from '../../common/api.js';
	export default {
		data() {
			return {
				topList :[]
			}
		},
		components :{
			musichead
		},
		onLoad() {
			topList().then((res)=>{
				if(res.length){
					this.topList = res;
				}
			});
		},
		methods: {
			handleToList(listId){
				uni.navigateTo({
					url:'/pages/list/list?listId=' + listId
				});
			},
			handleTosearch(){
				uni.navigateTo({
					url:'/pages/search/search'
				});
			}
		}
	}
</script>

<style scoped>
	.index{}
	.index-search{
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 70rpx 30rpx 30rpx 30rpx;
		background: #f1f1f1;
		border-radius: 50rpx;
	}
	.index-search text{
		font-size: 26rpx;
		margin-right: 26rpx;
		margin-left: 28rpx;
	}
	.index-search input{
		font-size: 28rpx;
		flex: 1;
	}
	.index-list{
		margin:0 30rpx;
	}
	.index-list-item{
		display: flex;
		margin-bottom: 30rpx;
	}
	.index-list-img{
		width: 212rpx;
		height: 212rpx;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
		margin-right: 22rpx;
	}
	.index-list-img image{
		width: 100%;
		height: 100%;
	}
	.index-list-img text{
		position: absolute;
		left: 12rpx;
		bottom: 16rpx;
		color:white;
		font-size: 20rpx;
	}
	.index-list-text{
		font-size: 24rpx;
		line-height: 66rpx;
		width: 300rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
