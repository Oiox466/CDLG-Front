"use client";

import React, { useState } from "react";
import IconButton from "../../IconButton/iconButton";
import Styles from "./payment.module.css"

const Payment = () => {
    const [agreed, setAgreed] = useState(false);
    const [paid, setPaid] = useState(false);

    return (
        <div className="container">
            {!paid && (
                <>
                    <h2>Datos de la cita</h2>
                    <p>Especialidad</p>
                    <p>Doctor</p>
                    <p>Día a las </p>
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
                            <button onClick={() => setPaid(true)}>
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
                    <button>Ir a citas próximas</button>
                </>
            )}
        </div>
    );
};

export default Payment;