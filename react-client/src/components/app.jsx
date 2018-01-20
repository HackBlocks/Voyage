import React from 'react';
import RouteProps from 'react-route-props';
import { Route, Switch, indexRoute } from 'react-router-dom';
import axios from 'axios';
import Login from './Login.jsx';
import SearchLocation from './SearchLocation.jsx';
import Results from './Results.jsx';
import View from './View.jsx';
import Board from './Board.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userBoard: [],
      // userBoard: [{
      //   id: "the-alcove-sunnyside",
      //   image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/n0ofwdV91hEgz1hNxON8vA/o.jpg",
      //   name: "The Alcove",
      //   url: "https://www.yelp.com/biz/the-alcove-sunnyside?adjust_creative=gPuhcPOmccHhGEqwdvqJwg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=gPuhcPOmccHhGEqwdvqJwg",
      //   _id: "5a63b0befe905504b5954e54"
      // }],
      categories: {
        restaurants: [],
        hotels: [],
        events: []
      },
      isSignedIn: false,
      location: ''
    };
    this.go = this.go.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.addEventToUser = this.addEventToUser.bind(this);
  }

  componentDidMount() {
    this.signIn();
    this.getBoard();
  }

  signIn() {
    var that = this;
    $.ajax({
      url: '/checkSession',
      success: function(userId) {
        that.setState({
          isSignedIn: true,
          userId: userId
        });
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
        that.setState({ isSignedIn: false });
      },
      error: function() {
        console.log('logout error');
      }
    });
  }

  deleteEventFromUser(eventId) {
    axios.delete('/users/' + this.state.userId + '/events/' + eventId)
      .then(response => {
        console.log('Deleted from user ', response);
        // this.setState({userBoard: response.data});

      })
      .catch(error => {
        console.log('Could not delete ', error);
      });
  }

  getBoard() {
    if (this.state.isSignedIn) {
      axios.get('/users/' + this.state.userId + '/events')
        .then(response => {
          console.log('User board ', response);
          this.setState({ userBoard: response.data });
        })
        .catch(error => {
          console.log('could not retreieve board');
        });
    }
  }

  addEventToUser(event) {
    axios.post('/users/' + this.state.userId + '/events', {
      event: event
    })
      .then(response => {
        console.log('Add to event results ', response.data);
        this.setState({ userBoard: response.data });
      })
      .catch(error => {
        console.log('Could not add this event', error);
      });
  }

  go(loc) {
    this.setState({
      location: loc
    });

    axios.get('/search', {
      params: {location: loc}
    })
      .then(response => {
        // console.log('Data from server', response);
        this.setState({
          categories: response.data
        });
      })
      .catch(error => {
        console.log('Error, could not search ', error);
      });
  }

  displaySearch() {
    let display = <div></div>;
    if (this.state.location ||
        (this.state.categories.restaurants.length !== 0 ||
         this.state.categories.hotels.length !== 0 ||
         this.state.categories.events.length !== 0)) {
      display =
        <div>
          <hr/>
          <Results
            info={ this.state }
            addEventToUser={ this.addEventToUser } />
          <hr/>
        </div>;
    }
    return display;
  }

  // If User logged in, render Board component
  displayBoard() {
    let display =
      <div>
        <h1>Please sign in to see your board!</h1>
      </div>;
    if (this.state.isSignedIn && this.state.userBoard.length !== 0) {
      display =
        <div>
          <h2>My Board</h2>
          <Board
            info={ this.state }
            board={ this.state.userBoard }
            deleteEventFromUser={ this.deleteEventFromUser }/>
        </div>;
    } else if (this.state.isSignedIn && this.state.userBoard.length === 0) {
      display =
        <div>
          <h1>Your board is empty</h1>
        </div>;
    }
    return display;
  }

  render() {
    console.log('state', this.state);
    return (
      <div>
        <Login
          handleLogOut={ this.handleLogOut.bind(this) }
          isSignedIn={ this.state.isSignedIn }
        />
        <SearchLocation go={ this.go }/>
        { this.displaySearch() }
        { this.displayBoard() }
      </div>
    );
  }
}

export default App;

