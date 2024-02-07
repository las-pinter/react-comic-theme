import React from 'react'
import { Link } from 'react-router-dom';

import WithConsumer from '../../context/WithConsumer';

import './index.css';

const Footer = ({ context }) => {
    let menuList = []

    if (context.menus['top']) {
        menuList = context.menus['top'];
    }

    return (
        <footer className="container-vertical">
            <div className="container-horizontal">
                <div className="navigation-bottom">
                    <h2>Navigation</h2>
                    <ul className="container-vertical">
                        {
                            menuList.map(function (item, i) {

                                let childItems = item.children.map(function(childItem, j) {
                                    return (
                                        <li
                                            key={'footer-menu-item-' + childItem.ID}
                                            className="footer-menu-item"
                                        >
                                            <Link to={childItem.url} >
                                                {childItem.title}
                                            </Link>
                                        </li>
                                    )
                                });

                                return (
                                    <li
                                        key={'footer-menu-item-' + item.ID}
                                        className="footer-menu-item"
                                    >
                                        <Link to={item.url} >
                                            {item.title}
                                        </Link>
                                        <ul>
                                            { childItems }
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="social-media"></div>
                <div className="related"></div>
            </div>
            <div className="copyright"></div>
        </footer>
    );
}

export default WithConsumer(Footer);