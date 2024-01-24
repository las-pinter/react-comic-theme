import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
 
                <NavMenu>
                    <NavLink to="/" >
                        Home
                    </NavLink>
                    <NavLink to="/page/archives" activestyle="true">
                        Archives
                    </NavLink>
                    <NavLink to="/page/cast" activestyle="true">
                        Cast
                    </NavLink>
                    <NavLink to="/page/about" activestyle="true">
                        About
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;