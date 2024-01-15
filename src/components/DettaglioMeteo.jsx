import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DettagliSettimana from "./DettagliSettimana";
import DetailsDay from "./DetailsDay";
import HeroToday from "./HeroToday";
import DettagliOre from "./DettagliOre";
import ErrorSearch from "./ErrorSearch";
import MySpinner from "./Spinner";

const DettaglioMeteo = (props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [oggi, setOggi] = useState({});
  const [location, setLocation] = useState(null);
  const [showError, setShowError] = useState(false);
  
  const params = useParams();

  const getNewToday = (today) => {
    setOggi(today);
  };

  useEffect(() => {
    const fetchCoordinate = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${params.city}&count=3&language=it&format=json`
        );
        const resultsList = response.data.results;
        setResults(resultsList);
      } catch (error) {
        setError(error.message);
        setShowError(true);
      } finally {
        setIsLoading(false);
      }
    };

   
    if (params.city) {
      fetchCoordinate();
      setLocation(params.city);
    }

    
    
  }, [params.city]);

  const latitude = results && results.length > 0 ? results[0].latitude : null;
  const longitude = results && results.length > 0 ? results[0].longitude : null;

  return (
    <>
      {latitude && longitude ? (
        <>
          <HeroToday today={oggi} city={location} />
          <DettagliOre latitudine={latitude} longitudine={longitude} />
          <DettagliSettimana latitudine={latitude} longitudine={longitude} dayShow={6} />
          <DetailsDay latitudine={latitude} longitudine={longitude} getNewToday={getNewToday} />
        </>
      ) : (
        <>
          {isLoading && <MySpinner />}
          {showError && error ? (
            <h2 className="d-flex justify-content-center text-dark">Errore: {error}</h2>
          ) : (
            <ErrorSearch imageUrl="https://cdni.iconscout.com/illustration/premium/thumb/no-search-found-2511608-2133696.png" altText="Testo alternativo" />
          )}
        </>
      )}
    </>
  );
};

export default DettaglioMeteo;
