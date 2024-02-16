import { Dispatch, SetStateAction } from "react";
import { FaBars } from "react-icons/fa";

import { TMenu } from "../../context/Context";
import FadeInOut from "../../effects/FadeInOut";
import { MenuItemNoDropdown } from "./MenuItem";

import './index.css';

interface IFloatingNavbarProps {
    menuList: TMenu,
    show: boolean,
    visibilityCallback: Dispatch<SetStateAction<boolean>>
}

const OverlayNavbar = ({ menuList, show, visibilityCallback }: IFloatingNavbarProps): JSX.Element => {
    return (
        <FadeInOut show={show}>
            <div className="overlay-navbar container-vertical">
                <FaBars
                    className="overlay-navigation-bar-bars"
                    onClick={() => {
                        visibilityCallback(false)
                    }}
                />
                {
                    menuList.map(function (item, i) {
                        return <MenuItemNoDropdown key={'menu-item-' + item.ID} item={item} />
                    })
                }
            </div>
        </FadeInOut>
    );
};

export default OverlayNavbar;