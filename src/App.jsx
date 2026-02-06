import React, { useEffect, useRef, useState } from "react";

import { locations } from "./locationData";

import "./App.css";
import Map from "./Map";
import StateWiseLists from "./StateWiseLists";

export default function IndiaMap() {
  const [selectedState, setSelectedState] = useState(
    "National Capital Region (NCR)",
  );

  const mapRef = useRef(null);

  // Detect click outside the map
  useEffect(() => {
    function handleClickOutside(event) {
      if (mapRef.current && !mapRef.current.contains(event.target)) {
        setSelectedState("National Capital Region (NCR)"); // reset selection
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        width: "100%",
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <Map
          locations={locations}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />

        <StateWiseLists locations={locations} selectedState={selectedState} />
      </div>
    </div>
  );
}
