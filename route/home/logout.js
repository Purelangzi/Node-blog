module.exports = (req, res) => {
    // 删除session
    req.session.destroy(function () {
        // 删除cookie
        res.clearCookie('connect.sid');
        // 重定向到首页面
        res.redirect('/home/');
        // 清楚模板中的用户信息
        req.app.locals.userInfo = null;
    });
}