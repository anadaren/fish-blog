const express = require('express');
const blogController = require('../controllers/blogController.js')

const router = express.Router();

// display all blogs, in reverse order
router.get('/', blogController.blog_index);

// logs submitted form into database
// post request
router.post('/', blogController.blog_create_post);

// renders the create a new blog page
// needs to be above the /:id commant
// get request
router.get('/create', blogController.blog_create_get);

// blog details
router.get('/:id', blogController.blog_details);

// delete a blog
router.delete('/:id', blogController.blog_delete);


// export router back to app.js
module.exports = router;