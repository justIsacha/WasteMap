import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default icon paths for bundlers (Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function ClickHandler({ setSelectedLocation }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setSelectedLocation({ latitude: lat, longitude: lng });
    },
  });
  return null;
}

export default function Map({ selectedLocation, setSelectedLocation, center }) {
  const defaultCenter = center || [-1.2921, 36.8219]; // Nairobi

  useEffect(() => {
    // placeholder for future map effects
  }, []);

  return (
    <div className="w-full h-64 rounded overflow-hidden">
      <MapContainer center={defaultCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler setSelectedLocation={setSelectedLocation} />
        {selectedLocation && (
          <Marker position={[selectedLocation.latitude, selectedLocation.longitude]} />
        )}
      </MapContainer>
    </div>
  );
}