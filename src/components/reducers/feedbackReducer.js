import types from "../actions";

const initialState = {
  posts: [],
  comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.POST_SELECT: {
      return {
        ...state,
        posts: action.data,
      };
    }
    case types.COMMENT_SELECT: {
      return {
        ...state,
        comments: action.data,
      };
    }
    case types.COMMENT_UPDATE: {
      let commentsData = state.comments;
      commentsData[action.id].comments.push(action.data);
      return {
        ...state,
        comments: commentsData,
      };
    }
  }

  return state;
};
