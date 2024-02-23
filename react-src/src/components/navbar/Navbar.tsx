import './index.css';

import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

import { TMenu } from "../../context/Context";
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

import { MenuItem, MenuItemSocial } from "./MenuItem";
import OverlayNavbar from "./OverlayNavbar";

const Navbar = ({ context }: IConsumerProps): JSX.Element => {
    const [overlayNavbarVisible, setOverlayNavbarVisible] = useState(false);

    useEffect(() => {
        setOverlayNavbarVisible(false);
    }, [context.slug])

    let menuListTop: TMenu = []
    let menuListSocial: TMenu = []

    if (context.menus['top']) {
        menuListTop = context.menus['top'];
    }
    if (context.menus['social']) {
        menuListSocial = context.menus['social'];
    }

    return (
        <>
            <nav className="navbar container-vertical">
                <FaBars
                    className="navigation-bar-bars"
                    onClick={() => {
                        setOverlayNavbarVisible(true);
                    }}
                />
                <div className="menu container-horizontal">
                    {
                        menuListTop.map(function (item, i) {
                            return <MenuItem key={'menu-item-' + item.ID} item={item} />
                        })
                    }
                </div>
                <div className="menu container-horizontal">
                    {
                        menuListSocial.map(function (item, i) {
                            return <MenuItemSocial key={'menu-item-social' + item.ID} item={item} displayText={false} />
                        })
                    }
                </div>
            </nav>
            <div className={"overlay-navbar-wrapper"}>
                <OverlayNavbar menuList={menuListTop} menuListSocial={menuListSocial} show={overlayNavbarVisible} visibilityCallback={(value) => setOverlayNavbarVisible(value)} />
            </div>
        </>
    );
};

export default WithConsumer(Navbar);