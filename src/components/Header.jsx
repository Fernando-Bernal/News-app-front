import { Group } from "@mantine/core";
import PropTypes from "prop-types";

function Header({ actions }) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.2rem 2rem",
        background: "#f0f0f0a1",
        boxShadow: "0 2px 8px 0 #1d1d1d21",
        borderRadius: 12,
        marginBottom: 32,
      }}
    >
      <span
        style={{
          color: "linear-gradient(90deg, #501aaf 0%, #7046ef 100%)",
          background: "linear-gradient(90deg, #450bab 0%, #7752e8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 800,
          fontSize: "2rem",
          letterSpacing: 1,
          fontFamily: "Inter, sans-serif",
          filter: "drop-shadow(2px 3px 3px rgba(249, 68, 228, 0.957))",
        }}
      >
        MindFactory Noticias
      </span>
      <Group>{actions}</Group>
    </header>
  );
}
Header.propTypes = {
  actions: PropTypes.node,
};

export default Header;
