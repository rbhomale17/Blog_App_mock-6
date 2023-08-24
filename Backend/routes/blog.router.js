const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const BlogModel = require('../models/blog.model');
const blogsFiltering = require('../middlewares/blogs.filtering');
const addNewBlog = require('../middlewares/addNewBlog');
const blogRouter = express.Router();

blogRouter.use(authMiddleware)

blogRouter.get('/blogs', blogsFiltering, async (req, res) => {
    const { userData, blogs } = req.body;
    try {
        res.send({ msg: 'Data fetch success', blogs })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
});

blogRouter.post('/blogs', addNewBlog, (req, res) => {
    try {
        res.status(201).send({ msg: 'New Blog is Created.' })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
});

blogRouter.patch('/blogs/:id', async (req, res) => {
    const { userData } = req.body;
    try {
        let id = req.params.id;
        let blog = await BlogModel.findById(id);
        // console.log(blog, userData);
        if (blog.username != userData.username) return res.send({ msg: `You Can't update Blog of Differenr person.` })

        await BlogModel.findByIdAndUpdate(id, req.body);
        res.send({ msg: `Blog Updated Succefully, Blog ID: ${id}` })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
});

blogRouter.delete('/blogs/:id', async (req, res) => {
    const { userData } = req.body;
    try {
        let id = req.params.id;
        let blog = await BlogModel.findById(id);
        if (!blog) return res.send({ msg: `Blog Not Found!` })

        await BlogModel.findByIdAndDelete(id);
        res.send({ msg: `Blog Deleted Succefully, Blog ID: ${id}` })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
})

blogRouter.patch('/blogs/:id/like', async (req, res) => {
    const { userData } = req.body;
    try {
        let id = req.params.id;
        let blog = await BlogModel.findById(id);
        // console.log(blog, userData);
        if (!blog) return res.send({ msg: `Blog Not Found!` })
        blog.likes++;
        await BlogModel.findByIdAndUpdate(id, blog);
        res.status(204).send({ msg: `Likes Updated` })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
});

blogRouter.patch('/blogs/:id/comment', async (req, res) => {
    const { userData, comment } = req.body;
    try {
        let id = req.params.id;
        let blog = await BlogModel.findById(id);
        // console.log(blog, userData);
        if (!blog) return res.send({ msg: `Blog Not Found!` })

        blog.comments.push(comment);
        await BlogModel.findByIdAndUpdate(id, blog);
        res.send({ msg: `Blog Updated Succefully, Blog ID: ${id}` })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
});


module.exports = blogRouter;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJfaWQiOiI2NGU3NDM2YTIyNjJmZTQwNTZhYjNkNDEiLCJ1c2VybmFtZSI6InJiaG9tYWxlIiwiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzEyMTA5MjQ0NT92PTQiLCJlbWFpbCI6InJiaG9tYWxlQGdtYWlsLmNvbSIsInBhc3N3b3JkIjpudWxsfSwiaWF0IjoxNjkyODc3NjkwLCJleHAiOjE2OTI5MDI4OTB9.zA712IdmtIYe5prMu2V6q15VTd8tOhg0hgLag75Adf4