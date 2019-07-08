
var express = require('express')
var app = express()
app.use(express.static(__dirname + '/static'));
const fs = require('fs')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// POST method route
let i = 0;
app.post('/uplodimg', function (req, res) {
    // 解决跨域的问题
    // res.header('Access-Control-Allow-Origin', '*');
    // //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Allow-Methods', '*');
    // res.header('Content-Type', 'application/json;charset=utf-8');

    // 去除格式  data:image/png;base64,
    var base64Data = req.body.imgData.replace(/^data:image\/\w+;base64,/, "");
   // var dataBuffer = new Buffer(base64Data, 'base64'); // 解码图片
    // var dataBuffer = Buffer.allocUnsafe(base64Data)
    var dataBuffer = Buffer.from(base64Data, 'base64'); // 这是另一种写法
   

    var time = +new Date()+i;
    fs.writeFile(`./static/img/${time}.png`, dataBuffer, function(err) {
        i++
        if(err){
            res.send(err);
            console.log(err)
        }else{
        
            res.json({
                code:200,
                img:`http://127.0.0.1/img/${time}.png`
            })
        }
    });

})

app.listen('80',function (err,doc) {
    console.log('start ok')
})