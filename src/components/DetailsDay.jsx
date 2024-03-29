import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from 'react-bootstrap';

const DetailsDay = (props) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);

    const fetchTempo = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${props.latitudine}&longitude=${props.longitudine}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m&daily=apparent_temperature_max,apparent_temperature_min`);
            const resultsData = response.data;
            setResults(resultsData);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const processResults = () => {
        console.log(results);
        const objToday = {
            tempPerc: results.current.apparent_temperature,
            maxtemp: results.daily.apparent_temperature_max[0],
            mintemp: results.daily.apparent_temperature_min[0],
            codeTemp: results.current.weather_code,
        };
        props.getNewToday(objToday);
    };

    useEffect(() => {
        if (props.latitudine && props.longitudine) {
            fetchTempo();
        }
    }, [props.latitudine, props.longitudine]);

    useEffect(() => {
        if (results) {
            processResults();
        }
    }, [results]);

    return (
        <>
            <Row>
                <Col>
                    {isLoading && <p>Caricamento...</p>}
                    {error && <p>Errore: {error}</p>}
                </Col>
            </Row>
            {results && (
                <div>
                    <Row className="justify-content-center text-dark">
                        <Col xs={3} className="my-card-custom m-3 d-flex justify-content-around align-items-center">
                            <h2 className="text-dark">Percepiti</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="black" class="bi bi-thermometer-half text-white" viewBox="0 0 16 16">
                                <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415" />
                                <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1" />
                            </svg>
                            <h3>{results.current.apparent_temperature}&deg;C</h3>
                        </Col>
                        <Col xs={3} className="my-card-custom m-3 d-flex justify-content-around align-items-center">
                            <h2 className="text-dark">Vento</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="black" class="bi bi-wind text-white" viewBox="0 0 16 16">
                                <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                            </svg>
                            <h3>{results.current.wind_speed_10m} km/h</h3>
                        </Col>
                        <Col xs={3} className="my-card-custom m-3 d-flex justify-content-around align-items-center">
                            <h2 className="text-dark">Umidità</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="black" class="bi bi-moisture text-white" viewBox="0 0 16 16">
                                <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
                            </svg>
                            <h3>{results.current.relative_humidity_2m}%</h3>
                        </Col>
                    </Row>

                </div>
            )}
        </>
    );
};

export default DetailsDay;
