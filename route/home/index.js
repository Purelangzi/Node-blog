const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    // 标识 标识当前访问的是首页页面
    req.app.locals.currentLink = 'home';
    // 接收客户端传递过来的页码
    const page = req.query.page;

    // 从数据库中查询所有文章数据
    let result = await Article.paginate({}, {
        page: page, // 当前页
        populate: 'author', // 关联
        limit: 4 // 每页显示的数据条数
    });
    // 渲染模板并传递数据
    res.render('home/default', {
        result: result
    });
}