// 将文章集合的构造函数导入
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    
    // 接收客户端传递过来的页码
    const page = req.query.page;
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    // 查询所有文章数据
    let articles = await Article.paginate({}, {
        page: page, // 当前页
        populate: 'author', // 关联
        limit: 2 // 每页显示的数据条数
    });
    // 渲染文章列表页面模板
    res.render('admin/article', { articles });
}