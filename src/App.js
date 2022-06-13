import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ["Tokyo", "New york", "Paris", "Seoul"];
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false); //로딩스피너

  const getCurrentLocation = () => { //현재위치를 파악하는 함수
    navigator.geolocation.getCurrentPosition((position) => { //현재위치를 알수있는 함수
      let lat = position.coords.latitude; //현재위치의 위도를 lat에 저장
      let lon = position.coords.longitude; //현재 위치의 경도를 lon에 저장한다
      getWeatherByCurrentLocation(lat, lon);//현재 위치의 날씨를 알려주는 함수에 위도,경도 값을 넘겨준다
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    console.log(lat, lon);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bfa6d2f17c6ff51f9cbbc42ef35865f5&units=metric`;
    setLoading(true); //로딩스피너가 true다? => 데이터를 받아오고 있는 중이다.
    let response = await fetch(url);
    let data = await response.json();
    console.log("data?", data);
    setWeather(data);
    setLoading(false); //로딩스피너가 false다? => 데이터를 받아왔다.
  };

  const getWeatherByCity = async () => { //city버튼을 클릭했을때 나오는 함수
    console.log("city", city);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bfa6d2f17c6ff51f9cbbc42ef35865f5&units=metric`; //url에 city값을 붙여주면 city의 데이터를 받아올수있다.
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log("data?", data);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    if (city == "") { //city값이 없으면? => 현재날씨를 불러온다.
      getCurrentLocation();
    } else { //city값이 있으면? => 클릭한 도시의 날씨를 불러온다.
      getWeatherByCity();
    }
  }, [city]); //city값이 있는지 없는지를 주시하기 위해 city값을 배열에 넣어준다.
  
  return (
    <div>
      {loading ? (
        <div className="box">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : (
        <div className="box">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} setCity={setCity} city={city} getCurrentLocation={getCurrentLocation}/>
        </div>
      )}
    </div>
  );
}

export default App;
