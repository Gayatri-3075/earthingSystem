"use client";
import React, { useMemo } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { convertCoords } from "./utils/utils";
import { useAllPoles } from "./utils/useAllPoles";

const MapComponent = () => {
  const [records, loaded] = useAllPoles();
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  // Ensure that useMemo depends on both 'loaded' and 'records'
  const markers = useMemo(() => {
    if (!loaded) return [];
    return records.map((record) => ({
      ...record,
      coordinates: convertCoords(record.Coordinates),
    }));
  }, [loaded, records]);
  console.log(markers);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const defaultCenter =
    markers.length > 0 ? markers[0].coordinates : { lat: 0, lng: 0 };

  // Define your icon URLs here
    // const icons = {
  //   critical: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Example critical icon
  //   warning: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png", // Example warning icon
  //   normal: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // Example normal icon
  // };


  const icons = {
    critical: "/icons/pole_red.png", // Example critical icon
    warning: "/icons/pole_yellow.png", // Example warning icon
    normal: "/icons/pole_green.png", // Example normal icon
  };

  /**
   * Function to determine the icon based on the record's properties.
   * Adjust the logic based on your actual record structure.
   */
  const getMarkerIcon = (record) => {
    if (record.critical) {
      return icons.critical;
    }
    else {
      return icons.normal;
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_mapsapi}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={8}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.coordinates}
            onClick={() => setSelectedMarker(marker)}
            icon={getMarkerIcon(marker)} // Assign the icon based on the record
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.coordinates}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h4>Marker Details</h4>
              <p>Latitude: {selectedMarker.coordinates.lat}</p>
              <p>Longitude: {selectedMarker.coordinates.lng}</p>
              {/* You can display more details from the record if needed */}
              <p>Critical: {selectedMarker.critical ? "Yes" : "No"}</p>
              {/* Example for comment */}
              {/* <p>Comment: {selectedMarker.comment}</p> */}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
