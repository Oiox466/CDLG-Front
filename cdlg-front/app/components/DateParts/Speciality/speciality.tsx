const Speciality = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="container">
        <table>
            <tbody>
            <tr>
                <td><button onClick={onNext}>Cardiología</button></td>
                <td><button onClick={onNext}>Neurología</button></td>
                <td><button onClick={onNext}>Pediatría</button></td>
                <td><button onClick={onNext}>Dermatología</button></td>
            </tr>
            <tr>
                <td><button onClick={onNext}>Oftalmología</button></td>
                <td><button onClick={onNext}>Oncología</button></td>
                <td><button onClick={onNext}>Endocrinología</button></td>
                <td><button onClick={onNext}>Urología</button></td>
            </tr>
            </tbody>
        </table>
        </div>
    );
};

export default Speciality;
