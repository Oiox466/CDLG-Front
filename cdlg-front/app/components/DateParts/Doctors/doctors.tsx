import ImageButton from "../../ImageButton/imageButton";
import styles from "./doctors.module.css";

const Doctors = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.cell}>
              <ImageButton
                text="Dr. García"
                onClick={onNext}
              />
            </td>
            <td className={styles.cell}>
              <ImageButton
                text="Dra. López"
                onClick={onNext}
              />
            </td>
            <td className={styles.cell}>
              <ImageButton
                text="Dr. Hernández"
                onClick={onNext}
              />
            </td>
            <td className={styles.cell}>
              <ImageButton
                text="Dra. Torres"
                onClick={onNext}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;