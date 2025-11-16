"use client";

import React from "react";
import Styles from "./navMenu.module.css";

interface NavMenuProps {
    buttons: React.ReactNode;
}

const NavMenu:React.FC<NavMenuProps> = ({buttons}) => {
    return (
        <div className={Styles.container}>
            {buttons}
        </div>
    );
};

export default NavMenu;