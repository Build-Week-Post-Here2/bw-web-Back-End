const router = require("express").Router();

const Posts = require("./posts-model");

//for endpoints beginning with /api/posts

router.get("/", (req, res) => {
  //return all posts
  Posts.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Cannot get posts at this time" });
    });
});

router.get("/user/:id", (req, res) => {
  //returns all posts for the user by their id
  const { id } = req.params;

  Posts.findPostByUserId(id)
    .then((post) => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({ error: "that user does not have any posts" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "cannot find posts by that user at this time" });
    });
});

router.get("/:id", (req, res) => {
  //returns posts by post id
  const { id } = req.params;

  Posts.findById(id)
    .then((post) => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({ error: "cannot find post with that id" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "cannot get post at this time" });
    });
});

router.post("/user/:id", (req, res) => {
  //adds a new post to the users post list by user id
  const newPost = req.body;
  const { id } = req.params;

  Posts.add(newPost, id)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({ error: "cannot add post at this time" });
    });
});

router.put("/:id", (req, res) => {
  //edits a post by post id
  const { id } = req.params;
  const changes = req.body;

  Posts.findById(id)
    .then((post) => {
      post
        ? Posts.update(changes, id).then((postchanged) => {
            res.status(200).json(changes);
          })
        : res.status(404).json({ error: "no post with that id" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "cannot edit post at this time" });
    });
});

router.delete("/:id", (req, res) => {
  //deletes a post by id
  const { id } = req.params;
  Posts.remove(id)
    .then((deleted) => {
      deleted
        ? res.status(200).json({
            message: `Post with id: ${id}! has been sucesfully deleted`,
            deleted,
          })
        : res.status(404).json({ error: "cannot find post with id" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "cannot delete post" });
    });
});

module.exports = router;
