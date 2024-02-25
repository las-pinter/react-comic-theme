import * as React from 'react';

import type { RouteMatch } from 'react-router-dom';
import RestHandler from '../rest/RestHandler';

export type TMenuItem = {
    url: string,
    title: string,
    ID: string,
    menu_item_parent: string,
    children: Array<TMenuItem>
};
export type TMenu = Array<TMenuItem>;
export type TMenus = Record<string, TMenu>;

export interface TComic {
    archivePage: string,
    comicSlug: string,
    name: string,
    firstPage: string,
    lastPage: string
};

export interface IProps {
    contextType: string,
    router: RouteMatch | null,
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
    comics: Record<string,TComic>,
    castPageSlug: string,
    logoImages: Record<string, string>,
    backgroundImages: Record<string, Record<string, string>>,
    currentComic: {
        comicPageFullSlug: string,
        comicPageSlug: string,
        comicSlug: string,
    }
};

const storeContext = React.createContext<Readonly<IContextState>>(
    {
        contextType: '',
        term: '',
        slug: '',
        route: '',
        menus: {},
        comics: {},
        castPageSlug: '',
        logoImages: {},
        backgroundImages: {},
        currentComic: {
            comicPageFullSlug: '',
            comicPageSlug: '',
            comicSlug: ''
        }
    }
);
export const Consumer = storeContext.Consumer;


export class Provider extends React.Component<IProps, IContextState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            contextType: props.contextType,
            term: props.router ? (props.router.params.term ? props.router.params.term : '') : '',
            slug: props.router ? (props.router.params.slug ? props.router.params.slug : '') : '',
            route: props.router ? props.router.route.path : '',
            menus: {},
            comics: {},
            castPageSlug: '',
            logoImages: {},
            backgroundImages: {},
            currentComic: {
                comicPageFullSlug: props.router ? (props.router.params['*'] ? props.router.params['*'] : '') : '',
                comicPageSlug: props.router ? (props.router.params['*'] ? this.formatComicSlug(props.router.params['*']) : '') : '',
                comicSlug: props.router ? (props.router.params['*'] ? this.getComicSlugFromRouter(props.router.params['*']) : '') : ''
            }
        };
    }

    componentDidMount() {
        this.getMenus();
        this.getComics();
        this.getCastPageSlug();
        this.getLogos();
        this.getBackgrounds();
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
            contextType: this.props.contextType,
            term: this.props.router.params.term ? this.props.router.params.term : '',
            slug: this.props.router.params.slug ? this.props.router.params.slug : '',
            route: this.props.router.route.path,
            currentComic: {
                comicPageFullSlug: this.props.router.params['*'] ? this.props.router.params['*'] : '',
                comicPageSlug: this.props.router.params['*'] ? this.formatComicSlug(this.props.router.params['*']) : '',
                comicSlug: this.props.router.params['*'] ? this.getComicSlugFromRouter(this.props.router.params['*']) : '',
            }
        });
    }

    buildUrl(): string {
        let url = '/wp-json/wp/v2/';
        switch (this.state.contextType) {
            case 'comic':
                url += 'comic?slug=';
                url += this.state.currentComic.comicPageSlug;
                url += '&_embed';
                break;
        }

        return url;
    }

    getComics() {
        let url = '/wp-json/comics/v1/comics';
        let self = this;

        return RestHandler.get(url).then((response) => {
            self.setState({
                comics: response.data
            })
        }).catch(() => {
            self.setState({
                comics: {},
            })
        });
    }

    getMenus() {
        let url = '/wp-json/generic/v1/menu/';
        let self = this;

        return RestHandler.get(url).then((response) => {
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

    getCastPageSlug() {
        let url = '/wp-json/settings/v1/cast_page';
        let self = this;

        return RestHandler.get(url).then((response) => {
            self.setState({
                castPageSlug: response.data
            })
        }).catch(() => {
            self.setState({
                castPageSlug: '',
            })
        });
    }

    getLogos() {
        let url = '/wp-json/settings/v1/logos';
        let self = this;

        return RestHandler.get(url).then((response) => {
            self.setState({
                logoImages: response.data
            })
        }).catch(() => {
            self.setState({
                logoImages: {},
            })
        });
    }

    getBackgrounds() {
        let url = '/wp-json/settings/v1/backgrounds';
        let self = this;

        return RestHandler.get(url).then((response) => {
            self.setState({
                backgroundImages: response.data
            })
        }).catch(() => {
            self.setState({
                backgroundImages: {},
            })
        });
    }

    formatComicSlug(longSlug: string): string {
        return longSlug.split('/').reverse()[1];
    }

    getComicSlugFromRouter(longSlug: string): string {
        return longSlug.split('/')[0];
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