const Hour = ({ onNext }: { onNext: () => void }) => {
    return (
        <div className="container">
        <table>
            <tbody>
            <tr>
                <td><button onClick={onNext}>9:00 AM</button></td>
                <td><button onClick={onNext}>10:00 AM</button></td>
                <td><button onClick={onNext}>11:00 AM</button></td>
                <td><button onClick={onNext}>12:00 PM</button></td>
            </tr>
            <tr>
                <td><button onClick={onNext}>1:00 PM</button></td>
                <td><button onClick={onNext}>2:00 PM</button></td>
                <td><button onClick={onNext}>3:00 PM</button></td>
                <td><button onClick={onNext}>4:00 PM</button></td>
            </tr>
            </tbody>
        </table>
        </div>
    );
};

export default Hour;
