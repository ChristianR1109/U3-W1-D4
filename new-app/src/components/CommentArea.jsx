import { Component } from "react";
import CommentsList from "./CommentList";
import AddComment from "./AddComment";

class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    //dopo che il component sarà mostrato, verrà caricata la fetch
    this.fetchComments();
  }

  fetchComments = async () => {
    const url = `https://striveschool-api.herokuapp.com/api/comments/${this.props.asin}`;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODZlMjFjMjUwNDAwMTUxYWI2NzgiLCJpYXQiOjE3NDczMDg1MDcsImV4cCI6MTc0ODUxODEwN30.DgB8KZdY0G081Z6nCikY8PpGzfBtxoBLCf6v8tBTk8A";

    try {
      this.setState({ isLoading: true, error: null });
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore durante il recupero dei commenti");
      }

      const data = await response.json(); //risposta della fetch
      this.setState({ comments: data, isLoading: false });
    } catch (err) {
      this.setState({ error: err.message, isLoading: false });
    }
  };

  render() {
    const { comments, isLoading, error } = this.state;

    return (
      <div onClick={(e) => e.stopPropagation()} style={{ marginTop: "1rem", color: "black" }}>
        <h5>Commenti:</h5>
        {isLoading && <p>Caricamento in corso...</p>}
        {error && <p style={{ color: "red" }}>Errore: {error}</p>}
        <CommentsList comments={comments} />
        <AddComment asin={this.props.asin} onCommentAdded={this.fetchComments} />
      </div>
    );
  }
}

export default CommentArea;
