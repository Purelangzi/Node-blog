// 引入express框架
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser模块 用来处理Post请求参数
const bodyParser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
// 导入art-template模板引擎
const template = require('art-template');
// 导入dateformat第三方模块
const dateFormat = require('dateformat');
// 导入morgan第三方模块
const morgan = require('morgan');
// 导入config模块
const config = require('config');

// 创建网站服务器
const app = express();
// 数据库连接
require('./model/connect');

// 处理Post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
// 配置session
app.use(session({
    secret: 'secret key',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
}));


// express框架配置模板信息
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;


console.log(config.get('title'));


// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// 全局对象global下的一个属性对象process，获取系统环境变量 返回值是对象

if (process.env.NODE_ENV == 'development') {
    // 开发环境
    console.log('当前是开发环境');
    // 在开发环境中，将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan('dev'));
} else {
    console.log('当前是生产环境');
}


// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

// 拦截请求，判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));


// 为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err, req, res, next) => {
    // 将字符串对象转换成对象类型
    const result = JSON.parse(err);
    // let obj = { path: '/admin/suer-edit', message: '大人~密码比对失败，不能进行用户信息的修改', id: id };
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
});

// 监听端口
app.listen(80);
console.log('网站服务器启动成功,请访问localhost/Home');