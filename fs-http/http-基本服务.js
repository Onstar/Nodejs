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
