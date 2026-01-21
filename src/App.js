import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import geoJson from "./geoJson.json";
import { locations } from "./locationData";

import "./App.css";

export default function IndiaMap() {
  const [selectedState, setSelectedState] = useState(
    "National Capital Region (NCR)",
  );
  const [hoveredCity, setHoveredCity] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const mapRef = useRef(null);
  const cityRef = useRef(null);
  const popupRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const locationStates = useMemo(() => locations.map((obj) => obj.state), []);

  const stateCityMap = useMemo(() => {
    const map = {};
    locations.forEach(({ state, cities }) => {
      map[state] = cities;
    });
    return map;
  }, []);

  const selectedStateCities = selectedState
    ? stateCityMap[selectedState] || []
    : [];

  const getFillColor = (isHighlighted, selectedState, stateName) =>
    isHighlighted
      ? selectedState === stateName
        ? "#5f9fa3"
        : "#8fc683"
      : "#bdbbbc";

  const totalStates = locations.length;

  const allHospitals = locations.flatMap((state) => state.cities);

  const uniqueHospitals = Array.from(
    new Set(allHospitals.map((hospital) => hospital?.hospitalAddress)),
  );

  const totalHospitals = uniqueHospitals.length;

  // 👇 Detect click outside the map
  useEffect(() => {
    function handleClickOutside(event) {
      if (mapRef.current && !mapRef.current.contains(event.target)) {
        setSelectedState("National Capital Region (NCR)"); // reset selection
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scheduleClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredCity(null);
    }, 200); // adjust: 150–300 feels best
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        // maxWidth: "1100px",
        // margin: "50px auto",
        background: "#F0F9FA",
        borderRadius: "12px",
        padding: "20px",
        height: "100vh",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
      // onClick={() => {
      //   if (selectedState) {
      //     setSelectedState("");
      //   }
      // }}
    >
      {/* Map + City List */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        {/* India Map */}
        <div style={{ flex: 1 }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ center: [80, 22], scale: 1000 }}
            width={900}
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
                        if (locationStates.includes(stateName)) {
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

        {/*Right-side City List */}
        <div
          style={{
            flexBasis: "35%",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "32px",
              marginBottom: "48px",
              // marginTop: "24px",
            }}
          >
            {[
              { label: "States", value: totalStates },
              { label: "Healthcare Facilities", value: totalHospitals },
              // { label: "Vision", value: "01" },
              // { label: "Mission", value: "01" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: "10px",
                  minWidth: "100px",
                  textAlign: "center",
                  display: "flex",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    margin: "0",
                    color: "white",
                    background: "#5F9FA3",
                    fontWeight: "700",
                    fontSize: "40px",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    gap: "10px",
                    display: "flex",
                  }}
                  className="stats-card"
                >
                  {item.value}
                </div>
                <span
                  style={{
                    color: "#323130",
                    fontSize: "16px",
                    textAlign: "left",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <p
            style={{
              color: "#333",
              marginBottom: "12px",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            {selectedState}
          </p>

          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              transition: "all 0.3s ease-in-out",
            }}
            className="scrollable-city-list"
          >
            {selectedStateCities.map((city, idx) => (
              <div
                key={idx}
                ref={cityRef}
                onMouseEnter={(e) => {
                  cancelClose();
                  const rect = e.currentTarget.getBoundingClientRect();

                  const popupHeight = 300; // estimated
                  const viewportHeight = window.innerHeight;

                  let top = rect.top;
                  if (top + popupHeight > viewportHeight) {
                    top = viewportHeight - popupHeight - 100;
                  }

                  setHoverPos({
                    x: rect.left - 270,
                    y: Math.max(top, 20),
                  });
                  setHoveredCity(city);
                }}
                onMouseLeave={(e) => {
                  // if going into popup, do nothing
                  if (popupRef.current?.contains(e.relatedTarget)) {
                    return;
                  }
                  scheduleClose();
                }}
                style={{
                  background: "white",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  marginBottom: "10px",
                  border: "0.5px solid rgba(146, 160, 179, 0.5)",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "rgba(64, 82, 97, 1)",
                  }}
                >
                  {city.hospitalAddress}
                </span>

                {/* <span
                  style={{ fontSize: "14px", color: "rgba(64, 82, 97, 1)" }}
                >
                  {city.cityName}
                </span> */}
              </div>
            ))}
          </div>
        </div>
        {hoveredCity && hoveredCity.description && (
          <div
            ref={popupRef}
            className="hover-popup"
            style={{
              top: hoverPos.y,
              left: hoverPos.x,
              width: "260px",
              zIndex: 9999,
            }}
            onMouseEnter={cancelClose}
            onMouseLeave={(e) => {
              if (cityRef.current?.contains(e.relatedTarget)) return;
              scheduleClose();
            }}
          >
            <img
              src={
                hoveredCity.image ||
                "/india-map/assets/fortisHospitalDefault.jpg"
              }
              alt={hoveredCity.name}
              loading="lazy"
              style={{
                width: "100%",
                height: "125px",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            />

            <p style={{ margin: 0, fontWeight: 700, fontSize: "16px" }}>
              {hoveredCity.hospitalAddress}
            </p>

            <div className="hover-description">
              {hoveredCity.description || "No description available."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
