"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Styles from "./payment.module.css";

type PaymentProps = {
  speciality: string;
  doctor: string;
  doctorId: string;
  day: string;
  hour: string; // ejemplo: 2025-11-22T16:00:00.000Z
  cost: number;
  onNext: () => void;
};

const Payment = ({ speciality, doctor, doctorId, day, hour, cost, onNext }: PaymentProps) => {
  const [agreed, setAgreed] = useState(false);
  const [paid, setPaid] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    const body = {
      id_contrato: doctorId,
      fecha_cita: hour 
    };

    console.log("Enviando datos al backend:", body);

    try {
      const response = await fetch("http://localhost:5000/citas/agendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Respuesta:", data);

      if (response.ok) {
        setPaid(true);
      } else {
        alert("Error al registrar cita");
      }
    } catch (error) {
      console.error("Error en el pago:", error);
    }
  };

  return (
    <div className={Styles.container}>
      {!paid && (
        <>
          <h2>Datos de la cita</h2>

          <p>Especialidad: {speciality}</p>
          <p>Doctor: {doctor}</p>
          <p>Día {day} a las {hour}</p>
          <p>Verifique que los datos sean correctos</p>

          <button onClick={() => setAgreed(true)} disabled={agreed}>
            Estoy de acuerdo
          </button>

          {agreed && (
            <>
              <p>Precio: ${cost} MXN</p>
              <button onClick={handlePayment}>
                Pagar
              </button>
            </>
          )}
        </>
      )}

      {paid && (
        <>
          <p>Pago realizado con éxito</p>
          <button onClick={() => router.push("/Patient/home")}>
            Ir a citas próximas
          </button>
        </>
      )}
    </div>
  );
};

export default Payment;