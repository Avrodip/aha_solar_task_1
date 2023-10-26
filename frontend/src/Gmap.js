import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "./features/address";
import { Link } from "react-router-dom";

function MapContainer(props) {
  const [markerPosition, setMarkerPosition] = useState({
    lat: 23.06676760863389,
    lng: 72.53194477340752,
  });
  const [markerAddress, setMarkerAddress] = useState(null);
  const dispatch = useDispatch();
  
 

  const onMarkerDragend = (markerProps, marker) => {
    const lat = marker.position.lat();
    const lng = marker.position.lng();
    
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const address = results[0].formatted_address;
        dispatch(register(address));
        setMarkerAddress(address);
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  return (
    <div>
      <div>
        <span>
          <textarea type="text" rows="2" cols="40" value={markerAddress} readOnly />
        </span>
        <span>
          <Link to="/registration">
            <button type="submit">Submit Address</button>
          </Link>
        </span>
      </div>
      <Map
        google={props.google}
        style={{ width: "100%", height: "400px" }}
        initialCenter={markerPosition}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragend={onMarkerDragend}
        />
        {markerAddress && (
          <div>
            <p>Marker Address: {markerAddress}</p>
          </div>
        )}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBu9pup8uAdJB9EYl1VvMxmPlTb1omxRFE",
})(MapContainer);
