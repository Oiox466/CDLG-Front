"use client";
import React, { useState } from "react";
import Doctors from "../Doctors/doctors";
import Speciality from "../Speciality/speciality";
import Day from "../Day/day";
import Hour from "../Hour/hour";
import Payment from "../Payment/payment";

const DateProcess = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));

  return (
    <div className="container">
      {step === 0 && <Speciality onNext={nextStep} />}
      {step === 1 && <Doctors onNext={nextStep} />}
      {step === 2 && <Day onNext={nextStep} />}
      {step === 3 && <Hour onNext={nextStep} />}
      {step === 4 && <Payment />}
    </div>
  );
};

export default DateProcess;
