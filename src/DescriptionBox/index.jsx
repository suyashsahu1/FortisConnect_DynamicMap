const DescriptionBox = ({
  hoveredCity,
  hoverPos,
  popupRef,
  cancelClose,
  scheduleClose,
  cityRef,
}) => {
  const isNode = (el) => el instanceof Node;

  const defaultImageUri =
    "/FortisConnect_DynamicMap/assets/fortisHospitalDefault.jpg";

  return hoveredCity && hoveredCity.description ? (
    <div
      ref={popupRef}
      className="hover-popup"
      style={{
        top: hoverPos.y,
        left: hoverPos.x,
        width: "260px",
        zIndex: 9999,
        "--arrow-top": `${hoverPos.arrowTop}px`,
      }}
      onMouseEnter={cancelClose}
      onMouseLeave={(e) => {
        const target = e.relatedTarget;

        if (target && isNode(target) && cityRef.current?.contains(target)) {
          return;
        }

        scheduleClose();
      }}
    >
      <img
        src={hoveredCity.image || defaultImageUri}
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
        {hoveredCity.description?.trim() || "No description available."}
      </div>
    </div>
  ) : null;
};

export default DescriptionBox;
