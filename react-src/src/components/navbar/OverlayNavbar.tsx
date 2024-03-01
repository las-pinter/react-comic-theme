import './index.css';

import { Dispatch, SetStateAction, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";

import { TMenu } from "../../context/Context";
import { MenuItemNoDropdown, MenuItemSocial } from "./MenuItem";

interface IFloatingNavbarProps {
    menuList: TMenu,
    menuListSocial: TMenu,
    show: boolean,
    visibilityCallback: Dispatch<SetStateAction<boolean>>
}

const OverlayNavbar = ({ menuList, menuListSocial, show, visibilityCallback }: IFloatingNavbarProps): JSX.Element => {
    const nodeRef = useRef<any>(null);

    return (
        <CSSTransition
            classNames="fader"
            timeout={10000}
            addEndListener={(done: () => void) => {
                nodeRef.current?.addEventListener("transitionend", done, false);
            }}
            nodeRef={nodeRef}
            mountOnEnter={true}
            unmountOnExit={true}
            appear={true}
            in={show}
        >
            <div ref={nodeRef} className="overlay-navbar container-vertical">
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
                <div className="overlay-navbar-social container-horizontal">
                    {
                        menuListSocial.map(function (item, i) {
                            return <MenuItemSocial key={'menu-item-social' + item.ID} item={item} displayText={false} />
                        })
                    }
                </div>
            </div>
        </CSSTransition>
    );
};

export default OverlayNavbar;