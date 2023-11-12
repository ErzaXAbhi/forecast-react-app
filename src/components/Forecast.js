import React, { useEffect, useState } from "react";

const Forecast = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Palghar");
  const [timezone, setTimezone] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=36bdb9ae258130a7c22217a14c08dd2e`;

      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main);
      setTimezone(resJson.timezone);
    };

    fetchApi();
  }, [search]);

  // Function to convert timezone to 24-hour format
  const convertTo24HourFormat = (timezone) => {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const utcTime = date.getTime() + offset * 60000;
    const localTime = utcTime + timezone * 1000;
    const localDate = new Date(localTime);

    return localDate.toLocaleTimeString("en-US", { hour12: false });
  };

  // Function to format the current date
  const getCurrentDate = () => {
    const date = new Date();
    return date.toDateString();
  };

  return (
    <>
      <div className="container">
        <form className="inputData d-flex py-5 position-absolute top-0 start-50 translate-middle-x">
          <input
            className="inputField form-control me-2"
            type="search"
            value={search}
            placeholder="Search"
            aria-label="Search"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </form>
        {!city ? (
          <p className="errorMsg">No Data Found</p>
        ) : (
          <div className="info">
            <h1 className="location">
              <i className="fa-solid fa-earth-asia"></i> {search}
            </h1>
            <h2 className="temp">
              <i className="fa-solid fa-temperature-three-quarters"></i>
              {city.temp}°Cel
            </h2>
            <h3 className="tempmin_max">
              Min : {city.temp_min}°Cel | Max : {city.temp_max}°Cel
            </h3>
            <h4 className="timezone">
              Time: {convertTo24HourFormat(timezone)}
            </h4>
            <h5 className="currentDate">Date: {getCurrentDate()}</h5>
          </div>
        )}
      </div>
    </>
  );
};

export default Forecast;
