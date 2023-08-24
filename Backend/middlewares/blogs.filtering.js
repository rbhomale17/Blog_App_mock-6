const BlogModel = require("../models/blog.model");

module.exports = async function blogsFiltering(req, res, next) {
    const { title, category, sort, order } = req.query;
    try {
        if (!title && !category && !sort) {
            let blogs = await BlogModel.find().populate('userID');
            req.body.blogs = blogs;
            next();
        }
        else if (!title && !category && sort) {
            let blogs = await BlogModel.find().sort({ 'date': order }).populate('userID');
            req.body.blogs = blogs;
            next();
        }
        else if (!title && category && sort) {
            let blogs = await BlogModel.find({ category }).sort({ 'date': order }).populate('userID');
            req.body.blogs = blogs;
            next();
        }
        else if (title && category && sort) {
            let blogs = await BlogModel.find({
                $and: [{ "title": { $regex: title, $options: 'i' } },
                { category }]
            }
            ).sort({ 'date': order }).populate('userID');
            req.body.blogs = blogs;
            next();
        }
        else if (!title && category && !sort) {
            let blogs = await BlogModel.find({ category }).populate('userID')
            req.body.blogs = blogs;
            next();
        }
        else if (title && category && !sort) {
            let blogs = await BlogModel.find({
                $and: [{ "title": { $regex: title, $options: 'i' } },
                { category }]
            }).populate('userID')
            req.body.blogs = blogs;
            next();
        }
        else if (title && !category && !sort) {
            let blogs = await BlogModel.find({ "title": { $regex: title, $options: 'i' } }).populate('userID')
            req.body.blogs = blogs;
            next();
        }
    } catch (error) {
        res.send({ err: error.message })
    }
}