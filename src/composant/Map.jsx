import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';


import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiSprinkle,
  WiThermometer,
  WiHumidity,
  WiStrongWind
} from "react-icons/wi";


import 'leaflet/dist/leaflet.css';
import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// ✅ Corrige les chemins des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function FlyTo({ pos }) {
  const map = useMap();
  useEffect(() => {
    if (pos) map.flyTo(pos, 9);
  }, [pos]);
  return null;
}
function WeatherIcon({ weather }) {
  switch(weather) {
    case "Clear":      return <WiDaySunny className="text-5xl text-yellow-400" />;
    case "Clouds":     return <WiCloud className="text-5xl text-gray-300" />;
    case "Rain":       return <WiRain className="text-5xl text-blue-400" />;
    case "Thunderstorm": return <WiThunderstorm className="text-5xl text-yellow-500" />;
    case "Snow":       return <WiSnow className="text-5xl text-cyan-200" />;
    case "Drizzle":    return <WiSprinkle className="text-5xl text-blue-300" />;
    default:           return <WiDaySunny className="text-5xl text-yellow-400" />;
  }
}

function ClickMarker() {

  const [position, setPosition] = useState(null);
  const [donne, setDonne] = useState(null);
  const markerRef = useRef(null);


  useEffect(() => {

  if (markerRef.current) {
    markerRef.current.openPopup();
  }

}, [position]);

  

  useMapEvents({

    click(e) {

      setPosition([
        e.latlng.lat,
        e.latlng.lng
      ]);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&units=metric&lang=fr&appid=${import.meta.env.VITE_API_KEY2}`
      )
        .then(response => response.json())
        .then(data => setDonne(data));

    }

  });

  return position && donne ? (

    <Marker position={position} ref={markerRef}>

        <Popup autopanPadding={[10, 10]}>

          <div className="bg-slate-900 text-white p-4 rounded-xl min-w-[220px]">

            <div className="flex items-center gap-3">

              <WeatherIcon weather={donne.weather[0].main} />

              <div>

                <p className="text-xl font-bold">
                  {donne.name}
                </p>

                <p>
                  {donne.weather[0].description}
                </p>

              </div>

            </div>

            <div className="space-y-2">

              <div className="flex items-center gap-2">
                <WiThermometer className="text-3xl text-red-400" />

                <p>
                  {donne.main.temp} °C
                </p>
              </div>

              <div className="flex items-center gap-2">
                <WiHumidity className="text-3xl text-blue-400" />

                <p>
                  {donne.main.humidity} %
                </p>
              </div>

              <div className="flex items-center gap-2">
                <WiStrongWind className="text-3xl text-gray-300" />

                <p>
                  {donne.wind.speed} m/s
                </p>
              </div>

            </div>

          </div>

        </Popup>

    </Marker>

  ) : null;
}
function Map({ pos ,data}) {
  const [positionDfault, setPositionDefault] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPositionDefault([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      alert("Geolocation is not supported");
    }
  }, []);


  if (positionDfault.length === 0 && !pos) return <p>Chargement...</p>;

  return (
    <MapContainer
      center={pos ?? positionDfault}
      zoom={9}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyTo pos={pos ?? positionDfault} />

     {data && pos && (
      <Marker position={pos}>
        <Popup>
          <div className="bg-slate-900 text-white p-4 rounded-xl min-w-[220px]">
            <div className="flex items-center gap-3">
              <WeatherIcon weather={data.weather[0].main} />
              <div>
                <p className="text-xl font-bold">{data.name}</p>         {/* ✅ data.name */}
                <p>{data.weather[0].description}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <WiThermometer className="text-3xl text-red-400" />
                <p>{data.main.temp} °C</p>
              </div>
              <div className="flex items-center gap-2">
                <WiHumidity className="text-3xl text-blue-400" />
                <p>{data.main.humidity} %</p>
              </div>
              <div className="flex items-center gap-2">
                <WiStrongWind className="text-3xl text-gray-300" />
                <p>{data.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
    )}
      <ClickMarker />
    </MapContainer>
  );
}
export default Map;