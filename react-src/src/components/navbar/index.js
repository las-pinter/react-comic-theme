import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import WithConsumer from '../../context/WithConsumer';

import './index.css';

const Navbar = ({ context }) => {
    return (
        <nav className="navbar">
            <FaBars className="navigation-bar-bars" />

            <ul className="container-horizontal">
                {
                    context.menu.map(function (item, i) {
                        return (
                            <li key={'menu-item-' + i} className="menu-item">
                                <Link to={item['path']} >
                                    {item['name']}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    );
};

export default WithConsumer(Navbar);