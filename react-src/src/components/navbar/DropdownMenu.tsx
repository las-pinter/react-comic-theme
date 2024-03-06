import './index.css';

import { ForwardedRef, forwardRef } from 'react';
import { Link } from "react-router-dom";

import { TMenuItem } from "../../context/Context";

interface IDropdownMenuProps {
    items: Array<TMenuItem>,
    display: Boolean
}

const DropdownMenu = forwardRef(({ items, display }: IDropdownMenuProps, ref: ForwardedRef<any>): JSX.Element => {
    return (
        <div
            ref={ref}
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
});

export default DropdownMenu;