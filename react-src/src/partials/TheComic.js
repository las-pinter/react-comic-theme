import React from 'react';
import WithConsumer from '../context/WithConsumer';
import ComicNavigator from './ComicNavigator';

const TheComic = ({ index, context }) => {
  const item = context.posts[index];

  let comicImageUrl = '';
  if (item._embedded) {
    if (item._embedded['wp:featuredmedia']) {
      comicImageUrl = item._embedded['wp:featuredmedia'][0].source_url;
    }
  }

  return (
    <div className="the-comic-container">
      <div className="navigator-top">
        <ComicNavigator index={index} />
      </div>
      <div className="the-comic">
        <img src={comicImageUrl} alt="Name of the Comic" />
      </div>
      <div className="navigator-bottom">
        <ComicNavigator index={index} />
      </div>
    </div>
  );
};

export default WithConsumer(TheComic);