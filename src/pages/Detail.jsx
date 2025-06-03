import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Image,
  Loader,
  Paper,
  Button,
  Modal,
  Group,
  Modal as MantineModal,
} from "@mantine/core";
import axios from "axios";
import dayjs from "dayjs";
import Header from "../components/Header";
import NewsCarousel from "../components/NewsCarousel";
import NewsForm from "../components/NewsForm";
import { notifications } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/news/${id}`)
      .then((res) => setNews(res.data))
      .catch(() => setNews(null))
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/news`)
      .then((res) => setAllNews(res.data))
      .catch(() => setAllNews([]));
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/news/${id}`);
      notifications.show({
        title: "Noticia eliminada",
        message: "La noticia fue eliminada correctamente.",
        color: "green",
      });
      navigate("/");
    } catch (err) {
      console.error("Error deleting news:", err);
      notifications.show({
        title: "Error",
        message: "No se pudo eliminar la noticia.",
        color: "red",
      });
    }
  };

  if (loading) return <div  style={{height: "100vh", display: "flex", justifyContent: "center", alignItems:"center"}}> <Loader size="xl" /> </div>;
  if (!news)
    return (
      <Text align="center" c="red">
        No se encontró la noticia.
      </Text>
    );

  return (
    <>
      <Header
        actions={
          <Group spacing="xs" direction={isMobile ? "column" : "row"} align="flex-end" justify="flex-end">
            <Button
              onClick={() => setModalOpen(true)}
              variant="gradient"
              gradient={{ from: "indigo", to: "grape", deg: 143 }}
              size={isMobile ? "xs" : "sm"}
              radius="xl"
            >
              Editar noticia
            </Button>
            <Button
              color="red"
              variant="outline"
              size={isMobile ? "xs" : "sm"}
              radius="xl"
              onClick={() => setConfirmDeleteOpen(true)}
            >
              Borrar noticia
            </Button>
          </Group>
        }
      />

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Editar noticia"
        centered
        overlayProps={{ opacity: 1 }}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
      >
        <NewsForm
          initialData={news}
          onSuccess={() => {
            setModalOpen(false);
            axios
              .get(`${import.meta.env.VITE_API_BASE_URL}/news/${id}`)
              .then((res) => setNews(res.data));
          }}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <MantineModal
        opened={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        title="Confirmar eliminación"
        centered
        overlayProps={{ opacity: 1 }}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
      >
        <Text mb="md">
          ¿Está seguro que desea borrar la nota <b>{news.title}</b>?
        </Text>
        <Group position="right">
          <Button variant="default" onClick={() => setConfirmDeleteOpen(false)} radius={"xl"}>
            Cancelar
          </Button>
          <Button
            color="red"
            radius={"xl"}
            variant="filled"
            onClick={async () => {
              setConfirmDeleteOpen(false);
              await handleDelete();
            }}
          >
            Sí, borrar
          </Button>
        </Group>
      </MantineModal>
      <Container size="sm" py="xl">
        <Paper shadow="md" radius="md" p="lg">
          <Image src={news.image_url} alt={news.title} height={300} radius="md" mb="md" />
          <Title order={2} mb="sm">
            {news.title}
          </Title>
          <Text c="dimmed" size="sm" mb="md">
            {news.author} &bull; {dayjs(news.date || news.createdAt).format("DD/MM/YYYY")}
          </Text>
          <Text size="md" style={{ whiteSpace: "pre-line" }}>
            {news.body}
          </Text>
        </Paper>
      </Container>
      <NewsCarousel news={allNews} />
    </>
  );
}

export default Detail;
