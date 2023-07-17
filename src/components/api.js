import axios from "axios";

const ncnewsApi = axios.create({
  baseURL: "https://be-nc-news-whiy.onrender.com/api",
});

export const getArticles = () => {
  return ncnewsApi.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const getArticle = (article_id) => {
  return ncnewsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};
