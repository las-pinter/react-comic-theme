import React, { useState } from "react";
import { Link } from "react-router-dom";

import DropdownMenu from "./DropdownMenu";

import './index.css';

const MenuItem = ({ item }) => {
    const [dropdown, setDropdown] = useState(false);

    if (item.children.length === 0) {
        return (
            <div className="menu-item">
                <Link to={item.url} >
                    {item.title}
                </Link>
            </div>
        )
    } else {
        return (
            <div
                className="menu-item"
                onClick={() => {
                    setDropdown(prev => {
                        return !prev;
                    })
                }}
            >
                <Link to={item.url}>
                    {item.title}
                </Link>
                <DropdownMenu items={item.children} display={dropdown} />
            </div>
        )
    }
};

export default MenuItem;