const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
module.exports = async (req, res) => {
    // 接收客户端传递过来的文章id
    const id = req.query.id;
    // 根据id查询文章信息
    let article = await Article.findOne({ _id: id }).populate('author');
    // 查询当前文章所对应的评论信息
    let comments = await Comment.find({ aid: id }).populate('uid');
    // 渲染模板
    res.render('home/article', { article, comments });
}