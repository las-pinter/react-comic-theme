import './index.css';

import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

import { TMenu } from "../../context/Context";
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';

import MenuItem from "./MenuItem";
import OverlayNavbar from "./OverlayNavbar";

const Navbar = ({ context }: IConsumerProps): JSX.Element => {
    const [overlayNavbarVisible, setOverlayNavbarVisible] = useState(false);

    useEffect(() => {
        setOverlayNavbarVisible(false);
    },[context.slug])

    let menuList: TMenu = []

    if (context.menus['top']) {
        menuList = context.menus['top'];
    }

    return (
        <>
            <nav className="navbar container-horizontal">
                <FaBars
                    className="navigation-bar-bars"
                    onClick={() => {
                        setOverlayNavbarVisible(true);
                    }}
                />

                <div className="menu container-horizontal">
                    {
                        menuList.map(function (item, i) {
                            return <MenuItem key={'menu-item-' + item.ID} item={item} />
                        })
                    }
                </div>
            </nav>
            <div className={"overlay-navbar-wrapper"}>
                <OverlayNavbar menuList={menuList} show={overlayNavbarVisible} visibilityCallback={(value) => setOverlayNavbarVisible(value)} />
            </div>
        </>
    );
};

export default WithConsumer(Navbar);