import DateProcess from "../components/DateParts/DateProcess/dateProcess";

const Login = () => {
    return (
        <div className="container">
            <div className="stepsContainer">
                <ul>
                    <li>Especialidad</li>
                    <li>Doctores</li>
                    <li>Fecha</li>
                    <li>Hora</li>
                    <li>Pago</li>
                </ul>
            </div>
            <div className="actionContainer">
                <DateProcess/>
            </div>
        </div>
    );
}

export default Login;