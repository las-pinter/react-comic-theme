import React,
{ useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import WithConsumer from '../../wrappers/WithConsumer';

import './index.css';
import DropdownMenu from "./DropdownMenu";

const Navbar = ({ context }) => {
    const [dropdown, setDropdown] = useState({});

    let menuList = []

    if (context.menus['top']) {
        menuList = context.menus['top'];
    }

    return (
        <nav className="navbar container-horizontal">
            <FaBars className="navigation-bar-bars" />

            <ul className="container-horizontal">
                {
                    menuList.map(function (item, i) {
                        if (item['children'].length === 0) {
                            return (
                                <li
                                    key={'menu-item-' + item['ID']}
                                    className="menu-item"
                                >
                                    <Link to={item['url']} >
                                        {item['title']}
                                    </Link>
                                </li>
                            )
                        } else {
                            return (
                                <li
                                    key={'menu-item-' + item['ID']}
                                    className="menu-item"
                                    onClick={() => setDropdown((prev) => {
                                        let currentState = {};
                                        
                                        if (!prev[item['ID']]) {
                                            currentState[item['ID']] = true;
                                        }

                                        for (const [itemID, prevState] of Object.entries(prev)) {
                                            if (parseInt(itemID) === item['ID']) {
                                                currentState[itemID] = !prevState;
                                                continue;
                                            }
                                            currentState[itemID] = prevState;
                                        }
                                        return currentState;
                                    })}
                                >
                                    <Link to={item['url']} >
                                        {item['title']}
                                    </Link>
                                    {dropdown[item['ID']] && <DropdownMenu items={item['children']} />}
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </nav>
    );
};

export default WithConsumer(Navbar);