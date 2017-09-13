var fs = require("fs");

//文件操作中，路径如果是以 / 开头的，则直接去当前脚本文件所处磁盘的根目录去找

fs.readFile("/output2.txt",function(err,data){
	if(err){
		throw err;
	}
	console.log(data)
})
