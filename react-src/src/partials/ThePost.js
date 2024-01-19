import React from 'react';
import { Link } from 'react-router-dom';
import WithConsumer from '../context/WithConsumer';
import PostMeta from './PostMeta';

const ThePost = ({ index, context }) => {

  const posts = () => context.posts;
  const item = posts()[index];

  let linkPrefix = item.type === 'page' ? '/page/' : '/post/';
  let linkSlug = item.slug;
  let theContent = '';
  let imageUrl = '';

  switch (context.route) {
    case '/': //if homepage,
    case '/category/:catid': //or if search
      theContent = item.excerpt ? item.excerpt.rendered : "No Excerpt"; //show excerpt only
      break;
    case '/comic/*':
      theContent = item.content.rendered;
      linkPrefix = '/comic/';
      linkSlug = context.comicSlug;
      imageUrl = item._embedded['wp:featuredmedia'][0].source_url;
      break;
    default: //for single, pages - show entire content
      theContent = item.content.rendered;
      break;
  }

  return (
    <div id={'post-id-' + item.id} className={'post-item'}>
      <h1><Link to={linkPrefix + linkSlug}>{item.title.rendered}</Link></h1>
      <PostMeta index={index}></PostMeta>
      <div className="the-comic">
        <img 
          src={imageUrl}
          alt="The Comic"
        />
      </div>
      <div className="post-content" dangerouslySetInnerHTML={{ __html: theContent }}></div>
    </div>
  );
};

export default WithConsumer(ThePost);