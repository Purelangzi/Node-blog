const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    // res.send(req.query.id);
    // 获取要删除的用户id
    await Article.findByIdAndDelete(req.query.id);
    // 删除成功重定向回文章列表页面
    res.redirect('/admin/article');
}