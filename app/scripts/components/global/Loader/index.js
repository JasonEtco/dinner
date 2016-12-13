import React from 'react';
import h from '../../../utils/helpers';
import './Loader.scss';

const Loader = () => {
  const prefixes = Object.keys(h.prefixes);
  return (
    <div className="loader room-tile">
      {prefixes.map(key => (
        <div key={key}>
          <div className={`user user--${h.slugify(key)}`} />
        </div>
      ))}
    </div>
  );
};

export default Loader;
