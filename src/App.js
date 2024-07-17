import "./App.css";
import React, { useEffect } from "react";
import useGeolocation from "./useGeolocateApp";

export default function App() {
  const [isLoading, position, error, getPosition, lat, lng, countClicks] =
    useGeolocation();
  useEffect(
    function () {
      let isMounted = true;

      if (lat && lng) {
        async function getGPS() {
          try {
            const res = await fetch(
              `https://www.openstreetmap.org/#map=16/${lat}/${lng}`
            );

            const data = await res.json();
            if (isMounted) {
              console.log(data);
            }
          } catch (error) {
            console.log(error.message);
          }
        }
        getGPS();
      }

      return () => {
        isMounted = false;
      };
    },
    [lat, lng, position]
  );

  return (
    <div>
      <button onClick={getPosition} disabled={isLoading}>
        Get my position
      </button>
      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}
      {/*//If i do this: useEffect(function(){}, []), it might help*/}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
