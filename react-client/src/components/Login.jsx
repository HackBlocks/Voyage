import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogOutClicked() {
    this.props.handleLogOut();
  }

  displayStatus() {
    let status = (
        <div>
          <span>Logged in as: { this.props.name }</span>
          <div className="ui teal button">
            <a
              className='btn float-right'
              onClick={ this.handleLogOutClicked.bind(this) }
            >
            Log out
            </a>
          </div>
        </div>
      );

    if (!this.props.isSignedIn) {
      status = (
          <div className="ui teal button">
            <a
              className='btn float-right'
              href="/login/facebook"
            >
            Log In with Facebook
            </a>
          </div>
        );

    }
    return status;
  }

  render() {
    return (
      <div>
        <div className="ui tabular menu">
          <div className="right menu">
            <div className="item">
              <div className="ui teal button">
                { this.displayStatus() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;