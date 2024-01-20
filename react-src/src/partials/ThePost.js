import React from 'react';
import { Link } from 'react-router-dom';
import WithConsumer from '../context/WithConsumer';
import PostMeta from './PostMeta';
import TheComic from './TheComic';

const ThePost = ({ index, context }) => {

  const posts = () => context.posts;
  const item = posts()[index];

  let linkPrefix = '';
  switch (item.type) {
    case 'page':
      linkPrefix = '/page/';
      break;
    case 'post':
      linkPrefix = '/';
      break;
    case 'comic':
      linkPrefix = '/comic/';
      break;
    default:
      linkPrefix = '/';
      break;
  }

  let linkSlug = item.slug;
  let theContent = '';
  let comic = '';

  switch (context.route) {
    case '/':
      theContent = item.excerpt ? item.excerpt.rendered : "No Excerpt";
      break;
    case '/comic/*':
      theContent = item.content.rendered;
      linkPrefix = '/comic/';
      linkSlug = context.comicSlug;
      comic = < TheComic index={index} />;
      break;
    case '/:slug':
    case '/page/:slug':
      theContent = item.content.rendered;
      break;
    default:
      theContent = '';
      break;
  }

  return (
    <div id={'post-id-' + item.id} className={'post-item'}>
      <h1><Link to={linkPrefix + linkSlug}>{item.title.rendered}</Link></h1>
      <PostMeta index={index}></PostMeta>
      {comic}
      <div className="post-content" dangerouslySetInnerHTML={{ __html: theContent }}></div>
    </div>
  );
};

export default WithConsumer(ThePost);