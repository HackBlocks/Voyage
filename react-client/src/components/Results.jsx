import React from 'react';
import View from './View.jsx';

const Results = (props) => {
  var eatDiv;
  var sleepDiv;
  var doDiv;
  if (props.show.eat) {
    eatDiv = (
      <div className="ui middle aligned stackable segment">
        <h2>Food & Drinks | { props.info.location }</h2>
        <View
          info={ props.info }
          category={ props.info.categories.restaurants }
          addEventToUser={ props.addEventToUser }
        />
      </div>
    );
  }
  if (props.show.sleep) {
    sleepDiv = (
      <div className="ui middle aligned stackable segment">
        <h2>Accommodations | { props.info.location }</h2>
        <View
          info={ props.info }
          category={ props.info.categories.hotels }
          addEventToUser={ props.addEventToUser } />
      </div>
    );
  }
  if (props.show.do) {
    doDiv = (
      <div className="ui middle aligned stackable segment">
        <h2>Events | { props.info.location }</h2>
        <View
          info={ props.info }
          category={ props.info.categories.events }
          addEventToUser={ props.addEventToUser } />
      </div>
    );
  }
  return (
    <div>
      { eatDiv }
      { sleepDiv }
      { doDiv }
    </div>
  );
};

export default Results;
