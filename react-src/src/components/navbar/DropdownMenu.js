import React from "react";
import { Link } from "react-router-dom";

import './index.css';

const DropdownMenu = ({ items }) => {    
    return (
        <div className="dropdown-menu">
            <ul className="container-vertical">
                {
                    items.map(function (item, i) {
                        return (
                            <li key={'menu-item-' + item.ID} className="menu-item">
                                <Link to={item.url} >
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default DropdownMenu;