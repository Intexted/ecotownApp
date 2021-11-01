import Blog from "../models/blog";

// blog
export const addBlog = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).send({
      error: "title is required.",
    });
  }
  if (!description) {
    return res.status(400).send({
      error: "description is required.",
    });
  }

  const blog = new Blog({
    title,
    description,
  });
  try {
    await blog.save();
    return res.json({ ok: true });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("_id", "title description");
    res.json(blogs);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

export const getBlogDetails = async (req, res) => {
  try {
    const blog = await Blog.findById(req.body._id).populate(
      "_id",
      "title description"
    );
    res.json(blog);
  } catch (error) {
    return res.status(400).send({ error });
  }
};
