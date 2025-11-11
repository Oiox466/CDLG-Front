import React, { useState } from "react";

const Payment = () => {
    const [paid, setPaid] = useState(false);

    return (
        <div className="container">
        <button onClick={() => setPaid(true)}>
            {paid ? "Pago realizado" : "Pagar"}
        </button>
        </div>
    );
};

export default Payment;
