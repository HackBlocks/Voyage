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
        <p>Logged in as: { this.props.name }    &nbsp;&nbsp;
          <a className='ui teal basic button'
            onClick={ this.handleLogOutClicked.bind(this) }>
            Log out
          </a>
        </p>
      </div>
    );

    if (!this.props.isSignedIn) {
      status = (
        <div>
          <a
            className='ui yellow basic button'
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
              { this.displayStatus() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;