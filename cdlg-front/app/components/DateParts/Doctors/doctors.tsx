import ImageButton from "../../ImageButton/imageButton";
import styles from "./doctors.module.css";

interface Props {
  speciality: string;           // si necesitas mostrar la especialidad
  onNext: (doctor: string) => void;     // enviar doctor hacia DateProcess
}

const Doctors = ({ speciality, onNext }: Props) => {

  const handleSelect = (name: string) => {
    onNext(name);  // enviar a DateProcess
  };

  return (
    <div className={styles.container}>

      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.cell}>
              <ImageButton
                text="Dr. García"
                onClick={() => handleSelect("Dr. García")}
              />
            </td>

            <td className={styles.cell}>
              <ImageButton
                text="Dra. López"
                onClick={() => handleSelect("Dra. López")}
              />
            </td>

            <td className={styles.cell}>
              <ImageButton
                text="Dr. Hernández"
                onClick={() => handleSelect("Dr. Hernández")}
              />
            </td>

            <td className={styles.cell}>
              <ImageButton
                text="Dra. Torres"
                onClick={() => handleSelect("Dra. Torres")}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;
