import video from '../Data/video.mp4'
import { Col, Row } from "react-bootstrap";
import DettagliSettimana from "./DettagliSettimana";
import { useNavigate } from 'react-router-dom';
import '../Home.css';

const MyHome = () => {
    const navigate = useNavigate();
    const handleClick = (city) => {
        navigate("/DettaglioMeteo/" + city);
    };

    return (
        <div>  
            <video className="video" src={video} autoPlay loop muted />
            <div className="content">
                <h1 className="benvenuto text-center">Benvenuto in MeteoPower, il TUO meteo, sempre. </h1>
                <Row className="justify-content-center pos">
                    <Col xs={4} className="my-card-custom m-3 d-flex flex-column align-items-center justify-content-around my-animation-card" onClick={() => handleClick("Roma")}>
                        <h2 className="">Roma</h2>
                        <DettagliSettimana latitudine="41.89193" longitudine="12.51133" dayShow={1} />
                    </Col>
                    <Col xs={4} className="my-card-custom m-3 d-flex flex-column align-items-center justify-content-around my-animation-card" onClick={() => handleClick("NewYork")}>
                        <h2 className="">New York</h2>
                        <DettagliSettimana latitudine="56.25" longitudine="-5.28333" dayShow={1} />
                    </Col>
                </Row>
                <Row className="justify-content-center pos">
                    <Col xs={4} className="my-card-custom m-3 d-flex flex-column align-items-center justify-content-around my-animation-card" onClick={() => handleClick("Tokyo")}>
                        <h2 className="">Tokyo</h2>
                        <DettagliSettimana latitudine="35.6895" longitudine="139.69171" dayShow={1} />
                    </Col>
                    <Col xs={4} className="my-card-custom m-3 d-flex flex-column align-items-center justify-content-around my-animation-card" onClick={() => handleClick("Londra")}>
                        <h2 className="">Londra</h2>
                        <DettagliSettimana latitudine="51.50853" longitudine="-0.12574" dayShow={1} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default MyHome;
