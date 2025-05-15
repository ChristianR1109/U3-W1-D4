import { Component } from 'react'

class ImageComponent extends Component {
  render() {
    return (
      // we need the src and the alt attributes
      <img src={this.props.imageSrc} alt={this.props.altText} />
    )
  }
}

export default ImageComponent
