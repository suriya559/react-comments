import { combineReducers } from "redux";
import FeedbackReducer from "../reducers/feedbackReducer.js";

const rootReducer = combineReducers({
  feedback: FeedbackReducer,
});

export default rootReducer;
