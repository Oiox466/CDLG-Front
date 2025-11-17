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

  const [speciality, setSpeciality] = useState("");
  const [doctor, setDoctor] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  useEffect(() => {
    onStepChange(step);
  }, [step, onStepChange]);

  return (
    <div className="container">
      {step === 0 && (
        <Speciality
          onNext={(value: string) => {
            setSpeciality(value);
            nextStep();
          }}
        />
      )}

      {step === 1 && (
        <Doctors
          speciality={speciality}
          onNext={(value: string) => {
            setDoctor(value);
            nextStep();
          }}
        />
      )}

      {step === 2 && (
        <Day
          onNext={(value: string) => {
            setDay(value.toString());
            nextStep();
          }}
        />
      )}

      {step === 3 && (
        <Hour
          doctor={doctor}
          day={day}
          onNext={(value: string) => {
            setHour(value);
            nextStep();
          }}
        />
      )}

      {step === 4 && (
        <Payment
          speciality={speciality}
          doctor={doctor}
          day={day}
          hour={hour}
          onNext={() => console.log("Ir a citas próximas")}
        />
      )}
    </div>
  );
};

export default DateProcess;