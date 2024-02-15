import { FaBars } from "react-icons/fa";

import { TMenu } from "../../context/Context";
import WithConsumer, { IConsumerProps } from '../../wrappers/WithConsumer';
import MenuItem from "./MenuItem";

import './index.css';

const Navbar = ({ ctxState }: IConsumerProps): JSX.Element => {
    let menuList: TMenu = []

    if (ctxState.menus['top']) {
        menuList = ctxState.menus['top'];
    }

    return (
        <nav className="navbar container-horizontal">
            <FaBars className="navigation-bar-bars" />

            <div className="menu container-horizontal">
                {
                    menuList.map(function (item, i) {
                        return <MenuItem key={'menu-item-' + item.ID} item={item} />
                    })
                }
            </div>
        </nav>
    );
};

export default WithConsumer(Navbar);