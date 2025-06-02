import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import LastNews from "../components/LastNews";
import NewsCarousel from "../components/NewsCarousel";
import { Button } from "@mantine/core";

function Home() {
  const [news, setNews] = useState([]);
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
          <Button onClick={() => navigate("/create")} variant="gradient" gradient={{ from: "indigo", to: "grape", deg: 143 }} size="md" radius="xl" boxShadow="md">
            Crear noticia
          </Button>
        }
      />
      <LastNews lastNews={news.slice(0, 3)} />
      <NewsCarousel news={news} />
    </div>
  );
}

export default Home;
