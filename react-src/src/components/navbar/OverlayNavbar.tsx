import './index.css';

import { Dispatch, SetStateAction, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";

import { TMenu } from "../../context/Context";
import { MenuItemNoDropdown } from "./MenuItem";

interface IFloatingNavbarProps {
    menuList: TMenu,
    show: boolean,
    visibilityCallback: Dispatch<SetStateAction<boolean>>
}

const OverlayNavbar = ({ menuList, show, visibilityCallback }: IFloatingNavbarProps): JSX.Element => {
    const nodeRef = useRef<any>(null);

    return (
        <CSSTransition
            classNames="fader"
            addEndListener={(done: () => void) => {
                nodeRef.current?.addEventListener("transitionend", done, false);
            }}
            nodeRef={nodeRef}
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
            </div>
        </CSSTransition>
    );
};

export default OverlayNavbar;