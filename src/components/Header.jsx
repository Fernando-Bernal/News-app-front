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
        background: "#ffffff",
        boxShadow: "0 2px 8px 0 #1d1d1d21",
        borderRadius: 12,
        marginBottom: 32,
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
        aria-label="Ir a la página principal"
      >
        <img
          src="/mf.png"
          alt="MindFactory Noticias"
          style={{
            height: window.innerWidth >= 600 ? "80px" : "24px",
            transition: "height 0.2s",
            display: "block",
          }}
        />
      </button>
      <Group
        spacing="xs"
        sx={{
          "@media (max-width: 600px)": {
            justifyContent: "flex-end",
            width: "100%",
            size: "xs",
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
