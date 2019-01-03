# express-CRUD
- 一个基于express 实现 列表数据crud
- 模块化异步封装API实现文件储存数据持久化
### router-table

| 请求方法 |     请求路径     | get 参数 |           post 参数            |       备注       |
|----------|------------------|----------|--------------------------------|------------------|
| GET      | /studens         |          |                                | 渲染首页         |
| GET      | /students/new    |          |                                | 渲染添加页面 |
| POST     | /studens/new     |          | name、age、gender、hobbies     | 处理添加请求 |
| GET      | /students/edit   | id       |                                | 渲染编辑页面     |
| POST     | /studens/edit    |          | id、name、age、gender、hobbies | 处理编辑请求     |
| GET      | /students/delete | id       |                                | 处理删除请求     |
|          |                  |          |                                |                  |

### Catalog
- data-file
  + db.json
- into-file
  + app.js
- router-file
  + router.js
- IO  API
  + student.js



- demo start：

  + demo所在文件夹 ：node app.js
  + address：http://127.0.0.1:3000

  
