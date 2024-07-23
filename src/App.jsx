import './App.css'
import SearchIcon from "./search.png"
import clearIcon from "./clear.png"
import cloudIcon from "./cloud.png"
import drizzleIcon from "./drizzle.png"
import rainIcon from "./rain.png"
import windIcon from "./wind.png"
import snowIcon from "./snow.png"
import humidityIcon from "./humidity.png"
import { useEffect, useState } from 'react'



const WeatherDetails=({icon,temp,city,country,lat,long,humidity,wind})=>
{
  return(
    <>
    
    <div className='image'><img src={icon} alt="Weather_Image" /></div>
    <div className="temp">{temp}°C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="coor">
    <div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='long'>longtitude</span>
      <span>{long}</span>
    </div>
    </div>

    <div className="data-container">

      <div className="element">
        <img className='humidity-icon' src={humidityIcon} alt="" />
        <div className="humidity-data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">humidity</div>
        </div>
      </div>

      <div className="element">
        <img className='wind-icon' src={windIcon} alt="" />
        <div className="wind-data">
          <div className="wind-speed">{wind}km/hr</div>
          <div className="text">Wind</div>
        </div>
      </div>

    </div>

    </>
  )
};




function App() {
  const [text,setText]=useState("chennai")
  const[icon,setIcon]=useState(clearIcon)
  const[temp,setTemp]=useState(0)
  const[city,setCity]=useState()
  const[country,setCountry]=useState()
  const[lat,setLat]=useState(0)
  const[long,setLong]=useState(0)
  const[humidity,setHumidity]=useState(0)
  const[wind,setWind]=useState(0)
  const[cityNotFound,setCityNotFound]=useState(false)
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState(null)
  let api_key="88f2084ea6f38543b9a43fae93ec39b1"




  const weatherIconMap=
  {
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon,
  }
  
  const search=async()=>
    {
      setLoading(true)

      let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

      try 
      {
        let res=await fetch(url);
        let data=await res.json();
        console.log(data);

        if(data.cod==="404")
        {
          console.error("City Not Found")
          setCityNotFound(true)
          setLoading(false)
          return;
        }

        setHumidity(data.main.humidity)
        setCountry(data.sys.country)
        setCity(data.name)
        setWind(data.wind.speed)
        setLat(data.coord.lat)
        setLong(data.coord.lon)
        setTemp(Math.floor(data.main.temp))
        const weatherIconCode=data.weather[0].icon;
        setIcon(weatherIconMap[weatherIconCode] || clearIcon)
        setCityNotFound(false)

      } 
      catch (error) 
      {
        console.error("Oops you got an error :",error.message);
        setError("An error occurred while fetching weather data.")
      }
      finally
      {
        setLoading(false)
      }


    };

    const handleCity=(e)=>
    {
      setText(e.target.value)
    }

    const handleKeydown=(e)=>
    {
      if(e.key=="Enter")
      {
        search();
      }
    }

  
    useEffect(()=>
      {
        search();
        console.log("hello");
      },[])

return (
    <>
      <div className='container'>
          <div className='name'><h1><span className='wea'>Weather</span> App</h1></div>
          <div className='input-container'>
          <input className='cityInput'  type="text" placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeydown}/>
          <div className='SearchIcon' onClick={()=>{search()}}> <img src={SearchIcon} alt="" /></div>
          </div>

        {loading && <div className='loading-message'>loading...</div>}
        {error && <div className='error-message'>{error}</div>}
        {cityNotFound && <div className='city-not-found'>City not found</div>}
       
        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country= {country} lat={lat} long={long} humidity={humidity} wind={wind}/>}
          <p className="copyright">
            Designed by <span>Newton Sky</span> 
          </p>
      </div>
     
    </>
  )
}

export default App
