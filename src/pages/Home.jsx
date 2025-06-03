import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import LastNews from "../components/LastNews";
import NewsCarousel from "../components/NewsCarousel";
import { Modal, Button } from "@mantine/core";
import NewsForm from "../components/NewsForm";
import SearchText from "../components/SearchText";
import { useMediaQuery } from "@mantine/hooks";


function Home() {
  const [news, setNews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/news`)
      .then((res) => setNews(res.data))
      .catch(() => setNews([]));
  }, []);

  return (
    <div>
      <Header
        actions={
          <Button
            onClick={() => setModalOpen(true)}
            variant="gradient"
            gradient={{ from: "indigo", to: "grape", deg: 143 }}
            size={isMobile ? "xs" : "sm"}
            radius="xl"
            boxShadow="md"
          >
            Crear noticia
          </Button>
        }
      />
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nueva noticia"
        centered
        overlayProps={{ opacity: 1 }}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
      >
        <NewsForm
          onSuccess={() => {
            setModalOpen(false);
            axios
              .get(`${import.meta.env.VITE_API_BASE_URL}/news`)
              .then((res) => setNews(res.data))
              .catch(() => setNews([]));
          }}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
      <SearchText setSearchResults={setSearchResults} />
      <LastNews
        lastNews={searchResults !== null ? searchResults : news.slice(0, 3)}
        title={searchResults !== null ? "Resultados de búsqueda" : "Últimas Novedades"}
      />
      <NewsCarousel news={news} />
    </div>
  );
}

export default Home;
