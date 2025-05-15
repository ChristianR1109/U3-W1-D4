import { Component } from "react";

class AddComment extends Component {
  state = {
    comment: "",
    rate: 1,
    isSubmitting: false,
    error: null,
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0ODZlMjFjMjUwNDAwMTUxYWI2NzgiLCJpYXQiOjE3NDczMDg1MDcsImV4cCI6MTc0ODUxODEwN30.DgB8KZdY0G081Z6nCikY8PpGzfBtxoBLCf6v8tBTk8A";

    try {
      this.setState({ isSubmitting: true, error: null });

      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: this.state.comment,
          rate: this.state.rate,
          elementId: this.props.asin,
        }),
      });

      if (!response.ok) {
        throw new Error("Errore nell'invio del commento");
      }

      this.setState({ comment: "", rate: 1, isSubmitting: false });
      this.props.onCommentAdded(); // aggiorna lista commenti
    } catch (error) {
      this.setState({ error: error.message, isSubmitting: false });
    }
  };

  render() {
    const { comment, rate, isSubmitting, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Commento:</label>
          <input type="text" value={comment} onChange={(e) => this.setState({ comment: e.target.value })} required />
        </div>
        <div>
          <label>Voto:</label>
          <select value={rate} onChange={(e) => this.setState({ rate: e.target.value })}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Invio..." : "Aggiungi commento"}
        </button>
        {error && <p style={{ color: "red" }}>Errore: {error}</p>}
      </form>
    );
  }
}

export default AddComment;
