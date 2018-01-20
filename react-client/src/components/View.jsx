import React from 'react';
import ViewEntry from './ViewEntry.jsx';

const View = (props) => {
  console.log('View Props:', props);
  return (
    <div>
      {props.category.map(event =>
        <ViewEntry
          key={ event.id }
          event={ event }
          info={ props.info }
          addEventToUser={ props.addEventToUser }
        />
      )}
    </div>
  );
};

export default View;
