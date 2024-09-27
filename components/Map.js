"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { convertCoords } from "./utils/utils";
import { useAllPoles } from "./utils/useAllPoles";
import { useMap } from "./utils/context";
import Loading from "@/app/loading";

const MapComponent = () => {
  const [records, loaded] = useAllPoles();
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const {center, setCenter} = useMap();

  // Function to navigate to specific coordinates


  // Pass this function up to the parent component or through context

  const markers = useMemo(() => {
    if (!loaded) return [];
    return records.map((record) => ({
      ...record,
      coordinates: convertCoords(record.Coordinates),
    }));
  }, [loaded, records]);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const defaultCenter =
    markers.length > 0 ? markers[0].coordinates : { lat: 0, lng: 0 };

  // Initially set the center to the first marker if available
  useEffect(() => {
    if (markers.length > 0) {
      setCenter(markers[0].coordinates);
    }
  }, [markers]);

  const icons = {
    critical: "/icons/pole_red.png",
    warning: "/icons/pole_yellow.png",
    normal: "/icons/pole_green.png",
  };

  const getMarkerIcon = (record) => {
    if (record.critical) {
      return icons.critical;
    }
    return icons.normal;
  };

  return (
    <>
    <Loading loading={!loaded} />
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_mapsapi}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center} // Use the dynamic center state
        zoom={8}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.coordinates}
            onClick={() => setSelectedMarker(marker)}
            icon={getMarkerIcon(marker)}
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
              <p>Critical: {selectedMarker.critical ? "Yes" : "No"}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
    </>
  );
};

export default MapComponent;
