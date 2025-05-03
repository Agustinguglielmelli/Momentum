
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEffect, useState } from 'react';


// iconos de estilo
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Componente que agrega el buscador al mapa
const SearchControl = ({ setCoords }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
      autoClose: true,
      showMarker: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (result) => {
      const { x: lng, y: lat } = result.location;
      setCoords([lat, lng]);
    });

    return () => map.removeControl(searchControl);
  }, [map, setCoords]);

  return null;
};

// Componente principal
const MapaConBuscador = () => {
  const [coords, setCoords] = useState([-34.6037, -58.3816]); // Obelisco (CABA)

  return (
    <MapContainer center={coords} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='© OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords}>
        <Popup>Ubicación buscada</Popup>
      </Marker>
      <SearchControl setCoords={setCoords} />
    </MapContainer>
  );
};

export default MapaConBuscador;
