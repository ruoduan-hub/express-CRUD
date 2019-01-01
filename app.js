//加载express 框架
var express = require('express')
//加载router 模块
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()
//开放文件夹
app.use('/node_modules/',express.static('./node_modules'))
app.use('/public/',express.static('./public'))

app.engine('html',require('express-art-template'))

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//把 router 容器挂在的 app 服务中
app.use(router)

// 启动 
app.listen(3000,function(){
  console.log('running 30000 port')
})

module.exports = app
