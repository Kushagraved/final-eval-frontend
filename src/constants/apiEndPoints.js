export const BACKEND_URL = 'http://localhost:5000/';

export const LOGIN = {
  url: 'api/users/login',
  method: 'post',
};

export const REGISTER = {
  url: 'api/users/register',
  method: 'post',
};

export const GET_USER = {
  url: 'api/users/user-info',
  method: 'get',
};


// export const GET_BLOG_DATA = {
//   url: 'blog-posts',
//   method: 'get',
// };

// export const UPDATE_BLOG_DATA = (blogId) => ({
//   url: `blog-posts/${blogId}`,
//   method: 'put',
// });