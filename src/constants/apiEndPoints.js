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


export const GET_CONTENT_TYPES = {
  url: 'api/content-types/',
  method: 'get',
};

export const GET_FIELDS = (contentTypeId) => ({
  url: `api/content-types/${contentTypeId}/get-fields`,
  method: 'get'
}
)

export const ADD_FIELD = (contentTypeId) => ({
  url: `api/content-types/${contentTypeId}/add-field`,
  method: 'patch'
}
)

export const EDIT_FIELD = (contentTypeId) => ({
  url: `api/content-types/${contentTypeId}/edit-field`,
  method: 'patch'
}
)

export const DELETE_FIELD = (contentTypeId) => ({
  url: `api/content-types/${contentTypeId}/delete-field`,
  method: 'patch'
})


export const GET_COLLECTION_BY_ID = (contentTypeId) => ({
  url: `api/content-types/${contentTypeId}/get-collection`,
  method: 'get'
}
)

export const ADD_ENTRY = {
  url: 'api/collections/new-entry',
  method: 'post'
}

export const GET_ENTRY = {
  url: 'api/collections/get-entry',
  method: 'post'
}

export const UPDATE_ENTRY = {
  url: 'api/collections/update-entry',
  method: 'post'
}

export const DELETE_ENTRY = {
  url: 'api/collections/delete-entry',
  method: 'delete'
}


export const ADD_NEW_TYPE = {
  url: 'api/content-types/new-type',
  method: 'post',
};



// export const GET_BLOG_DATA = {
//   url: 'blog-posts',
//   method: 'get',
// };

// export const UPDATE_BLOG_DATA = (blogId) => ({
//   url: `blog-posts/${blogId}`,
//   method: 'put',
// });