import { Button } from "@mantine/core";

function Header() {
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
        }}
      >
        MindFactory News
      </span>
      <Button
        variant="gradient"
        gradient={{ from: "indigo", to: "grape", deg: 143 }}
        size="md"
        radius="xl"
        boxShadow="md"
      >
        Crear noticia
      </Button>
    </header>
  );
}

export default Header;
