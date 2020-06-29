// 导入用户集合构造函数
const { User } = require('../../model/user');
// 导入 bcypt 
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    // 接收post请求参数
    const { email, password } = req.body;
    // 如果用户没有输入邮件地址
    if (email.trim().length == 0 || password.trim().length == 0)
        return res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' });
    // 根据邮箱地址查询用户信息
    // 如果查询成功,user变量值为对象，不成功为空
    let user = await User.findOne({ email });
    if (user) {
        // 客户端传递过来的密码和用户信息中的密码进行比对
        // true 比对成功
        // false 比对失败
        let isVaild = await bcrypt.compare(password, user.password);
        if (isVaild) {
            // 登录成功
            // 将用户名存储在请求对象中
            req.session.username = user.username;
            // 将用户角色存储在session对象中
            req.session.role = user.role;
            // res.send('登录成功');
            // 把公共数据暴露到模板中，req对象下有app属性，实际上是app.js里创建的app
            req.app.locals.userInfo = user;
            // 对用户角色进行判断
            if (user.role == 'admin') {
                // 重定向到用户列表页面
                res.redirect('/admin/user');
            } else {
                // 重定向到博客首页
                return res.redirect('/home/');
            }
            // 重定向到用户列表页面
            res.redirect('/admin/user');
        } else {
            res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' });
        }
    } else {
        res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' });
    }
}