import * as React from 'react';
import Axios from 'axios';

import type { RouteMatch } from 'react-router-dom';

export type TMenuItem = {
    url: string,
    title: string,
    ID: string,
    menu_item_parent: string,
    children: Array<TMenuItem>
};
export type TMenu = Array<TMenuItem>;
export type TMenus = Record<string, TMenu>;
export interface Post {
    type: string,
    _embedded: {
        author: Array<{
            name: string
        }>,
        'wp:featuredmedia': Array<{
            source_url: string
        }>,
        'wp:term': Array<
            Array<{
                slug: string
            }>
        >
    },
    date: string,
    slug: string,
    content: {
        rendered: string
    },
    title: {
        rendered: string
    },
    id: string
};

export interface ComicPost extends Post {
    type: 'comic'
}

export type Comic = {
    archivePage: string,
    comicSlug: string,
    name: string,
    firstPage: string,
    lastPage: string
};

export interface IProps {
    router?: RouteMatch | null,
    children?: React.ReactNode,
    index?: number,
    duration?: number,
};

export interface IContextState {
    contextType: string,
    term: string,
    slug: string,
    route: string | undefined,
    menus: TMenus,
    posts: Array<Post | ComicPost>,
    currentPage: number,
    totalPages: number,
    comics: Array<Comic>,
    currentComic: {
        comicFullSlug: string | undefined,
        comicSlug: string
    },
    postsNextClicked: Function,
    postsPreviousClicked: Function,
    getComics: Function
};

const storeContext = React.createContext<Readonly<IContextState>>(
    {
        contextType: '',
        term: '',
        slug: '',
        route: '',
        menus: {},
        posts: [],
        currentPage: 1,
        totalPages: 0,
        comics: [],
        currentComic: {
            comicFullSlug: '',
            comicSlug: ''
        },
        postsNextClicked: () => { },
        postsPreviousClicked: () => { },
        getComics: () => { },
    }
);
export const Consumer = storeContext.Consumer;


export class Provider extends React.Component<IProps, IContextState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            contextType: this.getContextType(props.router ? props.router.route.path : ''),
            term: props.router ? (props.router.params.term ? props.router.params.term : '') : '',
            slug: props.router ? (props.router.params.slug ? props.router.params.slug : '') : '',
            route: props.router ? props.router.route.path : '',
            menus: {},
            posts: [],
            currentPage: 1,
            totalPages: 0,
            comics: [],
            currentComic: {
                comicFullSlug: props.router ? props.router.params['*'] : '',
                comicSlug: props.router ? (props.router.params['*'] ? this.formatComicSlug(props.router.params['*']) : '') : '',
            },

            //global methods
            postsNextClicked: this.postsNextClicked.bind(this),
            postsPreviousClicked: this.postsPreviousClicked.bind(this),
            getComics: this.getComics.bind(this),
        };
    }

    getContextType(path: string | undefined): string {
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

    componentDidUpdate(prevProps: any) {
        if (!this.props.router) {
            return;
        }

        if (prevProps.router.pathname === this.props.router.pathname) {
            return;
        }

        if (!this.props.router.route.path) {
            return;
        }

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

    buildUrl(): string {
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
                url += this.state.slug ? 'posts/?slug=' + this.state.slug + '&_embed' : 'posts/?page=' + this.state.currentPage + '&per_page=3&_embed';
                break;
        }

        return url;
    }

    getPosts(url: string) {
        let self = this;

        return Axios.get(url).then((response) => {
            self.setState(() => {
                return {
                    posts: response.data,
                    totalPages: response.headers['x-wp-totalpages']
                }
            });
        }).catch((error) => {
        });
    }

    postsNextClicked() {
        let newPage = this.state.currentPage + 1;
        this.setState({
            currentPage: newPage
        }, () => {
            this.getPosts(this.buildUrl());
        })
    }


    postsPreviousClicked() {
        let newPage = this.state.currentPage - 1;
        this.setState({
            currentPage: newPage
        }, () => {
            this.getPosts(this.buildUrl());
        });
    }

    getComics() {
        let url = '/wp-json/comics/v1/comics';
        let self = this;

        return Axios.get(url).then((response) => {
            self.setState({
                comics: response.data
            })
        }).catch(() => {
            self.setState({
                comics: [],
            })
        });
    }

    getMenus() {
        let url = '/wp-json/generic/v1/menu/';
        let self = this;

        return Axios.get(url).then((response) => {
            let processedMenus: TMenus = {};
            let responseMenus: TMenus = response.data;

            Object.keys(responseMenus).forEach(menu => {
                let menuItems = responseMenus[menu];

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

            });
            self.setState({
                menus: processedMenus,
            });
        }).catch(() => {
            self.setState({
                menus: {}
            })
        });
    }

    formatComicSlug(longSlug: string): string {
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