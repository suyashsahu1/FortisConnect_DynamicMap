import { useEffect, useMemo, useRef, useState } from "react";
import geoJson from "../geoJson.json";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const Map = ({ locations, selectedState, setSelectedState }) => {
  const [mapWidth, setMapWidth] = useState(900);

  const locationStates = useMemo(() => locations.map((obj) => obj.state), []);

  const mapRef = useRef(null);

  useEffect(() => {
    setMapWidth(window?.innerWidth > 1024 ? 900 : 750);
  }, []);

  const getFillColor = (isHighlighted, selectedState, stateName) =>
    isHighlighted
      ? selectedState === stateName
        ? "#5f9fa3"
        : "#8fc683"
      : "#bdbbbc";

  return (
    <div style={{ flex: 1 }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [80, 22], scale: 1000 }}
        width={mapWidth}
        height={610}
        ref={mapRef}
      >
        <Geographies geography={geoJson}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.st_nm;
              const isHighlighted = locationStates.includes(stateName);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseDown={() => {
                    if (
                      locationStates.includes(stateName) &&
                      stateName !== "Haryana"
                    ) {
                      setSelectedState(stateName);
                    } else {
                      setSelectedState("National Capital Region (NCR)");
                    }
                  }}
                  style={{
                    default: {
                      fill: getFillColor(
                        isHighlighted,
                        selectedState,
                        stateName,
                      ),
                      stroke: "#fff",
                      strokeWidth: 0.5,
                      transition: "fill 0.2s ease-in-out",
                      outline: "none",
                    },
                    hover: {
                      fill: getFillColor(
                        isHighlighted,
                        selectedState,
                        stateName,
                      ),
                      cursor: "pointer",
                      outline: "none",
                    },
                    pressed: {
                      fill: getFillColor(
                        isHighlighted,
                        selectedState,
                        stateName,
                      ),
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {locations
          .filter((loc) => loc.coords && loc.coords.length === 2)
          .map(({ coords, state }) => (
            <Marker
              onMouseDown={() => {
                if (locationStates.includes(state)) {
                  setSelectedState(state);
                }
              }}
              key={state}
              coordinates={coords}
              style={{
                default: { outline: "none" },
                hover: {
                  fill: "#6fbf73",
                  cursor: "pointer",
                  outline: "none",
                },
                pressed: { outline: "none" },
              }}
            >
              <circle r={3} fill="red" stroke="red" strokeWidth={0.5} />
            </Marker>
          ))}
      </ComposableMap>
    </div>
  );
};

export default Map;
