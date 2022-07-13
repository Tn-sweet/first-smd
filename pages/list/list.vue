<template>
	<view class="list">
		
		<view class="fixbg"></view><musichead title="Tn-sweet" :icon="true"></musichead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="list-head">
					<view class="list-head-img">
						<image src="http://mms1.baidu.com/it/u=4128895629,606743989&fm=253&app=138&f=PNG&fmt=auto&q=75?w=500&h=500" mode=""></image>
						<text class="iconfont icon-yousanjiao">{{ playlist.playCount}}</text>
					</view>
					<view class="list-head-text">
						<view>{{playlist.name}}</view>
						<image :src="playlist.coverImgUrl"></image>
						<view>
						{{playlist.description}}
					    </view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button class="list-share" open-type="share">
					<text class="iconfont icon-fenxiang">分享给微信好友</text>
				</button>
				<!-- #endif -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont icon-bofang_o"></text>
						<text>播放全部</text>
						<text>(共{{ playlist.trackCount }}首)</text>
					</view>
					<!-- <view class="list-music-item">
						<view class="list-music-top">1</view>
						<view class="list-music-song">
							<view>与我无关</view>
							<view>阿冗 - 与我无关</view>
						</view>
						<text class="iconfont icon-bofang_o"></text>
					</view> -->
					<view class="list-music-item" v-for="(item,index) in playlist.tracks" :key="index" @tap="handleToDetail(item.id)">
						<view class="list-music-top">{{ index + 1 }}</view>
						<view class="list-music-song">
							<view>{{ item.name }}</view>
							<view>{{ item.ar[0].name }} - {{ item.name }}</view>
						</view>
						<text class="iconfont icon-bofang_o"></text>
					</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import musichead from '../../components/musichead/musichead.vue'
	import { list } from '../../common/api.js'
	export default {
		data() {
			return {
				playlist : {
					coverImgurl :'',
					subscribers:{
						avatarUrl:''
					}
				},
				isLoading : true
			}
		},
		components :{
			musichead
		},
		onLoad(options) {
			// console.log( options.listId );
			
			uni.showLoading({
				title: '正在加载QAQ'
			});
			
			list( options.listId ).then((res)=>{
				if(res.data.code == '200'){
					this.playlist = res.data.playlist;
					// this.$store.commit('INIT_TOPLISTIDS',res[1].data.playlist.trackIds);
					this.isLoading = false;
					uni.hideLoading();
				}
			});
		},
		methods: {
			handleToDetail(songId){
				uni.navigateTo({
					url:'/pages/detail/detail?songId=' + songId
				});
			}
		}
	}
</script>

<style scoped>
	
	.list-head{
		display: flex;
		margin:30rpx;
	}
	.list-head-img{
		width: 264rpx;
		height: 264rpx;
		border-radius: 30rpx;
		overflow: hidden;
		position: relative;
		margin-right: 42rpx;
	}
	.list-head-img image{
		
		width: 100%;
		height: 100%;
	}
	.list-head-img text{
		position: absolute;
		right: 8rpx;
		top: 8rpx;
		color: black;
		font-size: 26rpx;
	}
	.list-head-text{
		flex: 1;
		color: #203195;
		font-size: 34rpx;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.list-head-text  image{
		width: 54rpx;
		height: 54rpx;
		border-radius: 50%;
		display: flex;
		margin-right: 14rpx;
	}
	.list-share{
		width: 330rpx;
		height: 74rpx;
		margin: 0 auto;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 37rpx;
		color: white;
		text-align: center;
		line-height: 74rpx;
		font-size: 28rpx;
	}
	.list-share text{
		margin-right: 16rpx;
	}
	.list-music{
		background: rgba(255, 255, 255, 0.8);
		border-radius: 50rpx;
		margin-top: 40rpx;
		overflow: hidden;
	}
	.list-music-head{
		height: 50rpx;
		margin: 30rpx 0 70rpx 22rpx;
	}
	.list-music-head text:nth-child(1){height: 50rpx;font-size: 50rpx;}
	.list-music-head text:nth-child(2){ font-size: 30rpx;margin: 0 10rpx 0 26rpx;}
	.list-music-head text:nth-child(3){font-size: 26rpx; color: #b2b2b2;}
	.list-music-item{
		display: flex;
		margin: 0 32rpx 70rpx 50rpx;
		align-items: center;
		color: #959595;
	}
	.list-music-top{
		width: 58rpx;
		font-size: 30rpx;
		line-height: 30rpx;
	}
	.list-music-song{
		flex: 1;
	}
	.list-music-song view:nth-child(1){font-size: 28rpx;color: black;width: 70vw;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.list-music-song view:nth-child(2){font-size: 20rpx;align-items: center;width: 70vw;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
	.list-music-item text{
		font-size: 70rpx;
		color: #b5b5b5;
	}
</style>
