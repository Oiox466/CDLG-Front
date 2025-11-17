// "use client";

// import { useState } from "react";
// import Styles from "./day.module.css";
// import Image from "next/image";

// interface DayProps {
//   onNext: (day: number) => void;   // devolver día hacia DateProcess
// }

// const Day = ({ onNext }: DayProps) => {
//   const [date, setDate] = useState(new Date());

//   const month = date.getMonth();
//   const year = date.getFullYear();

//   const firstDay = new Date(year, month, 1).getDay();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   const now = new Date();
//   const limitDate = new Date(now.getTime() + 48 * 60 * 60 * 1000);

//   const goNextMonth = () => setDate(new Date(year, month + 1, 1));
//   const goPrevMonth = () => setDate(new Date(year, month - 1, 1));

//   const daysArray: (number | null)[] = [];

//   for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
//     daysArray.push(null);
//   }

//   for (let i = 1; i <= daysInMonth; i++) {
//     daysArray.push(i);
//   }

//   const rows = [];
//   for (let i = 0; i < daysArray.length; i += 7) {
//     rows.push(daysArray.slice(i, i + 7));
//   }

//   const isDisabled = (day: number | null) => {
//     if (day === null) return true;
//     const dayDate = new Date(year, month, day, 23, 59);
//     return dayDate.getTime() < limitDate.getTime();
//   };

//   return (
//     <div className={Styles.container}>
//       <div className={Styles.header}>
//         <button onClick={goPrevMonth}><Image src="/vector.svg" alt="icon" width={24} height={24}/></button>
//         <button onClick={goNextMonth}><Image src="/vector2.svg" alt="icon" width={24} height={24}/></button>

//         <h2>
//           {date
//             .toLocaleDateString("es-ES", {
//               month: "long",
//               year: "numeric",
//             })
//             .replace(/^\w/, (c) => c.toUpperCase())}
//         </h2>
//       </div>

//       <div className={Styles.tableContainer}>
//         <table className={Styles.table}>
//           <tbody>
//             {rows.map((week, rIndex) => (
//               <tr key={rIndex}>
//                 {week.map((day, cIndex) => (
//                   <td key={cIndex} className={Styles.cell}>
//                     {day !== null ? (
//                       <button
//                         disabled={isDisabled(day)}
//                         onClick={() => onNext(day)}   // ← corregido
//                         className={Styles.dayButton}
//                       >
//                         <span className={Styles.weekday}>
//                           {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][cIndex]}
//                         </span>
//                         <span className={Styles.dayNumber}>{day}</span>
//                       </button>
//                     ) : ""}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Day;

"use client";

import { useState } from "react";
import Styles from "./day.module.css";
import Image from "next/image";

interface DayProps {
  onNext: (dateStr: string) => void;   // ahora devolvemos fecha completa
}

const Day = ({ onNext }: DayProps) => {
  const [date, setDate] = useState(new Date());

  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const now = new Date();
  const limitDate = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const goNextMonth = () => setDate(new Date(year, month + 1, 1));
  const goPrevMonth = () => setDate(new Date(year, month - 1, 1));

  const daysArray: (number | null)[] = [];

  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    daysArray.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const rows = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    rows.push(daysArray.slice(i, i + 7));
  }

  const isDisabled = (day: number | null) => {
    if (day === null) return true;
    const dayDate = new Date(year, month, day, 23, 59);
    return dayDate.getTime() < limitDate.getTime();
  };

  // función para formatear la fecha completa
  const formatFullDate = (day: number) => {
    const selectedDate = new Date(year, month, day);
    return selectedDate.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).replace(/^\w/, (c) => c.toUpperCase()); // primera letra mayúscula
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <button onClick={goPrevMonth}>
          <Image src="/vector.svg" alt="icon" width={24} height={24}/>
        </button>
        <button onClick={goNextMonth}>
          <Image src="/vector2.svg" alt="icon" width={24} height={24}/>
        </button>

        <h2>
          {date
            .toLocaleDateString("es-ES", { month: "long", year: "numeric" })
            .replace(/^\w/, (c) => c.toUpperCase())}
        </h2>
      </div>

      <div className={Styles.tableContainer}>
        <table className={Styles.table}>
          <tbody>
            {rows.map((week, rIndex) => (
              <tr key={rIndex}>
                {week.map((day, cIndex) => (
                  <td key={cIndex} className={Styles.cell}>
                    {day !== null ? (
                      <button
                        disabled={isDisabled(day)}
                        onClick={() => !isDisabled(day) && onNext(formatFullDate(day))}
                        className={Styles.dayButton}
                      >
                        <span className={Styles.weekday}>
                          {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][cIndex]}
                        </span>
                        <span className={Styles.dayNumber}>{day}</span>
                      </button>
                    ) : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Day;