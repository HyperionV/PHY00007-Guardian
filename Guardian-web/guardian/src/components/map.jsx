'use client'
import { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { Card } from '@/components/ui/card';
import { set } from 'firebase/database';


export function Map(data) {
  const env = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapContainerStyle = { width: '100%', height: '350px' };
  const center = { lat: 10.762622, lng: 106.660172 };
  const [drawMarker, setDrawMarker] = useState(false);
  const [mapType, setMapType] = useState('satellite');

  const toggleMapType = () => {
    setMapType(mapType === 'satellite' ? 'roadmap' : 'satellite');
  };

    useEffect(() => {
        setTimeout(() => {
            setDrawMarker(true);
        }, 200);
        }
    , []);
  return (
    <LoadScript googleMapsApiKey={env}>
      <Card className="relative overflow-hidden ml-0">
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded z-10">75%</div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          mapTypeId={mapType}
          zoom={15}
          options={{
            styles: [
              {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#000000' }],
              },
            ],
          }}
        >
        {drawMarker && <Marker position={center} title={`Tọa độ: ${center.lat}, ${center.lng}`}/>}

        </GoogleMap>
        <button onClick={toggleMapType} className="absolute top-2 left-14 px-6 py-1 bg-blue-500 text-white rounded">
          {mapType === 'satellite' ? 'Xem bản đồ' : 'Xem vệ tinh'}
        </button>
      </Card>
    </LoadScript>
  );
}




