import React from 'react';
import RouteProps from 'react-route-props';
import { Route, Switch, indexRoute } from 'react-router-dom';
import axios from 'axios';
import Home from './Home.jsx';
import Login from './Login.jsx';
import User from './User.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      restaurants: [],
      hotels: [],
      events: [],
      board: [],
      isSignedIn: false,
      location: ''
    };
    this.go = this.go.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  deleteLike(event) {
    axios.delete('/', {
      params: {event: event}
    })
      .then(response => {
        console.log('Deleted');
      })
      .catch(error => {
        console.log('Could not delete');
      });
  }

  getBoard() {
    axios.get('/')
      .then(response => {
        this.setState({board: response.data});
      })
      .catch(error => {
        console.log('could not retreieve board');
      });
  }

  // postLike(event) {
  //   axios.
  // }

  go(loc) {
    this.setState({
      location: loc
    });

    axios.get('/', {
      params: {location: loc}
    })
      .then(response => {
        console.log('Data from server', response);
        this.setState({

        });
      });
  }
  componentDidMount() {
    this.signIn();
    this.getBoard();
  }

  signIn() {
    var that = this;
    $.ajax({
      url: '/checkSession',
      success: function(isSignedIn) {
        that.setState({ isSignedIn: isSignedIn });
      },
      error: function() {
        console.log('check access token error');
      }
    });
  }

  handleLogOut() {
    this.logOut();
  }

  logOut() {
    var that = this;
    $.ajax({
      url: '/logOut',
      success: function(isSignedIn) {
        that.setState({ isSignedIn: isSignedIn });
      },
      error: function() {
        console.log('logout error');
      }
    });
  }


  render() {
    return (
      <div>
        <Login handleLogOut={ this.handleLogOut.bind(this) } isSignedIn={ this.state.isSignedIn }/>
        <Switch>
          <RouteProps exact path='/' component={ Home } info={ this.state } go={ this.go }/>
          <RouteProps path='/user/:id' component={ User } />
        </Switch>
      </div>
    );
  }
}

export default App;

