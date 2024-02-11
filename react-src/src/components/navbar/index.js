import React from "react";
import { FaBars } from "react-icons/fa";

import WithConsumer from '../../wrappers/WithConsumer';

import './index.css';

import MenuItem from "./MenuItem";

const Navbar = ({ context }) => {
    let menuList = []

    if (context.menus['top']) {
        menuList = context.menus['top'];
    }

    return (
        <nav className="navbar container-horizontal">
            <FaBars className="navigation-bar-bars" />

            <div className="menu container-horizontal">
                {
                    menuList.map(function (item, i) {
                        return <MenuItem key={'menu-item-' + item.ID} item={item} />
                    })
                }
            </div>
        </nav>
    );
};

export default WithConsumer(Navbar);