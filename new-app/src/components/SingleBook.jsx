import { Component } from "react";
import { Card } from "react-bootstrap";
import CommentArea from "./CommentArea";

class SingleBook extends Component {
  state = {
    selected: false,
  };

  render() {
    return (
      <Card onClick={() => this.setState({ selected: !this.state.selected })} style={{ border: this.state.selected ? "3px solid red" : "none" }}>
        <Card.Img variant="top" src={this.props.book.img} />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>{this.props.book.title}</Card.Title>
          {this.state.selected && <CommentArea asin={this.props.book.asin} />} {/* se selected mostra CommentArea*/}
        </Card.Body>
      </Card>
    );
  }
}

export default SingleBook;
