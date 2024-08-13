const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// the model having the same name as your collectio means it will look there first
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;