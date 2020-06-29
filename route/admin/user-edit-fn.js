
// 引入用户集合的构造函数
const { User, validateUser } = require('../../model/user');
// 引入加密模块
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {

    try {
        await validateUser(req.body)
    } catch (error) {
        // 验证没通过
        // 重定向回用户添加页面
        // return res.redirect(`/admin/user-edit?message=${error.message}`);
        // 将象转换成字符串类型JSON.stringfiy()
        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }))
    }

    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        // 重定向回用户添加页面
        // return res.redirect(`/admin/user-edit?message=大人~邮箱地址已经被占用`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '大人~邮箱地址已经被占用,请换一个吧' }))
    }
    // 对密码进行加密处理
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    req.body.password = password;
    // 将用户信息添加到数据库中
    await User.create(req.body);
    // 将页面重定向到用户列表页面
    res.redirect('/admin/user');
}