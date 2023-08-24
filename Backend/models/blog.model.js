const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true, enum: ['Business', 'Tech', 'Lifestyle', 'Entertainment'] },
    date: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [],
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }

}, { versionKey: false });

const BlogModel = mongoose.model('blog', BlogSchema);

module.exports = BlogModel;