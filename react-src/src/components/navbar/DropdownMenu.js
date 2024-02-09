import React from "react";
import { Link } from "react-router-dom";

import './index.css';

const DropdownMenu = ({ items, display }) => {
    return (
        <div
            className="dropdown-menu container-vertical"
            style={{
                display: display ? "flex" : "none"
            }}
        >
            {
                items.map(function (item, i) {
                    return (
                        <div key={'menu-item-' + item.ID} className="menu-item">
                            <Link to={item.url} >
                                {item.title}
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default DropdownMenu;