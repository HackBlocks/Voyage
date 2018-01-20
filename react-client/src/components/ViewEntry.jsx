import React from 'react';

class ViewEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    if (this.props.info.isSignedIn) {
      this.props.addEventToUser(this.props.event);
    } else {
      alert('Please sign in');
    }
  }

  render() {
    console.log('ViewEntry props: ', this.props);
    return (
      <div>
        <h4><a href={ this.props.event.url }>{ this.props.event.name }</a></h4>
        <img src={ this.props.event.image_url.replace('/o.jpg', '/m.jpg')} alt="" />
        <button type="button" onClick={ this.handleClick }>like</button>
      </div>
    );
  }
}

export default ViewEntry;

