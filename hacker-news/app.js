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
//				throw err;
				res.writeHead(404);
				return res.end();
			}
			res.end(data)
		})
	}else if(url === "/submit"){
		fs.readFile("./views/submit.html",function(err,data){
			if(err){
				throw err;
			}
			res.writeHead(200,{
				"Content-Type":"text/html"
			})
			res.end(data)
		})
	}else{
		res.writeHead(404);
		res.end("404 Not Found");
	}
})

server.listen(3000,function(){
	console.log("Server is running");
	console.log(" Plaease visit http://")
})
