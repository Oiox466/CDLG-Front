"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./navBar.module.css";
import Image from "next/image";
import Link from "next/link";
import NavMenu from "../NavMenu/navMenu";
import TableButton from "../TableButton/tableButton";
import Cookies from "js-cookie";

interface NavBarProps {
    links?: { label: string; href: string }[];
    opaque?: boolean;
    role?: "patient" | "doctor" | "receptionist"; // 👈 nueva prop
}

const NavBar = ({ links = [], opaque = false, role = "patient" }: NavBarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        Cookies.remove("token");
        router.push("/Patient/login");
    };

    const renderMenuButtons = () => {
        if (role === "doctor") {
            return (
                <>
                    <TableButton text="Inicio" onClick={() => router.push("/Doctor/homeDoctor")} />
                    <TableButton text="Mis Recetas" onClick={() => router.push("/Doctor/prescription")} />
                    <TableButton text="Cerrar sesión" onClick={handleLogout} />
                </>
            );
        }

        if (role === "receptionist") {
            return (
                <>
                    <TableButton text="Inicio" onClick={() => router.push("/Receptionist/home")} />
                    <TableButton text="Registrar Empleado" onClick={() => router.push("/Receptionist/registerEmployee")} />
                    <TableButton text="Citas del Día" onClick={() => router.push("/Receptionist/today")} />
                    <TableButton text="Pacientes" onClick={() => router.push("/Receptionist/patients")} />
                    <TableButton text="Cerrar sesión" onClick={handleLogout} />
                </>
            );
        }

        // 👇 Default: paciente (como estaba antes)
        return (
            <>
                <TableButton text="Inicio" onClick={() => router.push("/Patient/home")} />
                <TableButton text="Agendar Cita Nueva" onClick={() => router.push("/Patient/dates")} />
                <TableButton text="Perfil" onClick={() => router.push("/Patient/profile")} />
                <TableButton text="Cerrar sesión" onClick={handleLogout} />
            </>
        );
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
                        <Image src="/NavBarShowMenu.svg" alt="=" width={20} height={20} />
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <NavMenu
                    buttons={renderMenuButtons()}
                />
            )}
        </>
    );
};

export default NavBar;
