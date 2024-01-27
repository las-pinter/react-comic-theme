import React from 'react';
import Axios from 'axios';

const storeContext = React.createContext();
export const Consumer = storeContext.Consumer;

export class Provider extends React.Component {
    constructor(props) {
        super(props);

        let contextType = this.getContextType(props.router.route.path);
        let route = props.router.route.path;
        let slug = props.router.params.slug ? props.router.params.slug : '';
        let term = props.router.params.term ? props.router.params.term : '';
        let catid = props.router.params.catid ? props.router.params.catid : '';
        let comicSlug = props.router.params['*'] ? this.formatComicSlug(props.router.params['*']) : '';

        this.state = {
            contextType: contextType,
            term: term,
            slug: slug,
            catid: catid,
            route: route,
            posts: [],
            currentPage: 1,
            totalPages: 0,
            appError: '',
            comics: [],
            comicFullSlug: props.router.params['*'],
            comicSlug: comicSlug,
            comicFirstPage: '',
            comicPreviousPage: '',
            comicNextPage: '',
            comicLastPage: '',
            //global methods
            postsNextClicked: this.postsNextClicked.bind(this),
            postsPreviousClicked: this.postsPreviousClicked.bind(this),
        };
    }

    getContextType(path) {
        let contextType = '';
        switch (path) {
            case '/':
                contextType = 'mainPage';
                break;
            case '/page/:slug':
                contextType = 'page';
                break;
            case '/search/:term':
                contextType = 'search';
                break;
            case '/comic/*':
                contextType = 'comic';
                break;
            case '/:slug':
            default:
                contextType = 'post';
                break;
        }
        return contextType;
    }

    componentDidMount() {
        this.getPosts(this.buildUrl());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router.pathname !== this.props.router.pathname) {
            let contextType = this.getContextType(this.props.router.route.path);

            let additionalStates = {};
            if ('comic' === contextType) {
                additionalStates = {
                    ...additionalStates,
                    ...{
                        comicFullSlug: this.props.router.params['*'],
                        comicSlug: this.formatComicSlug(this.props.router.params['*'])
                    }
                };
            }

            if (this.props.router.route.path)
                this.setState({
                    currentPage: 1,
                    contextType: contextType,
                    ...additionalStates
                }, function () {
                    this.getPosts(this.buildUrl());
                })

        }
    }

    buildUrl() {
        let url = '/wp-json/wp/v2/';
        switch (this.state.contextType) {
            case 'page':
                url += 'pages/?slug=';
                url += this.state.slug + '&_embed'
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
                if (self.state.contextType === 'comic' && self.state.posts[0]) {
                    let id = self.state.posts[0].id;
                    self.getComicFirstPage(id);
                    self.getComicPreviousPage(id);
                    self.getComicNextPage(id);
                    self.getComicLastPage(id);
                }

                if (self.state.contextType === 'mainPage' && self.state.posts[0]) {
                    self.getComics();
                }
            })
        }).catch(function (error) {
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
        });
    }

    getComics() {
        let url = '/wp-json/comics/v1/getcomics';
        let self = this;
        Axios.get(url).then((response) => {
            self.setState({
                comics: response.data
            })
        }).catch(function (error) {
            self.setState({
                comics: []
            })
        });
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