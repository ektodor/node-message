const postSchema = {
  postsResponse: {
    status: true,
    message: "成功",
    data: {
      _id: "663380c37b78a8155532ce5a",
      title: "測試文章001",
      author: {
        _id: "6633808e7b78a8155532ce58",
        nickname: "小美",
        image: "",
      },
      tags: [],
      content: "測試內容",
      likes: 5,
      comments: [],
      images: [],
      createdAt: "2024-05-02T12:02:11.677Z",
      updatedAt: "2024-05-02T12:02:11.677Z",
    },
  },

  createPosts: {
    $title: "測試文章001",
    $content: "測試內容",
    images: [],
  },
  createComments: {
    $comment: "這裡是留言",
  },
  updatePosts: {
    title: "測試文章001",
    author: "6633808e7b78a8155532ce58",
    tags: [],
    content: "測試內容",
    likes: 5,
    comments: [],
    images: [],
  },
};

module.exports = postSchema;
