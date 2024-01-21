import React from 'react';
import Axios from 'axios';

const storeContext = React.createContext();
export const Consumer = storeContext.Consumer;

export class Provider extends React.Component {
  constructor(props) {
    super(props);

    let restType = this.getRestType(props.router.route.path);
    let route = props.router.route.path;
    let slug = props.router.params.slug ? props.router.params.slug : '';
    let term = props.router.params.term ? props.router.params.term : '';
    let catid = props.router.params.catid ? props.router.params.catid : '';
    let comicSlug = props.router.params['*'] ? this.formatComicSlug(props.router.params['*']) : '';

    this.state = {
      term: term,
      slug: slug,
      restType: restType,
      catid: catid,
      route: route,
      comicSlug: comicSlug,
      posts: [],
      currentPage: 1,
      totalPages: 0,
      appError: '',
      comicFirstPage: '',
      comicPreviousPage: '',
      comicNextPage: '',
      comicLastPage: '',
      //global methods
      postsNextClicked: this.postsNextClicked.bind(this),
      postsPreviousClicked: this.postsPreviousClicked.bind(this),
    };

  }

  getRestType(path) {
    let restType = '';
    switch (path) {
      case '/page/:slug':
        restType = 'page';
        break;
      case '/search/:term':
        restType = 'search';
        break;
      case '/category/:catid':
        restType = 'category';
        break;
      case '/comic/*':
        restType = 'comic';
        break;
      case '/:slug':
      default:
        restType = 'post';
        break;
    }
    return restType;
  }

  componentDidMount() {
    this.getPosts(this.buildUrl());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.router.pathname !== this.props.router.pathname) {
      this.setState({
        currentPage: 1,
        restType: this.getRestType(this.props.router.route.path),
        comicSlug: this.formatComicSlug(this.props.router.params['*'])
      }, function () {
        this.getPosts(this.buildUrl());
      })

    }
  }

  buildUrl() {
    let url = '/wp-json/wp/v2/';
    switch (this.state.restType) {
      case 'page':
        url += 'pages/?slug=';
        url += this.state.slug + '&_embed'
        break;
      case 'category':
        url += 'posts?categories=';
        url += this.state.catid;
        url += '&page=' + this.state.currentPage + '&_embed';
        break;
      case 'comic':
        url += 'comic?slug=';
        url += this.state.comicSlug;
        url += '&_embed';
        break;
      case 'post':
      default:
        url += this.state.slug ? 'posts/?slug=' + this.state.slug + '&_embed' : 'posts/?page=' + this.state.currentPage + '&_embed';
        break;
    }

    return url;
  }

  getPosts(url) {
    let self = this;
    Axios.get(url).then((response) => {
      self.setState({
        posts: response.data,
        totalPages: response.headers['x-wp-totalpages']
      }, function () {
        // Get additional comic data if we are dealing with a comic
        if (self.state.restType === 'comic' && self.state.posts[0]) {
          let id = self.state.posts[0].id;
          self.getComicFirstPage(id);
          self.getComicPreviousPage(id);
          self.getComicNextPage(id);
          self.getComicLastPage(id);
        }
      })
    }).catch(function (error) {
      console.log(error);
      self.appError = 'An unexpected error occurred';
    });
  }

  getComicFirstPage(id) {
    let url = '/wp-json/comics/v1/getfirst/' + id;
    let self = this;
    Axios.get(url).then((response) => {
      self.setState({
        comicFirstPage: response.data
      })
    }).catch(function (error) {
      self.setState({
        comicFirstPage: ''
      })
    });
  }

  getComicPreviousPage(id) {
    let url = '/wp-json/comics/v1/getprevious/' + id;
    let self = this;
    Axios.get(url).then((response) => {
      self.setState({
        comicPreviousPage: response.data
      })
    }).catch(function (error) {
      self.setState({
        comicPreviousPage: ''
      })
    });
  }

  getComicNextPage(id) {
    let url = '/wp-json/comics/v1/getnext/' + id;
    let self = this;
    Axios.get(url).then((response) => {
      self.setState({
        comicNextPage: response.data
      })
    }).catch(function (error) {
      self.setState({
        comicNextPage: ''
      })
    });
  }

  getComicLastPage(id) {
    let url = '/wp-json/comics/v1/getlast/' + id;
    let self = this;
    Axios.get(url).then((response) => {
      self.setState({
        comicLastPage: response.data
      })
    }).catch(function (error) {
      self.setState({
        comicLastPage: ''
      })
    });
  }

  postsNextClicked() {
    let newPage = this.state.currentPage + 1;
    this.setState({
      currentPage: newPage
    }, function () {
      this.getPosts(this.buildUrl());
    })
  }


  postsPreviousClicked() {
    let newPage = this.state.currentPage - 1;
    this.setState({
      currentPage: newPage
    }, function () {
      this.getPosts(this.buildUrl());
    })
  }

  
  formatComicSlug(longSlug) {
    return longSlug.split('/').reverse()[1];
  }

  render() {
    return (
      <storeContext.Provider value={this.state}>
        {this.props.children}
      </storeContext.Provider>
    );
  }
}