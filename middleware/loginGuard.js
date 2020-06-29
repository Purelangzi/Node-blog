const guard = (req, res, next) => {
    // 判断用户访问的是否是登录页面
    // 判断用户的登录状态
    // 已登录，将请求放行
    // 未登录，重定向到登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 普通用户重定向到博客首页
        if (req.session.role == 'normal') {
            return res.redirect('/home/');
        }
        // 用户登录状态，请求放行
        next();
    }
}

module.exports = guard;