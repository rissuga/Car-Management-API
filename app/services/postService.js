const postRepository = require("../repositories/postRepository");

module.exports = {
  create(request) {
    const {title,body} = request.body;
    const {id} = request.user;

    return postRepository.create({title,body,createdBy: id} );
  },

  update(id, requestBody) {
    return postRepository.update(id, requestBody);
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
