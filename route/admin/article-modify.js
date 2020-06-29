const { Article } = require('../../model/article');
const path = require('path');
const formidable = require('formidable');
module.exports = (req, res) => {

    // 获取get地址栏中的id参数no
    const { id } = req.query;
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
        // 文章更新到数据库
        let a = await Article.updateOne({ _id: id },{
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        //更新成功重定向到用户列表页面
        res.redirect('/admin/article');
    });
}