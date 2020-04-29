const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findById,
  //   addIngredient,
  //   findIngredients,
  findPostByUserId,
  update,
  remove,
};

function add(post, id) {
  const addedPost = { ...post, user_id: id };
  return db("posts")
    .insert(addedPost, "id")
    .then(() => {
      return addedPost;
    });
}

function find() {
  return db("posts");
}

function findById(id) {
  return db("posts").where({ id }).first();
}

function findPostByUserId(id) {
  return db("posts as p")
    .select("p.id", "p.title", "p.body")
    .where("p.user_id", id)
    .orderBy("p.id");
}

function update(changes, id) {
  return db("posts").where({ id }).update(changes);
}

function remove(id) {
  return db("posts").where({ id }).del();
}
