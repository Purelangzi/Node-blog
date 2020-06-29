const { Article } = require('../../model/article');
module.exports = async (req, res) => {

    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    // 获取到地址栏中的id参数
    const { id } = req.query;

    if (id) {
        // 修改
        let article = await Article.findOne({ _id: id });

        // 渲染文章修改页面
        res.render('admin/article-edit', {
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });
    } else {
        // 渲染用户添加页面
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '添加'
        });
    }


}