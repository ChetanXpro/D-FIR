import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const FIRMap = ({ firLocations }: any) => {
  // Default position can be the center of the area you want to display
  const defaultPosition = [51.505, -0.09]; // Replace with the desired coordinates

  return (
    <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {firLocations.map((location: any, idx: any) => (
        <Marker key={idx} position={location.coordinates}>
          <Popup>
            FIR #{location.id}
            <br />
            {location.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default FIRMap;
