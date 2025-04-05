import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapComponent = ({ coordinates }) => {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates.map((position, idx) => (
        <Marker key={`marker-${idx}`} position={position}>
          <Popup>
            Coordinate {idx + 1} <br /> {position.toString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
