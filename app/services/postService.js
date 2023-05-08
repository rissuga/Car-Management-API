const postRepository = require("../repositories/postRepository");
const userRepository = require("../repositories/userRepository");

module.exports = {
  create(request) {
    const {title,body} = request.body;
    const {id} = request.user;

    return postRepository.create({title,body,createdBy: id} );
  },

  async update(idPost, request) {
    const {title,body} = request.body;
    const {id} = request.user;

    return postRepository.update(idPost,{title,body,updatedBy: id});
    
  },

  delete(id) {
    return postRepository.delete(id);
  },

  async list() {
    try {
      const posts = await postRepository.findAll();
      const postCount = await postRepository.getTotalPost();

      return {
        data: posts,
        count: postCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return postRepository.find(id);
  },
};
