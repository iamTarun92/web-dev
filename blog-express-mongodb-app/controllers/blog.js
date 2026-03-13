const Blog = require('../models/blog')
const Comment = require('../models/comment')

async function getAllBlogs(req, res) {
  const allBlogs = await Blog.find({})
  res.render('home', {
    user: req.user,
    blogs: allBlogs,
  })
}

async function getBlogById(req, res) {
  const blog = await Blog.findById(req.params.id).populate('createdBy')
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    'createdBy',
  )

  return res.render('blog', {
    user: req.user,
    blog,
    comments,
  })
}

async function addNewComment(req, res) {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  })
  return res.redirect(`/blog/${req.params.blogId}`)
}

async function addNewBlog(req, res) {
  try {
    const { title, body } = req.body

    const blogData = {
      title,
      body,
      createdBy: req.user._id,
    }

    // Only add coverImageURL if file uploaded
    if (req.file) {
      blogData.coverImageURL = `/uploads/${req.file.filename}`
    }

    const blog = await Blog.create(blogData)

    return res.redirect(`/blog/${blog._id}`)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error creating blog')
  }
}

module.exports = {
  getAllBlogs,
  getBlogById,
  addNewComment,
  addNewBlog,
}
