/**
 * router.js 路由模块
 * 职责：
 *   处理路由
 *   根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 我们划分模块的目的就是为了增强项目代码的可维护性
 * 提升开发效率
 */

 var fs = require('fs')

 //加载express
 var express = require('express')

 //创建router 容器
 var router = express.Router()

// 获取到的 学生列表
 var Students = require('./student')


// Students.updataById({
//   id:7,
//   name:'巴菲特'
// },function (err) {
//   if (err) {
//     return console.log('修改失败')
//   }
//   return console.log('修改ok')
// })

router.get('/', function (req,res) {
  res.redirect('/student')
})

// index 依赖于bootstrap3
 router.get('/student', function (req, res) {
  Students.find(function (err,students){
    if (err) {
      return res.status(500).end('Server err')
    }  
    res.render('index.html', {
      fruits: [
        '苹果',
        '香蕉',
        '橘子'
      ],
      students:students
    })
  })
})



 router.get('/students/new',function(req,res){
  res.render('new.html')
})



router.post('/students/new',function(req,res){
  // 1. 获取表单数据
  // 2. 处理
  //    将数据保存到 db.json 文件中用以持久化
  // 3. 发送响应
  //console.log(req.body)
  Students.save(req.body,function (err){
    if (err) {
      return res.status(500).end('Server err')
    }
    //重定向
    res.redirect('/student')
  })
  
})



//渲染 编辑学生页
router.get('/students/edit',function(req,res){
  // 1. 在客户端的列表页中处理链接问题（需要有 id 参数）
  // 2. 获取要编辑的学生 id
  // 3. 渲染编辑页面
  //    根据 id 把学生信息查出来
  //    使用模板引擎渲染页面
  //console.log(req.query.id);
  Students.findById(parseInt(req.query.id), function (err,student) {
    if (err) {
      return res.status(500).end('Server err')
    }
    res.render('edit.html', {
      student : student
    })
    
  })
  
})



//处理编辑学生页
router.post('/students/edit',function(req,res){
  //1.获取表单数据 req.body
  //2.更新 updata
  //3.发送响应
  //console.log(req.body);
  Students.updataById(req.body,function (err) {
    if (err) {
      return res.status(500).end('Server err')
    }
    res.redirect('/')
  })
})



//删除列表
router.get('/students/delete',function(req,res){
  // 1.获取要删除的id
  // 2.根据id执行删除操作
  // 3.根据操作结果，发送响应数据
  //console.log(req.query.id);
  Students.deleteById(req.query.id, function (err) {
    if (err) {
      return res.status(500).send('Server error.')
    }
    res.redirect('/student')
  })
  
})


 // 把 route 导出
 module.exports = router
