import TableButton from "../../TableButton/tableButton";
import styles from "./speciality.module.css";
import * as Icons from "../../Icons/Icons";

interface Props {
  onNext: (value: string) => void;
}

const Speciality = ({ onNext }: Props) => {
  const handleSelect = (value: string) => {
    onNext(value);   // pasar valor al DateProcess
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.cell}>
              <TableButton text="Cardiología" onClick={() => handleSelect("Cardiología")}>
                <Icons.CardiologyIcon/>
              </TableButton>
            </td>
            <td className={styles.cell}>
              <TableButton text="Dermatología" onClick={() => handleSelect("Dermatología")}>
                <Icons.DermatologyIcon/>
              </TableButton>
            </td>
            <td className={styles.cell}>
              <TableButton text="Ginecología" onClick={() => handleSelect("Ginecología")}>
                <Icons.GynecologyIcon/>
              </TableButton>
            </td>
            <td className={styles.cell}>
              <TableButton text="Medicina General" onClick={() => handleSelect("Medicina General")}>
                <Icons.GeneralMedicineIcon/>
              </TableButton>
            </td>
          </tr>

          <tr>
            <td className={styles.cell}>
              <TableButton text="Nefrología" onClick={() => handleSelect("Nefrología")}>
                <Icons.NephrologyIcon/>
              </TableButton>
            </td>
            <td className={styles.cell}>
              <TableButton text="Nutriología" onClick={() => handleSelect("Nutriología")}>
                <Icons.NutritionIcon/>
              </TableButton>
            </td>
            <td className={styles.cell}>
              <TableButton text="Oftalmología" onClick={() => handleSelect("Oftalmología")}>
                <Icons.OphthalmologyIcon/>
              </TableButton>
            </td>
            <td className={styles.cell}>
              <TableButton text="Oncología" onClick={() => handleSelect("Oncología")}>
                <Icons.OncologyIcon/>
              </TableButton>
            </td>
          </tr>

          <tr>
            <td className={styles.cell}>
              <TableButton text="Ortopedia" onClick={() => handleSelect("Ortopedia")}>
                <Icons.OrthopedicsIcon/>
              </TableButton>
            </td>
            <td className={styles.cell}>
              <TableButton text="Pediatría" onClick={() => handleSelect("Pediatría")}>
                <Icons.PediatricsIcon/>
              </TableButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Speciality;