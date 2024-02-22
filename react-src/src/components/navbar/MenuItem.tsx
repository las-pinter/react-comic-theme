import './index.css';

import { useState } from "react";
import { Link } from "react-router-dom";

import DropdownMenu from "./DropdownMenu";

import { TMenuItem } from "../../context/Context";
import { UrlIconMap } from '../../Icons';

interface IMenuItemProps {
    item: TMenuItem
}



export const MenuItem = ({ item }: IMenuItemProps): JSX.Element => {
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

export const MenuItemNoDropdown = ({ item }: IMenuItemProps): JSX.Element => {
    return (
        <div className="menu-item-no-dropdown">
            <Link to={item.url} >
                {item.title}
            </Link>
            {
                item.children.length !== 0
                    ?
                    <div className="menu-item-no-dropdown-submenu container-vertical">
                        {
                            item.children.map((item, i) => {
                                return (
                                    <div key={"menu-item-no-dropdown-" + item.title} className="menu-item-no-dropdown">
                                        <Link to={item.url} >
                                            {item.title}
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <></>
            }
        </div>
    )
};

interface IMenuItemSocialProps extends IMenuItemProps {
    displayText: boolean
}

export const MenuItemSocial = ({ item, displayText }: IMenuItemSocialProps): JSX.Element => {
    // @ts-ignore
    let iconElement: JSX.Element = <></>;

    let urls = Object.keys(UrlIconMap);

    for (let i = 0; i < urls.length; i++) {
        const element = urls[i];
        if (item.url.includes(element)) {
            iconElement = UrlIconMap[element];
            break;
        }
    }

    return (
        <div className="menu-item-social">
            <Link to={item.url} >
                {iconElement}
                {
                    displayText
                        ?
                        <span className="menu-item-social-title">
                            {item.title}
                        </span>
                        :
                        <></>
                }

            </Link>
        </div>
    )
};

export default MenuItem;