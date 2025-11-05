import React, { useMemo, useState } from "react";
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
  const [selectedState, SetSelectedState] = useState("National Capital Region");

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

  const allCities = locations.flatMap((state) => state.cities);

  const uniqueCities = Array.from(
    new Set(allCities.map((cities) => cities?.name?.toLowerCase()))
  );

  const totalHospitals = uniqueCities.length;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "50px auto",
        background: "#F0F9FA",
        borderRadius: "12px",
        padding: "20px 30px 30px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      {/* 🧭 Top Info Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "32px",
          marginBottom: "48px",
          marginTop: "48px",
        }}
      >
        {[
          { label: "States", value: totalStates },
          { label: "Hospitals", value: totalHospitals },
          { label: "Vision", value: "01" },
          { label: "Mission", value: "01" },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              borderRadius: "10px",
              minWidth: "100px",
              textAlign: "center",
              display: "flex",
              gap: "24px",
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
                padding: "14px 16px",
                gap: "10px",
                display: "flex",
              }}
            >
              {item.value}
            </div>
            <span
              style={{
                color: "#323130",
                fontSize: "24px",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* 🗺️ Map + City List */}
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
            width={600}
            height={600}
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
                          SetSelectedState(stateName);
                        } else {
                          SetSelectedState("");
                        }
                      }}
                      style={{
                        default: {
                          fill: getFillColor(
                            isHighlighted,
                            selectedState,
                            stateName
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
                            stateName
                          ),
                          cursor: "pointer",
                          outline: "none",
                        },
                        pressed: {
                          fill: getFillColor(
                            isHighlighted,
                            selectedState,
                            stateName
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
                      SetSelectedState(state);
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
                  <circle
                    r={3}
                    fill="#1d993f"
                    stroke="#1d993f"
                    strokeWidth={0.5}
                  />
                </Marker>
              ))}
          </ComposableMap>
        </div>

        {/* 📋 Right-side City List */}
        <div
          style={{
            flexBasis: "35%",
            borderRadius: "12px",
            padding: "16px",
            maxHeight: "500px",
            overflowY: "auto",
            transition: "all 0.3s ease-in-out",
          }}
          className="scrollable-city-list"
        >
          {/* <h3 style={{ color: "#333", marginBottom: "12px" }}>
            {selectedState}
          </h3> */}

          {selectedStateCities.map((city, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                padding: "16px 24px",
                borderRadius: "12px",
                marginBottom: "10px",
                border: "0.5px solid rgba(146, 160, 179, 0.5)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "18px",
                  color: "rgba(64, 82, 97, 1)",
                  marginBottom: "5px",
                }}
              >
                {city.name}
              </span>
              <span style={{ fontSize: "14px", color: "rgba(64, 82, 97, 1)" }}>
                {city.address}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
