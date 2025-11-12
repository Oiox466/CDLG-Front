import TableButton from "../../TableButton/tableButton";
import styles from "./speciality.module.css";

const Speciality = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.cell}>
              <TableButton text="Cardiología" onClick={onNext} />
            </td>
            <td className={styles.cell}>
              <TableButton text="Nutriología" onClick={onNext} />
            </td>
            <td className={styles.cell}>
              <TableButton text="Momología" onClick={onNext} />
            </td>
            <td className={styles.cell}>
              <TableButton text="Oncología" onClick={onNext} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Speciality;
