import './index.css';

import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import { TMenu } from '../../context/Context';
import { MenuItemNoDropdown, MenuItemSocial } from '../Navbar/MenuItem';

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
                <div className="navigation-bottom">
                    <h2>Navigation</h2>
                    <div className="container-vertical">
                        {
                            menuListTop.map(function (item, i) {
                                return <MenuItemNoDropdown key={'footer-menu-item-' + item.ID} item={item} />
                            })
                        }
                    </div>
                </div>
                <div className="social-media">
                    <h2>Social Media</h2>
                    <div className="footer-social container-vertical">
                        {
                            menuListSocial.map(function (item, i) {
                                return <MenuItemSocial key={'footer-menu-item-' + item.ID} item={item} displayText={true} />
                            })
                        }
                    </div>
                </div>
                <div className="related">
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
            <div className="copyright"></div>
        </footer>
    );
}

export default WithConsumer(Footer);