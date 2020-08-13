// 额外的一些功能

import { DataStore } from "./base/DataStore"

export class Extra{
	constructor(){
	}

	// 背景音乐
	bgm(){
		// 创建播放器
		const ctx = wx.createInnerAudioContext()
		ctx.autoplay = true
		ctx.loop=true
		ctx.volume=0.3
		ctx.src = './audio/bgm.mp3'
		/* ctx.onPlay(() => {
		console.log('开始播放')
		})
		ctx.onError((res) => {
		console.log(res)
		}) */
	}

	// 爆炸音乐
	boom(){
		const ctx = wx.createInnerAudioContext()
		ctx.autoplay = true
		ctx.src = './audio/boom.mp3'
	}

	// 小鸟穿过水管的声音
	through(){
		const ctx = wx.createInnerAudioContext()
		ctx.autoplay = true
		ctx.src = './audio/bullet.mp3'
	}

	/* 获取用户信息按钮  授权按钮*/
	userButton(){
		let button = wx.createUserInfoButton({
			type: 'text',
			text: '获取用户信息',
			style: {
				//屏幕宽度一半减去按钮的宽度一半
				left: DataStore.getInstance().canvas.width/2-100,
				top: 76,
				width: 200,
				height: 40,
				lineHeight: 40,
				backgroundColor: '#ff0000',
				color: '#ffffff',
				textAlign: 'center',
				fontSize: 16,
				borderRadius: 4
			}
		})
		button.onTap((res) => {
			// console.log(res)
			if(res.userInfo){
				// 授权
				button.destroy()
			}else{
				// 没授权
			}
		})
	}

	// 获取用户信息(微信信息)
	getUser(callback){
		// 该方法需要先授权才能使用
		wx.getUserInfo({
		  success(res){
			callback(null,res);
		  },
		  fail(err){
			callback(err,null);
		  }
		})
	}

	// 获取手机系统信息
	getTelInfo(){
		wx.getSystemInfo({
		  success:result=> {
			  console.log(result);
		  }
		})
	}	

	// 下载文件
	download(){
		wx.downloadFile({
		  url: 'http://m10.music.126.net/20200811153824/4291ced9b1b60f1e12b7cc0f2eafdefd/ymusic/3dd2/3efd/8621/aaf0881569565f9fd2946ad9551ab491.mp3',
		  success:res=>{
			//   let ctx=wx.createInnerAudioContext()
			//   ctx.src=res.tempFilePath;
			//   ctx.play();
			console.log(res);
			wx.saveImageToPhotosAlbum({
			  filePath: res.tempFilePath,
			  success:res=>{
				  console.log(res);
			  }
			})
		  },
		  fail:err=>{
			  console.log(err);
		  }
		})
	}

	/* 上传文件 */
	upload(){
		wx.chooseImage({
			success(res){
				wx.uploadFile({
					url: 'http://localhost:4000/upload',
					filePath: res.tempFilePaths[0],
					name: 'music',
					success(res){
						console.log(res);
					},
					fail(err){
						console.log(err);
					}
				})
			}
		})
	}

	/* 发送http请求 */
	send(){
		wx.request({
			url: 'http://www.baidu.com',
			success(res){
				console.log(res.data);
			}
		})
	}

	/* socket连接 */
	socket(){
		// 连接socket服务器
		wx.connectSocket({
			url:'ws://localhost:4000',
			success(res){
				console.log('连接成功');
			},
			fail(err){
				console.log('err');
			}
		})
		// 连接成功后
		wx.onSocketOpen(function(){
			wx.sendSocketMessage({
				data: '微信小游戏发送的数据',
				success(res){
					console.log('成功')
				},
				fail(err){
					console.log('失败')
				}
			})
			wx.onSocketMessage(data => {
				console.log(data);
			})
		})
	}
}

