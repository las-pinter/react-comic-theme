import './index.css';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import { TMenu } from '../../context/Context';
import { MenuItemNoDropdown, MenuItemSocial } from '../Navbar/MenuItem';
import Sidebar from '../Sidebar';

interface IFooterProps extends IConsumerProps { }

const Footer = ({ context }: IFooterProps): JSX.Element => {
    let menuListTop: TMenu = []
    let menuListSocial: TMenu = []
    let menuListRelated: TMenu = []

    if (context.menus['top']) {
        menuListTop = context.menus['top'];
    }
    if (context.menus['social']) {
        menuListSocial = context.menus['social'];
    }
    if (context.menus['related']) {
        menuListRelated = context.menus['related'];
    }

    return (
        <footer className="container-vertical">
            <div className="footer-link-collection container-horizontal">
                <div className="navigation-bottom container-vertical">
                    <h2>Navigation</h2>
                    <div className="container-vertical">
                        {
                            menuListTop.map(function (item, i) {
                                return <MenuItemNoDropdown key={'footer-menu-item-' + item.ID} item={item} />
                            })
                        }
                    </div>
                </div>
                <div className="social-media container-vertical">
                    <h2>Social Media</h2>
                    <div className="footer-social container-vertical">
                        {
                            menuListSocial.map(function (item, i) {
                                return <MenuItemSocial key={'footer-menu-item-' + item.ID} item={item} displayText={true} />
                            })
                        }
                    </div>
                </div>
                <div className="related container-vertical">
                    <h2>Related</h2>
                    <div className="container-vertical">
                        {
                            menuListRelated.map(function (item, i) {
                                return <MenuItemNoDropdown key={'footer-menu-item-' + item.ID} item={item} />
                            })
                        }
                    </div>
                </div>
            </div>
            <Sidebar sidebarId='footer' background={false} />
        </footer>
    );
}

export default WithConsumer(Footer);