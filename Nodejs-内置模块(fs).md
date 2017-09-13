[TOC]

# ```Nodejs```中常用的内置模块--```fs```

Node.js内置的```fs```模块就是文件系统模块，负责读写文件。  
和所有其它JavaScript模块不同的是，```fs```模块同时提供了异步和同步的方法


1.异步读文件

按照JavaScript的标准，异步读取一个文本文件的代码如下：

```
'use strict';

var fs = require('fs');

fs.readFile('sample.txt', 'utf-8', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

//请注意，在用VS code调试时，sample.txt文件必须在当前目录下，且文件编码为utf-8。如果不在当前目录下，则要写文件相对根目录(项目的根目录)的路径。
//使用cmd调试时，sample.txt的相对路径就是正常的相对该js文件的路径。

```

2.同步读文件

除了标准的异步读取模式外，fs也提供相应的同步读取函数。同步读取的函数和异步函数相比，多了一个Sync后缀，并且不接收回调函数，函数直接返回结果。

用fs模块同步读取一个文本文件的代码如下：

```
'use strict';

var fs = require('fs');

var data = fs.readFileSync('sample.txt', 'utf-8');
console.log(data);
//可见，原异步调用的回调函数的data被函数直接返回，函数名需要改为readFileSync，其它参数不变。

```

如果同步读取文件发生错误，则需要用try...catch捕获该错误：

```
try {
    var data = fs.readFileSync('sample.txt', 'utf-8');
    console.log(data);
} catch (err) {
    // 出错了
}

```

3.写文件

将数据写入文件是通过fs.writeFile()实现的：

```
'use strict';

var fs = require('fs');

var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('ok.');
    }
});

//writeFile()的参数依次为文件名、数据和回调函数。

```

4.和readFile()类似，writeFile()也有一个同步方法，叫writeFileSync()：

```
'use strict';

var fs = require('fs');

var data = 'Hello, Node.js';
fs.writeFileSync('output.txt', data);

```

5.stat

如果我们要获取文件大小，创建时间等信息，可以使用fs.stat()，它返回一个Stat对象，能告诉我们文件或目录的详细信息：

```
'use strict';

var fs = require('fs');

fs.stat('sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});

```

6.stat()也有一个对应的同步函数statSync()

```
"use strict";

var fs = require("fs");

var data = fs.readFileSync("sample.txt","utf-8");

console.log(data);

```

7.异步还是同步

在fs模块中，提供同步方法是为了方便使用。那我们到底是应该用异步方法还是同步方法呢？  

由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，  
否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。


8.路径问题

[参考自](https://chuanke.baidu.com/v7652624-216746-1382489.html)

```
var fs = require("fs");

//文件操作中，路径如果是以 / 开头的，则直接去当前脚本文件所处磁盘的根目录去找

fs.readFile("/output2.txt",function(err,data){
	if(err){
		throw err;
	}
	console.log(data)
})

```

	参考自廖雪峰的官方网站