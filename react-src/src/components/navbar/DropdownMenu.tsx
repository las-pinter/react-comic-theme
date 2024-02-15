import { Link } from "react-router-dom";

import { TMenuItem } from "../../context/Context";

import './index.css';

interface IDropdownMenuProps {
    items: Array<TMenuItem>,
    display: Boolean
}

const DropdownMenu = ({ items, display }: IDropdownMenuProps): JSX.Element => {
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