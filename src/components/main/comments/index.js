import React, { useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import actionTypes from "../../actions";
import { connect } from "react-redux";

function Comments(props) {
  const [mess, updateMess] = useState("");
  const updateHandler = (id, e) => {
    props.setUpdateComments(id, e);
    updateMess("");
  };

  let messages = props.comments.map((d) => {
    return (
      <div
        style={{
          backgroundColor: "lightgray",
          padding: "20px",
          margin: "20px",
        }}
      >
        {d}
      </div>
    );
  });

  return (
    <div>
      {messages}
      <TextareaAutosize
        rowsMax={51}
        style={{ width: "100%" }}
        aria-label="maximum height"
        value={mess}
        onChange={(e) => updateMess(e.target.value)}
      />
      <Button
        color="primary"
        style={{ textAlign: "center" }}
        onClick={() => updateHandler(props.id, mess)}
      >
        Submit
      </Button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    updatedComments: state.feedback.comments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUpdateComments: (id, data) =>
      dispatch({ type: actionTypes.COMMENT_UPDATE, id, data }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
