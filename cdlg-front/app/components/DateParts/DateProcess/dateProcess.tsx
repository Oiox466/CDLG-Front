"use client";

import React, { useState, useEffect } from "react";
import Doctors from "../Doctors/doctors";
import Speciality from "../Speciality/speciality";
import Day from "../Day/day";
import Hour from "../Hour/hour";
import Payment from "../Payment/payment";

interface Props {
  onStepChange: (step: number) => void;
}

const DateProcess: React.FC<Props> = ({ onStepChange }) => {
  const [step, setStep] = useState(0);

  const [speciality, setSpeciality] = useState<{ id: number; name: string; cost: number } | null>(null);
  const [doctor, setDoctor] = useState<{ name: string; id: string } | null>(null);
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));

  useEffect(() => {
    onStepChange(step);
  }, [step, onStepChange]);

  return (
    <div className="container">
      {step === 0 && (
        <Speciality
          onNext={(value) => {
            setSpeciality(value);
            nextStep();
          }}
        />
      )}

      {step === 1 && speciality && (
        <Doctors
          specialityId={speciality.id}
          onNext={(value) => {
            setDoctor(value); // ahora guarda id y nombre
            nextStep();
          }}
        />
      )}

      {step === 2 && doctor && speciality && (
        <Day
          idContrato={doctor.id}
          idEspecialidad={speciality.id}
          onNext={(value) => {
            setDay(value);
            nextStep();
          }}
        />
      )}

      {step === 3 && doctor && speciality && (
        <Hour
          idEspecialidad={speciality.id}
          doctorId={doctor.id}
          day={day}
          onNext={(value) => {
            setHour(value);
            nextStep();
          }}
        />
      )}

      {step === 4 && speciality && doctor && (
        <Payment
          speciality={speciality.name}
          cost={speciality.cost}
          doctor={doctor.name}
          day={day}
          hour={hour}
          onNext={() => console.log("Ir a citas próximas")}
        />
      )}
    </div>
  );
};

export default DateProcess;
