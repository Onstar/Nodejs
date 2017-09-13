[TOC]

# ```Nodejs```中常用的内置模块--```http```

## http 基本服务

[参考自](https://chuanke.baidu.com/v7652624-216746-1381999.html)

```
//导入 http 模块
var http = require("http");

// 1.通过http.createServer()创建一个服务，得到一个Server实例对象
//    对于服务器端来说，无非就是做三件事：
// 		1.接收请求
//		2.处理请求
//		3.发送响应
var server = http.createServer();

//设置请求处理函数
//请求回调处理函数需要接受两个参数
//	Request
//		Request 是一个请求对象，可以拿到当前请求的一些信息，例如请求路径，请求方法，请求报文
//	Response
// 		Response 是一个相应对象，可以用来给请求发送响应
var handerRequest = function(request,response){
	console.log("当前请求路径是:"+request.url);	//request.url:得到的是端口号后面的地址
	response.write("hello");	//响应数据
	response.write("world");
	//在发送数据完毕后，主动结束响应
	response.end();
}

//2.通过给 server 实例对象添加 request 请求事件
//	这个请求事件是所有请求的入口
//	任何请求都会触发该事件，然后执行对应的处理函数
// 
server.on("request",handerRequest)

//3.绑定端口号，开启服务器
//	第一个参数用来指定绑定的端口号
//	第二个参数是可选的
//	第三个参数用来指定开启成功之后的回调处理函数
server.listen(8080,function(){
	console.log("Server is running")
})

```

## 根据不同请求路径，处理不同响应

[参考自](https://chuanke.baidu.com/v7652624-216746-1382001.html)

```
var http = require("http");

var server = http.createServer();

server.on("request",function(req,res){
//	res.end("Hello World!");	//在结束的同时发送响应，即，把 res.write()和res.end()合并为一步了。

	//1.通过 req.url 拿到当前请求路径(端口号后面的就是路径。当端口号后面什么都没有时，则为"/")
	var url = req.url;
	
	//2.根据不通的请求路径，处理不同的响应
	if(url==="/"){
		//res.writeHead(响应状态码，响应头对象);
		res.writeHead("200",{
			"Content-Type":"text/html"
		})
		res.end("<h1>index page</h1>");
	}else if(url==="/login"){
		res.writeHead("200",{
			"Content-Type":"text/html"
		})
		res.end("<h2>login page</h2>");	
	}else if(url==="/register"){
		res.writeHead("200",{
			"Content-Type":"text/html"
		})
		res.end("<h1>register page</h1>");
	}else{
		res.end("404 Not Found")
	}
})

server.listen(3000,function(){
	console.log("running...")
})

```

## 根据不同请求路径，响应文件

[参考自](https://chuanke.baidu.com/v7652624-216746-1382487.html)

```
var http = require("http");
var fs = require("fs");

var server = http.createServer();

server.on("request",function(req,res){
//	res.end("Hello World!");	//在结束的同时发送响应，即，把 res.write()和res.end()合并为一步了。

	//1.通过 req.url 拿到当前请求路径(端口号后面的就是路径。当端口号后面什么都没有时，则为"/")
	var url = req.url;
	
	//2.根据不通的请求路径，处理不同的响应
	if(url==="/"){
		//res.writeHead(响应状态码，响应头对象);
		res.writeHead("200",{
			"Content-Type":"text/html"
		});
		fs.readFile("./data/index.html","utf-8",function(err,data){
			if(err){
				throw err;
			}
			res.end(data)
		})
	}else if(url==="/login"){
		res.writeHead("200",{
			"Content-Type":"text/html"
		});
		fs.readFile("./data/login.html","utf-8",function(err,data){
			if(err){
				throw err;
			}
			res.end(data)
		})
	}else if(url==="/register"){
		res.writeHead("200",{
			"Content-Type":"text/html"
		});
		fs.readFile("./data/register.html","utf-8",function(err,data){
			if(err){
				throw err;
			}
			res.end(data)
		})
	}else if(url==="/css/main.css"){//响应css文件
		<!--
		当浏览器接收到当前的 HTML 文件内容时，会从上到下依次解析
		在解析的过程中如果发现：
			具有 href 的 link
			具有 src 的 script
			具有 src 的 img
		等具有外链的要在内部使用的资源。
		这个时候浏览器会对该资源指向的链接自动发起请求。
	-->
		res.writeHead("200",{
			"Content-Type":"text/css"
		});
		fs.readFile("./data/css/main.css","utf-8",function(err,data){
			if(err){
				throw err;
			}
			res.end(data)
		})
	}else if(url==="/img/img01"){//响应图片文件
		res.writeHead("200",{
			"Content-Type":"image/jpeg"
		});
		// utf-8 是字符编码，读取歌曲、图片、视频等文件的时候，不要指定编码，
		// 如果是富文本，就不用指定编码，直接发送二进制数据就可以
		fs.readFile("./data/img/img01.jpg",function(err,data){
			if(err){
				throw err;
			}
			res.end(data)
		})
	}
	else{
		fs.readFile("./data/404.html","utf-8",function(err,data){
			if(err){
				throw err;
			}
			res.end(data)
		})
	}
})

server.listen(3000,function(){
	console.log("running...")
})


```

## 处理静态资源

[参考自](https://chuanke.baidu.com/v7652624-216746-1382489.html)

```
var http = require("http");
var fs = require("fs")

var server = http.createServer();

/*
	所有的请求入口都在服务器实例对象 request 请求事件中
	客户端想要访问的服务端资源，都是通过 url 标识来控制的
	也就是说，哪些资源可以被客户端请求访问，哪些资源不能被访问
	以及资源的 url 标识都是经过服务端处理以及设计过的
	不是说想访问什么就访问什么，至于访问什么以及路径是什么由后台人员说了算
 */

server.on("request",function(req,res){
	var url = req.url;
	if(url=="/"){
		fs.readFile("./views/index.html",function(err,data){
			if(err){
				throw err;
			}
			// 对于发送的响应数据
			// 只能是二进制数据或字符串
			// 如果是字符串则会被转为二进制再发送
			//	  如果读出来的文本文件内容想要进一步处理，那就先要根据编码转成普通字符串再使用处理
			//	 如果读出的文本文件内容不处理，则可以直接通过 res.end 发送
			// 如果是二进制，则直接发送
			res.writeHead(200,{
				"Content-Type":"text/html"
			})
			res.end(data)
		})
	}else if(url.startsWith("/static")){//startsWith(): ES6 中的方法，用来判断该字符串是否以xx开头
//		console.log(url)
		var staticFilePath = "."+url;
		fs.readFile(staticFilePath,function(err,data){
			if(err){
				throw err;
			}
			res.end(data)
		})
	}
})

server.listen(3000,function(){
	console.log("Server is running");
	console.log(" Plaease visit http://")
})

//文件目录结构(项目目录是 hacker-news)

+hacker-news
 +static
  +css
   -news.css
  +img
   -s.gif
   -y18.gif
  +js
 +views
  -index.html
 -app.js

```

