import { Group } from "@mantine/core";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Header({ actions }) {
  const navigate = useNavigate();
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
      <button
        type="button"
        style={{
          color: "linear-gradient(90deg, #501aaf 0%, #7046ef 100%)",
          background: "linear-gradient(90deg, #450bab 0%, #7752e8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 800,
          fontSize: "1.2rem",
          letterSpacing: 1,
          fontFamily: "Inter, sans-serif",
          filter: "drop-shadow(2px 3px 3px rgba(249, 68, 228, 0.957))",
          cursor: "pointer",
          outline: "none",
          border: "none",
          padding: 0,
          backgroundClip: "text",
          transition: "font-size 0.2s",
          ...(window.innerWidth >= 600 && { fontSize: "2rem" }),
        }}
        onClick={() => navigate("/")}
      >
        MindFactory Noticias
      </button>
      <Group
        spacing="xs"
        sx={{
          "@media (max-width: 600px)": {
            justifyContent: "flex-end",
            width: "100%",
          },
        }}
      >
        {actions}
      </Group>
    </header>
  );
}
Header.propTypes = {
  actions: PropTypes.node,
};

export default Header;
