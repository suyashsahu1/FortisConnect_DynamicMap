import { useMemo, useRef, useState } from "react";
import DescriptionBox from "../DescriptionBox";

const StateWiseLists = ({ locations, selectedState }) => {
  const [hoveredCity, setHoveredCity] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const cityRef = useRef(null);
  const popupRef = useRef(null);
  const closeTimeoutRef = useRef(null);

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

  const isNode = (el) => el instanceof Node;

  const getHospitalData = () => {
    const totalStates = locations.length;

    const allHospitals = locations.flatMap((state) => state.cities);

    const uniqueHospitals = Array.from(
      new Set(allHospitals.map((hospital) => hospital?.hospitalAddress)),
    );

    const totalHospitals = uniqueHospitals.length;

    const hospitalData = [
      { label: "States", value: totalStates },
      { label: "Healthcare Facilities", value: totalHospitals },
    ];

    return hospitalData;
  };

  const scheduleClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredCity(null);
    }, 200);
  };

  const cancelClose = () => {
    if (closeTimeoutRef?.current) {
      clearTimeout(closeTimeoutRef?.current);
      closeTimeoutRef.current = null;
    }
  };

  return (
    <>
      <div
        style={{
          flexBasis: "37%",
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
          }}
        >
          {getHospitalData().map((item, idx) => (
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
                  arrowTop: rect.top - Math.max(top, 20) + 16,
                });
                setHoveredCity(city);
              }}
              onMouseLeave={(e) => {
                const target = e.relatedTarget;

                if (
                  target &&
                  isNode(target) &&
                  popupRef.current?.contains(target)
                ) {
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
                className="city-name"
              >
                {city.hospitalAddress}
              </span>
            </div>
          ))}
        </div>
      </div>

      <DescriptionBox
        hoveredCity={hoveredCity}
        hoverPos={hoverPos}
        popupRef={popupRef}
        cancelClose={cancelClose}
        scheduleClose={scheduleClose}
        cityRef={cityRef}
      />
    </>
  );
};

export default StateWiseLists;
