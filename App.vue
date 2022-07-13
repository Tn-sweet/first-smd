<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import url('static/iconfont/iconfont.css');
	/*每个页面公共css */
	.container{
		width: 100%;
		height:calc(100vh - 75px);
		overflow:hidden;
	}
	.container scroll-view{
		height: 100%;
	}
	.fixbg{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-image: url(http://mms2.baidu.com/it/u=1268655048,2837553661&fm=253&app=120&f=JPEG&fmt=auto&q=75?w=500&h=543);
		background-size: cover;
		background-position: center 0;
		filter:blur(1px);
		transform: scale(1);
	}
</style>
