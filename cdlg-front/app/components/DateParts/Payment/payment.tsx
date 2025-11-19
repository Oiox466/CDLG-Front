"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Styles from "./payment.module.css";

type PaymentProps = {
  speciality: string;
  doctor: string;
  day: string;
  hour: string;
  cost: number;
  onNext: () => void;
};

const Payment = ({ speciality, doctor, day, hour, cost, onNext }: PaymentProps) => {
  const [agreed, setAgreed] = useState(false);
  const [paid, setPaid] = useState(false);
  const router = useRouter();

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
              <button onClick={() => setPaid(true)}>
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