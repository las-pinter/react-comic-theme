import React from 'react';
import Axios from 'axios';

const storeContext = React.createContext();
export const Consumer = storeContext.Consumer;

export class Provider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingComponents: {},
            contextType: this.getContextType(props.router.route.path),
            term: props.router.params.term ? props.router.params.term : '',
            slug: props.router.params.slug ? props.router.params.slug : '',
            route: props.router.route.path,
            menus: [],
            posts: [],
            sidebars: {},
            currentPage: 1,
            totalPages: 0,
            comics: [],
            comicArchive: [],
            currentComic: {
                comicFullSlug: props.router.params['*'],
                comicSlug: props.router.params['*'] ? this.formatComicSlug(props.router.params['*']) : '',
                firstPage: '',
                previousPage: '',
                nextPage: '',
                lastPage: '',
            },

            //global methods
            postsNextClicked: this.postsNextClicked.bind(this),
            postsPreviousClicked: this.postsPreviousClicked.bind(this),
            getComicArchive: this.getComicArchive.bind(this),
            getComics: this.getComics.bind(this),
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
        this.getMenus();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router.pathname !== this.props.router.pathname) {
            if (this.props.router.route.path) {
                this.setState({
                    currentPage: 1,
                    contextType: this.getContextType(this.props.router.route.path),
                    term: this.props.router.params.term ? this.props.router.params.term : '',
                    slug: this.props.router.params.slug ? this.props.router.params.slug : '',
                    route: this.props.router.route.path,
                    currentComic: {
                        comicFullSlug: this.props.router.params['*'],
                        comicSlug: this.props.router.params['*'] ? this.formatComicSlug(this.props.router.params['*']) : ''
                    }
                }, () => {
                    this.getPosts(this.buildUrl());
                })
            }

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
                url += this.state.currentComic.comicSlug;
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
        self.setState((prevState) => {
            return {
                loadingComponents: {
                    ...prevState.loadingComponents,
                    post: true
                }
            }
        })

        return Axios.get(url).then((response) => {
            self.setState((prevState) => {
                return {
                    posts: response.data,
                    totalPages: response.headers['x-wp-totalpages'],
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        post: false
                    }
                }
            }, () => {
                // Get additional comic data if we are dealing with a comic
                if ('comic' === self.state.contextType && self.state.posts[0]) {
                    let id = self.state.posts[0].id;
                    self.getComic(id);
                }
            })
        }).catch((error) => {
        });
    }

    getComic(id) {
        let self = this;
        self.setState((prevState) => {
            return {
                loadingComponents: {
                    ...prevState.loadingComponents,
                    comic: true
                }
            }
        })
        
        Promise.all([
            self.getComicFirstPage(id),
            self.getComicPreviousPage(id),
            self.getComicNextPage(id),
            self.getComicLastPage(id),
        ]).then(() => {
            self.setState((prevState) => {
                return {
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comic: false
                    }
                }
            })
        });
    }

    getComicFirstPage(id) {
        let url = '/wp-json/comics/v1/first/' + id;
        let self = this;
        self.setState((prevState) => {
            return {
                loadingComponents: {
                    ...prevState.loadingComponents,
                    comicFirstPage: true
                }
            }
        })
        return Axios.get(url).then((response) => {
            self.setState((prevState) => {
                return {
                    currentComic: {
                        ...prevState.currentComic,
                        firstPage: response.data
                    },
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comicFirstPage: false
                    }
                }
            })
        }).catch(function (error) {
            self.setState((prevState) => {
                return {
                    currentComic: {
                        ...prevState.currentComic,
                        firstPage: ''
                    },
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comicFirstPage: false
                    }
                }
            })
        });
    }

    getComicPreviousPage(id) {
        let url = '/wp-json/comics/v1/previous/' + id;
        let self = this;
        self.setState((prevState) => {
            return {
                loadingComponents: {
                    ...prevState.loadingComponents,
                    comicPreviousPage: true
                }
            }
        })
        return Axios.get(url).then((response) => {
            self.setState((prevState) => {
                return {
                    currentComic: {
                        ...prevState.currentComic,
                        previousPage: response.data
                    },
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comicPreviousPage: false
                    }
                }
            })
        }).catch(function (error) {
            let newCurrentComic = self.state.currentComic;
            newCurrentComic.previousPage = '';

            self.setState((prevState) => {
                return {
                    currentComic: {
                        ...prevState.currentComic,
                        previousPage: ''
                    },
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comicPreviousPage: false
                    }
                }
            })
        });
    }

    getComicNextPage(id) {
        let url = '/wp-json/comics/v1/next/' + id;
        let self = this;
        self.setState((prevState) => {
            return {
                loadingComponents: {
                    ...prevState.loadingComponents,
                    comicNextPage: true
                }
            }
        })
        return Axios.get(url).then((response) => {
            self.setState((prevState) => {
                return {
                    currentComic: {
                        ...prevState.currentComic,
                        nextPage: response.data
                    },
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comicNextPage: false
                    }
                }
            })
        }).catch(function (error) {
            self.setState((prevState) => {
                return {
                    currentComic: {
                        ...prevState.currentComic,
                        nextPage: ''
                    },
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comicNextPage: false
                    }
                }
            })
        });
    }

    getComicLastPage(id) {
        let url = '/wp-json/comics/v1/last/' + id;
        let self = this;
        self.setState((prevState) => {
            return {
                loadingComponents: {
                    ...prevState.loadingComponents,
                    comicLastPage: true
                }
            }
        })
        return Axios.get(url).then((response) => {
            self.setState((prevState) => {
                return {
                    currentComic: {
                        ...prevState.currentComic,
                        lastPage: response.data
                    },
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comicLastPage: false
                    }
                }
            })
        }).catch(function (error) {
            self.setState((prevState) => {
                return {
                    currentComic: {
                        ...prevState.currentComic,
                        lastPage: ''
                    },
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comicLastPage: false
                    }
                }
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
        let url = '/wp-json/comics/v1/comics';
        let self = this;
        self.setState((prevState) => {
            return {
                loadingComponents: {
                    ...prevState.loadingComponents,
                    comics: true
                }
            }
        })
        return Axios.get(url).then((response) => {
            self.setState((prevState) => {
                return {
                    comics: response.data,
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comics: false
                    }
                }
            })
        }).catch(function (error) {
            self.setState((prevState) => {
                return {
                    comics: [],
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comics: false
                    }
                }
            })
        });
    }

    getComicArchive(comicSlug) {
        let url = '/wp-json/comics/v1/comicarchive/' + comicSlug;
        let self = this;
        self.setState((prevState) => {
            return {
                loadingComponents: {
                    ...prevState.loadingComponents,
                    comicArchive: true
                }
            }
        })
        return Axios.get(url).then((response) => {
            self.setState((prevState) => {
                return {
                    comicArchive: response.data,
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comicArchive: false
                    }
                }
            })
        }).catch(function (error) {
            self.setState((prevState) => {
                return {
                    comicArchive: [],
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        comicArchive: false
                    }
                }
            })
        });
    }

    getMenus() {
        let url = '/wp-json/generic/v1/menu/';
        let self = this;
        self.setState((prevState) => {
            return {
                loadingComponents: {
                    ...prevState.loadingComponents,
                    menus: true
                }
            }
        })
        Axios.get(url).then((response) => {
            let processedMenus = {};
            for (const [menu, menuItems] of Object.entries(response.data)) {
                let parentItems = menuItems.filter(menuItem => {
                    return menuItem['menu_item_parent'] === "0";
                })

                parentItems.forEach(parentItem => {
                    parentItem['children'] = [];
                });

                menuItems.filter(menuItem => {
                    return menuItem['menu_item_parent'] !== "0";
                }).forEach(childItem => {
                    parentItems.filter(parentItem => {
                        return parseInt(parentItem['ID']) === parseInt(childItem['menu_item_parent']);
                    }).forEach(parentItem => {
                        parentItem['children'].push(childItem);
                    })
                });

                processedMenus[menu] = parentItems;
            };

            self.setState((prevState) => {
                return {
                    menus: processedMenus,
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        menus: false
                    }
                }
            });
        }).catch(function (error) {
            self.setState((prevState) => {
                return {
                    menus: [],
                    loadingComponents: {
                        ...prevState.loadingComponents,
                        menus: false
                    }
                }
            })
        });
    }

    formatComicSlug(longSlug) {
        return longSlug.split('/').reverse()[1];
    }

    render() {
        return (
            <>
                <storeContext.Provider value={this.state}>
                    {this.props.children}
                </storeContext.Provider>
            </>
        );
    }
}