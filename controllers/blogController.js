const Blog = require('../models/blog.js');

// naming conventions
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

// displays blogs in reverse order
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        });
};

// blog details
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details', { blog: result, title: 'Blog Details'});
        })
        .catch((err) => {
            res.status(404).render('404', { title: 'Blog not found' });
        });
};

// get request to render create blog page
const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create New Blog'});
};

// post request to submit blog create form
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
};

// deletes blog
const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            // we have to seen some .json back, because this is running in he browser not the server
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}