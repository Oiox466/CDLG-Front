"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import correcto en App Router
import styles from "./navBar.module.css";
import Image from "next/image";
import Link from "next/link";
import NavMenu from "../NavMenu/navMenu";
import TableButton from "../TableButton/tableButton";

interface NavBarProps {
    links?: { label: string; href: string }[];
    opaque?: boolean;
}

const NavBar = ({ links = [], opaque = false }: NavBarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter(); // ⚡ usar next/navigation en App Router

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <nav className={`${styles.navbar} ${opaque ? styles.opaque : styles.translucent}`}>
                <div className={styles.logo}>
                    <Image src="/icon.svg" alt="icon" width={40} height={40} />
                </div>

                <div className={styles.rightSide}>
                    <div className={styles.linksContainer}>
                        {links.map((link, index) => (
                            <Link key={index} href={link.href} className={styles.navLink}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <button className={styles.menuButton} onClick={toggleMenu}>
                        <Image src="/NavBarShowMenu.svg" alt="=" width={20} height={20}></Image>
                    </button>
                </div>
            </nav>

            {/* {menuOpen && (
                <NavMenu
                    buttons={
                        <>
                            <TableButton text="Inicio" onClick={() => router.push("/Patient/home")} />
                            <TableButton text="Agendar Cita Nueva" onClick={() => router.push("/Patient/dates")} />
                        </>
                    }
                />
            )} */}
        </>
    );
};

export default NavBar;
