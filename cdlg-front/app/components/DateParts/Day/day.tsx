const Day = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="container">
        <table>
            <tbody>
            <tr>
                <td><button onClick={onNext}>Lunes</button></td>
                <td><button onClick={onNext}>Martes</button></td>
                <td><button onClick={onNext}>Miércoles</button></td>
                <td><button onClick={onNext}>Jueves</button></td>
            </tr>
            <tr>
                <td><button onClick={onNext}>Viernes</button></td>
                <td><button onClick={onNext}>Sábado</button></td>
                <td><button onClick={onNext}>Domingo</button></td>
            </tr>
            </tbody>
        </table>
        </div>
    );
};

export default Day;
