import React from 'react';
import WithConsumer from '../context/WithConsumer';
import ThePost from './ThePost';

const TheLoop = ({ context }) => {
  const posts = () => context.posts;
  const thePosts = posts();
  let results = '';

  if (context.appError) {
    results = <div className="app-error">{context.appError}</div>;
  } else {
    if (thePosts.length === 0) {
      results = <div className="no-results">no results</div>;
    } else {
      results = thePosts.map(function (item, i) {
        return <ThePost key={i} index={i}></ThePost>
      })
    }
  }

  return (results);
};

export default WithConsumer(TheLoop);