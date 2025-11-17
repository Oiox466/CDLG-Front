"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ⚡ CORRECTO para App Router
import Styles from "./payment.module.css";

type PaymentProps = {
    speciality: string;
    doctor: string;
    day: string;
    hour: string;
    onNext: () => void;
};

const Payment = ({ speciality, doctor, day, hour, onNext }: PaymentProps) => {
    const [agreed, setAgreed] = useState(false);
    const [paid, setPaid] = useState(false);
    const router = useRouter(); // ✅ ahora funciona en App Router

    return (
        <div className={Styles.container}>
            {!paid && (
                <>
                    <h2>Datos de la cita</h2>

                    <p>Especialidad: {speciality}</p>
                    <p>Doctor: {doctor}</p>
                    <p>Día {day} a las {hour}</p>
                    <p>Verifique que están bien los datos</p>

                    <button
                        onClick={() => setAgreed(true)}
                        disabled={agreed}
                    >
                        Estoy de acuerdo
                    </button>

                    {agreed && (
                        <>
                            <p>Precio $600 MXN</p>
                            <button
                                onClick={() => {
                                    setPaid(true);
                                }}
                            >
                                Pagar
                            </button>
                        </>
                    )}
                </>
            )}

            {paid && (
                <>
                    <p>imagen</p>
                    <p>Se ha realizado el pago, ya puede checar en citas próximas</p>
                    <button onClick={()=>{router.push("/Patient/home");}}>Ir a citas pendientes</button>
                </>
            )}
        </div>
    );
};

export default Payment;
