import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import axios from "axios";
import actionTypes from "../actions";
import ThumbUpSharpIcon from "@material-ui/icons/ThumbUpSharp";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import Comment from "./comments/index";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
      open: false,
    };
    this.myRef = React.createRef();
  }
  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      this.props.setPosts(res.data.slice(0, 5));
    });
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        let k = [];
        res.data.slice(0, 5).map((a) => {
          let y = {};
          y.id = a.id;
          y.comments = [a.body];
          k.push(y);
        });
        this.props.setComments(k);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  incrementHandler(i) {
    let x = this.props.posts;
    if (x[i].likes) {
      x[i].likes = x[i].likes + 1;
    } else {
      x[i].likes = 1;
    }
    document.getElementById(`likes${i}`).innerHTML = x[i].likes;
    this.props.setPosts(x);
  }

  decrementHandler(i) {
    let x = this.props.posts;
    if (x[i].disLikes) {
      x[i].disLikes = x[i].disLikes + 1;
    } else {
      x[i].disLikes = 1;
    }
    document.getElementById(`disLikes${i}`).innerHTML = x[i].disLikes;
    this.props.setPosts(x);
  }

  handleClick(i) {
    this.setState({ selectedIndex: i, open: !this.state.open });
  }

  render() {
    let posts = [];
    posts = this.props.posts.map((a, i) => {
      return (
        <div>
          <Container maxWidth="sm">
            <div style={{ border: "4px solid black" }}>
              <h5>Title : {a.title} </h5>
              <h6>Body : {a.body}</h6>
            </div>
            <Grid container>
              <Grid item xs={3}>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => this.incrementHandler(i)}
                  style={{ paddingLeft: "10px" }}
                >
                  <ThumbUpSharpIcon color="primary"></ThumbUpSharpIcon>
                </IconButton>
                <span
                  style={{ marginLeft: "10px" }}
                  ref={this.myRef}
                  id={`likes${i}`}
                ></span>
                {/* </Grid>
              <Grid item xs={2}> */}
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => this.decrementHandler(i)}
                >
                  <ThumbDownAltIcon color="secondary" />
                </IconButton>
                <span
                  style={{ marginLeft: "10px" }}
                  ref={this.myRef}
                  id={`disLikes${i}`}
                ></span>
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={2}>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => this.handleClick(i)}
                >
                  <CommentIcon color="primary" />
                </IconButton>
              </Grid>
              {this.state.open && this.state.selectedIndex === i && (
                <Comment comments={this.props.comments[i].comments} id={i} />
              )}
            </Grid>
          </Container>
        </div>
      );
    });
    return (
      <div>
        <Container maxWidth="sm">{posts}</Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.feedback.posts,
    comments: state.feedback.comments,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setPosts: (data) => dispatch({ type: actionTypes.POST_SELECT, data }),
    setComments: (data) => dispatch({ type: actionTypes.COMMENT_SELECT, data }),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
