const { User } = require('../../model/user');

module.exports = async (req, res) => {
    // res.send(req.query.id);
    // 获取要删除的用户id
    await User.findByIdAndDelete(req.query.id);
    // 删除成功重定向会用户列表页面
    res.redirect('/admin/user');
}