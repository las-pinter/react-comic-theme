import React from 'react'
import { Link } from 'react-router-dom';

import WithConsumer from '../../context/WithConsumer';

import './index.css';

const Footer = ({ context }) => {
    return (
        <footer className="container-vertical">
            <div className="container-horizontal">
                <div className="navigation-bottom">
                    <ul className="container-vertical">
                        {
                            context.menu.map(function (item, i) {
                                return (
                                    <li key={'menu-item-' + i} className="footer-menu-item">
                                        <Link to={item['path']} >
                                            {item['name']}
                                        </Link>
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