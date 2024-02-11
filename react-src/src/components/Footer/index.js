import React from 'react'
import { Link } from 'react-router-dom';

import WithConsumer from '../../wrappers/WithConsumer';

import './index.css';

const Footer = ({ context }) => {
    let menuList = []

    if (context.menus['top']) {
        menuList = context.menus['top'];
    }

    return (
        <footer className="container-vertical">
            <div className="footer-link-collection container-horizontal">
                <div className="navigation-bottom">
                    <h2>Navigation</h2>
                    <div className="container-vertical">
                        {
                            menuList.map(function (item, i) {

                                let childItems = item.children.map(function (childItem, j) {
                                    return (
                                        <div
                                            key={'footer-menu-item-' + childItem.ID}
                                            className="footer-menu-item"
                                        >
                                            <Link to={childItem.url} >
                                                {childItem.title}
                                            </Link>
                                        </div>
                                    )
                                });

                                return (
                                    <div
                                        key={'footer-menu-item-' + item.ID}
                                        className="footer-menu-item"
                                    >
                                        <Link to={item.url} >
                                            {item.title}
                                        </Link>
                                        <div className="footer-sub-menu container-vertical">
                                            {childItems}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="social-media">
                    <h2>Social Media</h2>
                </div>
                <div className="related">
                    <h2>Related</h2>
                </div>
            </div>
            <div className="copyright"></div>
        </footer>
    );
}

export default WithConsumer(Footer);