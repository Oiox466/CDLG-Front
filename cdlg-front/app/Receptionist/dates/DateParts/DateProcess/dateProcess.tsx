"use client";

import { useState } from "react";
import Speciality from "../Speciality/speciality";
import Doctors from "../Doctors/doctors";
import Day from "../Day/day";
import Hour from "../Hour/hour";
import Payment from "../Payment/payment";

interface SelectedSpeciality {
  id: number;
  name: string;
  cost: number;
}

interface SelectedDoctor {
  id_contrato: string;
  nombre: string;
  id_consultorio: number;
  no_consultorio: number;
}

interface DateProcessProps {
  onStepChange?: (step: number) => void;
  nss: string | null; // ⚡ Recibimos el NSS del paciente
}

const DateProcess = ({ onStepChange, nss }: DateProcessProps) => {
  const [step, setStep] = useState(0);

  const [speciality, setSpeciality] = useState<SelectedSpeciality | null>(null);
  const [doctor, setDoctor] = useState<SelectedDoctor | null>(null);
  const [day, setDay] = useState<{ fecha: string; total_horas: number } | null>(null);
  const [hour, setHour] = useState<string | null>(null);

  const nextStep = () => {
    setStep((prev) => prev + 1);
    if (onStepChange) onStepChange(step + 1);
  };

  return (
    <div>
      {/* ===== PASO 0: ESPECIALIDAD ===== */}
      {step === 0 && (
        <Speciality
          onNext={(value) => {
            setSpeciality(value);
            nextStep();
          }}
        />
      )}

      {/* ===== PASO 1: DOCTOR ===== */}
      {step === 1 && speciality && (
        <Doctors
          specialityId={speciality.id}
          onNext={(value) => {
            setDoctor(value);
            nextStep();
          }}
        />
      )}

      {/* ===== PASO 2: DÍA ===== */}
      {step === 2 && doctor && speciality && (
        <Day
          idContrato={doctor.id_contrato}
          idEspecialidad={speciality.id}
          no_consultorio={doctor.no_consultorio}
          onNext={(value) => {
            setDay(value);
            nextStep();
          }}
        />
      )}

      {/* ===== PASO 3: HORA ===== */}
      {step === 3 && doctor && day && (
        <Hour
          doctorId={doctor.id_contrato}
          fecha={day.fecha}
          no_consultorio={doctor.no_consultorio}
          onNext={(value) => {
            setHour(value);
            nextStep();
          }}
        />
      )}

      {/* ===== PASO 4: PAGO ===== */}
      {step === 4 && speciality && doctor && day && hour && nss && (
        <Payment
          speciality={speciality.name}
          cost={speciality.cost}
          doctor={doctor.nombre}
          doctorId={doctor.id_contrato}
          no_consultorio={doctor.no_consultorio}
          day={day.fecha}
          hour={hour}
          nss={nss}  // ⚡ Pasamos NSS al Payment
          onNext={nextStep} 
        />
      )}
    </div>
  );
};

export default DateProcess;
