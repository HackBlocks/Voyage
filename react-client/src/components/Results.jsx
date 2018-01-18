import React from 'react';
import EatView from '../Greenfield/EatView.jsx';
import PartyView from '../Greenfield/PartyView.jsx';
import SleepView from '../Greenfield/SleepView.jsx';
import ExploreView from '../Greenfield/ExploreView.jsx';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Results', this.props);
    return (
      <div>
        <Link to='/restaurants'>Good Eats</Link>
      </div>
      <div>
        <Switch>
          <EatView restaurants={ this.props.restaurants }/>
          <Route path='/restaurants' component>
        </Switch>
      </div>
    );
  }
}

export default Results;
{/*
        <PartyView />
      <div>
        <Link to='/eat'>Eat</Link>
        <PartyView />
        <SleepView />
        <ExploreView />
      </div>


        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link to={'/eat'}>Eat</Link>
                <Link to={'/party'}>Party</Link>
                <Link to={'/sleep'}>Sleep</Link>
                <Link to={'/explore'}>Explore</Link>
              </div>
            </div>
          </nav>
          <div>
            <Switch>
              <Route path="/eat" render={() => <EatView eat={ this.props.eat } />} />
            </Switch>
          </div>
        </div>
*/}