"use client";

import NavBar from "@/app/components/NavBar/navBar";
import styles from "./home.module.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CardiologyIcon } from "@/app/components/Icons/Icons";
import Cookies from 'js-cookie';
interface Doctor {
    id_doctor: number;
    nombre_completo: string;
    especialidad: string;
}

interface Consultorio {
    id_consultorio: number;
    no_consultorio: number;
}

interface Cita {
    folio_cita: string;
    fecha_cita: string;
    estatus: string;
    estatus_texto: string;
    fecha_creacion: string;
    doctor: Doctor;
    consultorio: Consultorio;
    costo: number;
    puede_cancelar: boolean;
}

interface Paciente {
    no_ss: string;
    numero_seguridad_social: string;
    nombre_completo: string;
}

interface ApiResponse {
    message: string;
    total: number;
    paciente: Paciente;
    citas: Cita[];
}

const Home = () => {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCitas = async () => {
            // const token = Cookies.get("token");
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNiIsIm5vbWJyZV91c3VhcmlvIjoiQ2FybGl0b3NWZWxhIiwidGlwb191c3VhcmlvIjoxLCJpZCI6IjMzOTUwMDAwMTciLCJpYXQiOjE3Njc0MDgzMzksImV4cCI6MTc2NzQxMTkzOX0.LfoRVDZQbcOkDirkaoFPinZAJEEV2sLtB9VIremjYLQ"
            if (!token) {
                alert("Debes iniciar sesión para agendar una cita");
                return;
            }
            try {
                const response = await fetch('http://localhost:5000/citas/misCitas', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization":`Bearer ${token}` 
                    },
                });

                console.log('Status:', response.status);
                console.log('Status Text:', response.statusText);

                if (!response.ok) {
                    const errorData = await response.text();
                    console.error('Error response:', errorData);
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data: ApiResponse = await response.json();
                console.log('Respuesta completa:', data);

                setCitas(data.citas || []);
                setPaciente(data.paciente);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
                console.error('Error completo:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCitas();
    }, []);

    // Función para formatear la fecha
    const formatearFecha = (fechaISO: string) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Función para formatear la hora
    const formatearHora = (fechaISO: string) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleTimeString('es-MX', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    if (loading) {
        return (
            <>
                <NavBar opaque />
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <Image src="/Group_19.svg" alt="icon" width={60} height={60} className={styles.titleIcon} />
                        <h1 className={styles.title}>Citas Pendientes</h1>
                    </div>
                    <p>Cargando citas...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBar opaque />
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <Image src="/Group_19.svg" alt="icon" width={60} height={60} className={styles.titleIcon} />
                        <h1 className={styles.title}>Citas Pendientes</h1>
                    </div>
                    <p style={{ color: 'red' }}>Error: {error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar opaque />

            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <Image src="/Group_19.svg" alt="icon" width={60} height={60} className={styles.titleIcon} />
                    <h1 className={styles.title}>Citas Pendientes</h1>
                </div>

                {paciente && (
                    <div className={styles.pacienteInfo}>
                        <p><strong>Paciente:</strong> {paciente.nombre_completo}</p>
                        <p><strong>NSS:</strong> {paciente.numero_seguridad_social}</p>
                    </div>
                )}

                <div className={styles.homeContainer}>
                    <div className={styles.tableContainer}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Folio</th>
                                    <th>Doctor</th>
                                    <th>Especialidad</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Consultorio</th>
                                    <th>Costo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {citas.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} style={{ textAlign: 'center' }}>
                                            No hay citas pendientes
                                        </td>
                                    </tr>
                                ) : (
                                    citas.map((cita, index) => (
                                        <tr key={cita.folio_cita}>
                                            <td>{cita.folio_cita}</td>
                                            <td>{cita.doctor.nombre_completo}</td>
                                            <td>
                                                <CardiologyIcon color="white" />
                                                <p>{cita.doctor.especialidad}</p>
                                            </td>
                                            <td>{cita.estatus_texto}</td>
                                            <td>{formatearFecha(cita.fecha_cita)}</td>
                                            <td>{formatearHora(cita.fecha_cita)}</td>
                                            <td>{cita.consultorio.no_consultorio}</td>
                                            <td>${cita.costo}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;