import React from 'react';
import WithConsumer from '../context/WithConsumer';

const TheComic = ({ index, context }) => {

  const posts = () => context.posts;
  const item = posts()[index];
  const comicImageUrl = item._embedded['wp:featuredmedia'][0].source_url;

  return (
    <div className="the-comic">
      <img src={comicImageUrl} alt="Name of the Comic"/>
    </div>
  );
};

export default WithConsumer(TheComic);