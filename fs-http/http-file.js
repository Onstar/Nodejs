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
	}else if(url==="/css/main.css"){
		res.writeHead("200",{
			"Content-Type":"text/css"
		});
		fs.readFile("./data/css/main.css","utf-8",function(err,data){
			if(err){
				throw err;
			}
			res.end(data)
		})
	}else if(url==="/img/img01"){
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
