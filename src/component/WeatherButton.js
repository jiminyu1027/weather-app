import React from "react";
import { Button } from "react-bootstrap";

/*
여러 도시들은 배열에 넣은 값을 map()함수를 사용하여 뽑아왔다.
*/ 

const WeatherButton = ({ cities, setCity, city, getCurrentLocation }) => {
  return (
    <div className="btn-box">
      <Button variant="info" onClick={getCurrentLocation}>
        Current Location
      </Button>

      {cities.map((item, index) => {
        return (
          <Button
            variant="info"
            key={index}
            onClick={() => setCity(item)}
            className={city == item ? "active" : ""}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};

export default WeatherButton;
