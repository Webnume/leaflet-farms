import React, { useState, useRef, useCallback } from "react";
import {
  MapContainer,
  GeoJSON,
  TileLayer,
  ZoomControl,
  Popup,
  useMapEvent,
  Polyline,
} from "react-leaflet";
import soilMap from "../data/soilmap.json";
import partField from "../data/partfield.json";
import log from "../data/log.json";
import "leaflet/dist/leaflet.css";

// interface Map
const Map = () => {
  const animateRef = useRef();
  const [map, setMap] = useState<any>(null);
  const [displaySoilMap, setDisplaySoilMap] = useState(false);
  const center = [49.67028382724888, 4.969493082517235];
  const zoom = 15;
  const soilName = soilMap.data.name;

  const isSoilMapsAvailable = (id: string) => {
    return soilMap.data.partfield_id === id;
  };

  const onClickField = useCallback(
    (center: number[], zoom: number) => {
      map.setView(center.reverse(), zoom);
      setDisplaySoilMap(true);
      map.closePopup();
    },
    [map]
  );

  const resetMapPosition = useCallback(() => {
    map.setView(center, zoom);
    setDisplaySoilMap(false);
    map.closePopup();
  }, [map]);

  function SetViewOnClick({ animateRef }: any) {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: animateRef.current || true,
      });
    });
    return null;
  }
  const polyline = log.data.geometry.coordinates.map((point: any) => {
    return [point[1], point[0]];
  });

  return (
    <>
      <MapContainer
        zoom={zoom}
        center={center as [number, number]}
        zoomControl={false}
        ref={setMap}
      >
        <SetViewOnClick animateRef={animateRef} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        {partField.items.map((field) => (
          <div key={field.id}>
            <GeoJSON
              data={field.boundaries as any}
              style={{ fillColor: "#" + field.color_hex }}
              {...field}
            >
              <Popup>
                {isSoilMapsAvailable(field.id) ? (
                  <p>
                    Available maps:
                    <br />
                    Type:
                    <br />{" "}
                    <button onClick={() => onClickField([...field.center], 17)}>
                      {soilName}
                    </button>
                  </p>
                ) : (
                  <p>No soil map available</p>
                )}
              </Popup>
            </GeoJSON>
          </div>
        ))}

        {displaySoilMap && (
          <>
            {soilMap.data.features[0].features.map((soil) => (
              <GeoJSON
                key={soil.properties.id}
                data={soil as any}
                style={{ color: soil.properties.color }}
              >
                <Popup>
                  <p>Analysis : {soil.properties.analysis}</p>
                </Popup>
              </GeoJSON>
            ))}
            <button
              className="button"
              style={{ position: "absolute", bottom: "5rem", zIndex: "400" }}
              onClick={resetMapPosition}
            >
              Close
            </button>
          </>
        )}
        <div style={{ zIndex: "400" }}></div>
        {displaySoilMap && <Polyline positions={polyline.reverse() as [][]} />}
      </MapContainer>
    </>
  );
};

export default Map;
