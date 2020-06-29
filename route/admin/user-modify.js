const { User, validateUser } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {
    // 接收客户端传递过来的请求参数
    const { username, email, role, state, password } = req.body;
    // 将要修改的用户id
    const id = req.query.id;

    // 验证管理员修改的信息
    try {
        await validateUser({ username, email, role, state, password })
    } catch (error) {
        // 验证没通过
        // 重定向回用户添加页面
        // return res.redirect(`/admin/user-edit?message=${error.message}`);
        // 将象转换成字符串类型JSON.stringfiy()
        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message, id: id }))
    }
    // 根据邮箱地址查询用户是否存在
    let userEmail = await User.findOne({ email: email });
    if (userEmail) {
        // 重定向回用户添加页面
        // return res.redirect(`/admin/user-edit?message=大人~邮箱地址已经被占用`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '大人~邮箱地址已经被占用,请换一个吧', id: id }))
    }
    // 验证通过

    //根据id从数据库中查找用户信息
    const user = await User.findOne({ _id: id });

    // 密码对比
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        // 将用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        // 重定向到用户列表页面
        res.redirect('/admin/user');
    } else {
        let obj = {
            path: '/admin/user-edit',
            message: '大人~密码比对失败，不能进行用户信息的修改',
            id: id
        }
        next(JSON.stringify(obj));
    }
}