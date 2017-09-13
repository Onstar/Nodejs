var fs = require("fs");

//fs.writeFile(文件路径，要写入的数据，回调处理函数)
//	如果文件不存在，则直接新建
//	如果文件已存在，则直接覆盖
/*fs.writeFile("./output2.txt","您好sss",function(err){
	if(err){
		console.log("写入文件失败");
	}
	console.log("写入成功")
})*/

//fs.readFile(文件路径，[编码],回调函数)
/*fs.readFile("./output2.txt",function(err,data){
	if(err){
//		console.log(err);
		throw err;
	}
	console.log(data.toString())
})*/
fs.readFile("./output2.txt","utf-8",function(err,data){
	if(err){
//		console.log(err);
		throw err;
	}
	console.log(data)
})

