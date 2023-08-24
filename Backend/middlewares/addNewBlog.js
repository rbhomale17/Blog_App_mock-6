const BlogModel = require("../models/blog.model");

module.exports = async function addNewBlog(req, res, next) {
    const { title, content, category, userData } = req.body;
    try {
        if (!title || !content || !category || !userData) return res.send({ msg: 'Please provide All Details.' })

        let date = new Date().toISOString();
        let username = userData.username;
        let userID = userData._id;
        let newBlog = new BlogModel({ title, content, category, date, userID, username });
        await newBlog.save();
        next();
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
}

// username: { type: String, required: true },
// title: { type: String, required: true },
// content: { type: String, required: true },
// category: { type: String, required: true },
// date: { type: String, required: true },
// likes: { type: Number, default: 0 },
// comments: [],
// userID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }