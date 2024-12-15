"use client";
import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { Card } from "@/components/ui/card";

export function Map(data) {
  const env = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapContainerStyle = { width: "100%", height: "350px" };
  // Updated coordinates for Cat Tien National Park
  const center = { lat: 11.4084633, lng: 107.4159107 };
  const [drawMarker, setDrawMarker] = useState(false);
  const [mapType, setMapType] = useState("satellite");

  const toggleMapType = () => {
    setMapType(mapType === "satellite" ? "roadmap" : "satellite");
  };

  const nodeLocations = {
    node_1: { lat: 11.4084633, lng: 107.4159107 },
    node_2: { lat: 11.4094633, lng: 107.4169107 },
    node_3: { lat: 11.4074633, lng: 107.4149107 },
  };

  useEffect(() => {
    setTimeout(() => {
      setDrawMarker(true);
    }, 200);
  }, []);

  const getMarkerColor = (nodeData) => {
    if (!nodeData) return "gray";

    const temperature = parseFloat(nodeData.temperature);
    const coConcentration = parseFloat(nodeData.co_concentration);

    if (temperature > 35 || coConcentration > 5) return "red";
    if (temperature > 30 || coConcentration > 3) return "yellow";
    return "green";
  };

  return (
    <LoadScript googleMapsApiKey={env}>
      <Card className="relative overflow-hidden ml-0">
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded z-10">
          Cat Tien National Park
        </div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          mapTypeId={mapType}
          zoom={14}
          options={{
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            styles: [
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#000000" }],
              },
            ],
          }}
        >
          {drawMarker &&
            Object.entries(nodeLocations).map(([nodeId, position]) => (
              <Marker
                key={nodeId}
                position={position}
                title={`Node ${nodeId}: ${position.lat}, ${position.lng}`}
                icon={{
                  path: window.google?.maps?.SymbolPath?.CIRCLE,
                  fillColor: getMarkerColor(data[nodeId]),
                  fillOpacity: 0.9,
                  scale: 10,
                  strokeColor: "white",
                  strokeWeight: 2,
                }}
              />
            ))}
        </GoogleMap>
        <button
          onClick={toggleMapType}
          className="absolute top-2 right-2 px-6 py-1 bg-blue-500 text-white rounded"
        >
          {mapType === "satellite" ? "View Map" : "View Satellite"}
        </button>
      </Card>
    </LoadScript>
  );
}
