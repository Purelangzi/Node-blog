// 引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');
module.exports = (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 设置文件上传路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 保留上传文件的后缀
    form.keepExtensions = true;
    // 解析表单
    // error错误对象，解析失败存储错误信息，成功返回null
    // fields报错普通表单数据，对象类型
    //files保存和上传文件相关的数据，对象类型
    form.parse(req, async (err, fields, files) => {
        // 文章插入数据库
        // res.send(files.cover.path.split('public')[1]);//截取文件路径
        Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        //插入成功重定向到用户列表页面
        res.redirect('/admin/article');
    });
}