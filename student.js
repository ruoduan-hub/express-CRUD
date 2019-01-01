/**
 *   student
 * 数据操作文件模块 
 * 职责：操作文件中的 数据，只操作数据 不关心业务
 */
var fs = require('fs')

var dbPath = './db.json'


 // 获取学生列表
 /**
  * callback 中的参数
  * 第一个参数是 err
  *     成功是 null
  *     错误是错误对象
  * 第二个参数是结果
  *     成功是数组
  *     错误是undefined
  */
exports.find = function (callback) {
    fs.readFile(dbPath,'utf8',function(err,data){
        if (err) {
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
        
    })
}

/**
 * 根据 id 获取学生信息对象
 * @param  {Number}   id       学生 id
 * @param  {Function} callback 回调函数
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
      if (err) {
        return callback(err)
      }
      var students = JSON.parse(data).students
      var ret = students.find(function (item) {
        return item.id === parseInt(id)
      })
      callback(null, ret)
    })
  }


 // 添加保存学生
exports.save = function (student,callback) {
fs.readFile(dbPath,function (err,data){
    if (err) {
        return callback(err)
    }
    try {
    var students = JSON.parse(data).students
    // 添加id 唯一性
    student.id = students[students.length -1].id + 1
    } catch {
        student.id = 0
    }
    //把用戶的 传递的对象保持到数组中
    students.push(student)
    // 把对象数据转换为字符串
    var fileData = JSON.stringify({
    students: students
    })
    //把字符串写入到到文件中
    fs.writeFile(dbPath,fileData,function (err){
        if (err) {
            //错误的话 就把错误对象传递出去
            return callback(err)
        }
        //成功就是没错，所有错误对象为null
        callback(null)
    })
})
}

 //更新学生
exports.updataById = function (student,callback) {
    fs.readFile(dbPath,function (err,data){
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        //把 id 统一转化为 整数型 res.body 过来的都是字符串
        student.id = parseInt(student.id)

        // 要改谁就把谁找出来
         // EcmaScript 6 中的一个数组方法：find
            // 需要接收一个函数作为参数
            // 当某个遍历项符合 item.id === student.id 条件的时候，find 会终止遍历，同时返回遍历项
        var stu = students.find(function (item) {
            return item.id === student.id
        })
        //遍历拷贝对象
         // stu.name = student.name
         // stu.age = student.age   
        for (let key in student) {
            try {
                stu[key] = student[key]
            } catch {
                console.log('id 匹配失败');
            }
        }
         // 把对象数据转换为字符串
    var fileData = JSON.stringify({
        students: students
        })
        //把字符串写入到到文件中
        fs.writeFile(dbPath,fileData,function (err){
            if (err) {
                //错误的话 就把错误对象传递出去
                return callback(err)
            }
            //成功就是没错，所有错误对象为null
            callback(null)
        })
    })
}

 //删除学生
exports.deleteById = function (id,callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        // findIndex 方法专门用来根据条件查找元素的下标
        var deleteid = students.findIndex(function (item) {
            return item.id === parseInt(id)
        })
        // 根据下标 从数组中删除相应的 学生对象
        students.splice(deleteid,1)

        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
        students: students
      })
       // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
        if (err) {
          // 错误就是把错误对象传递给它
          return callback(err)
        }
        // 成功就没错，所以错误对象是 null
        callback(null)
      })
    })
}


