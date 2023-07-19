import axios from "axios";

const ncnewsApi = axios.create({
  baseURL: "https://be-nc-news-whiy.onrender.com/api",
});

export const getArticles = (topic, currentParams) => {
  return ncnewsApi.get("/articles", { params: { topic, sort_by: currentParams.sort_by, order: currentParams.order } }).then(({ data }) => {
    return data.articles;
  });
};

export const getArticle = (article_id) => {
  return ncnewsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getComments = (article_id) => {
  return ncnewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const patchArticle = (article_id, voteCount) => {
  const patchRequestBody = {
    inc_votes: voteCount,
  };
  return ncnewsApi
    .patch(`/articles/${article_id}`, patchRequestBody)
    .then(({ data }) => {
      return data.article;
    });
};

export const postComment = (article_id, newComment) => {
  const postRequestBody = {
    body: newComment.body,
    username: newComment.author,
  };
  return ncnewsApi
    .post(`/articles/${article_id}/comments`, postRequestBody)
    .then(({ data }) => {
      return data.comment;
    });
};
