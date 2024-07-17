import { useState } from "react";

export default function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const [countClicks, setCountClicks] = useState(0);

  const { lat, lng } = position;

  function getPosition() {
    setCountClicks((count) => count + 1);

    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");
  }

  setIsLoading(true);
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      setIsLoading(false);
    },
    (error) => {
      setError(error.message);
      setIsLoading(false);
    }
  );
  return [isLoading, position, error, getPosition, lat, lng, countClicks];
}
