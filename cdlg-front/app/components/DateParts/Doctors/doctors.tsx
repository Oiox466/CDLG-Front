const Doctors = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="container">
        <table>
            <tbody>
            <tr>
                <td><button onClick={onNext}>Dr. García</button></td>
                <td><button onClick={onNext}>Dra. López</button></td>
                <td><button onClick={onNext}>Dr. Hernández</button></td>
                <td><button onClick={onNext}>Dra. Torres</button></td>
            </tr>
            </tbody>
        </table>
        </div>
    );
};

export default Doctors;
