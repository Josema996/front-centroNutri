import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const GoogleMaps = () => {
  const center = [-26.815892, -65.217953];
  const zoom = 13;

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '450px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>
          <div>
            <h3>Tu Centro Nutricional</h3>
            <p>Santiago del Estero 147, San Miguel de Tucumán, Argentina</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default GoogleMaps;