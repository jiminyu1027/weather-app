import React from "react";
/*
날씨를 보여주는 부분
weather값이 있으면? 도시의 이름, 온도, 날씨 상태를 보여준다
*/

const WeatherBox = ({ weather }) => {
  return (
    <div className="weather-box">
      <h4>{weather?.name}</h4>
      <h3>
        {weather?.main.temp}℃ / {weather?.main.temp * 1.8 + 32}℉
      </h3>
      <h5>{weather?.weather[0].description}</h5>
    </div>
  );
};

export default WeatherBox;
