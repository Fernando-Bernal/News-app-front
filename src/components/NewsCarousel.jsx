import { Container, Title, Card, Button, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import PropTypes from "prop-types";


function NewsCarousel({ news }) {
  return (
    <Container size="lg" py="xl">
      <Title order={2} ta="center" mb="md">
        Todas las noticias
      </Title>

      <Carousel
        slideSize={{ base: "100%", sm: "50%", md: "33.3333%", lg: "25%" }}
        height={400}
        align="start"
        slideGap="md"
        loop
        withIndicators
        draggable
        withControls
        controlSize={36}
        styles={{
          control: { background: "#7046ef", color: "#fff", zIndex: 10 },
          controls: { top: "50%", transform: "translateY(-50%)" },
        }}
        slidesToScroll={1}
      >
        {news.map((item) => (
          <Carousel.Slide key={item.id}>
            <Card
              radius="md"
              style={{
                height: 370,
                position: "relative",
                backgroundImage: `url(${item.image_url || "https://via.placeholder.com/600x400"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "inherit",
                  zIndex: 1,
                }}
              />

              <div style={{ position: "relative", zIndex: 2, padding: "20px" }}>
                <Text size="xs" weight={700} transform="uppercase" mb={8} color="gray.3">
                  {item.category || "Noticia"}
                </Text>

                <Text size="xl" weight={900} lineClamp={2}>
                  {item.title}
                </Text>
              </div>

              <div style={{ position: "relative", zIndex: 2, padding: "20px" }}>
                <Button
                  variant="white"
                  color="dark"
                  onClick={() => (window.location.href = `/news/${item.id}`)}
                >
                  Leer artículo
                </Button>
              </div>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Container>
  );
}

NewsCarousel.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image_url: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NewsCarousel;
