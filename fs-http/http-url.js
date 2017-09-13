var http = require("http");

var server = http.createServer();

server.on("request",function(req,res){
//	res.end("Hello World!");	//在结束的同时发送响应，即，把 res.write()和res.end()合并为一步了。

	//1.通过 req.url 拿到当前请求路径(端口号后面的就是路径。当端口号后面什么都没有时，则为"/")
	var url = req.url;
	
	//2.根据不同的请求路径，处理不同的响应
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
