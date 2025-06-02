import { useState, useEffect } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Loader,
  Stack,
  Overlay,
  Container,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import PropTypes from "prop-types";
import axios from "axios";

function NewsForm({ initialData, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    body: "",
    image_url: "",
    author: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const startTime = Date.now();
    try {
      if (initialData?.id) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/news/${initialData.id}`, form);
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/news/`, form);
      }

      notifications.show({
        title: "¡Éxito!",
        message: initialData ? "Noticia actualizada correctamente" : "Noticia creada correctamente",
        color: "green",
        autoClose: 3000,
      });

      onSuccess && onSuccess();
    } catch (err) {
      let errorMsg = "Error al guardar la noticia";

      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data?.errors &&
        Array.isArray(err.response.data.errors)
      ) {
        errorMsg = err.response.data.errors
          .map((e) => e.msg + (e.path ? ` (${e.path})` : ""))
          .join(", ");
      } else if (err.message) {
        errorMsg = err.message;
      }

      notifications.show({
        title: "Error",
        message: errorMsg,
        color: "red",
        autoClose: 5000,
      });
    } finally {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 500 - elapsed);
      setTimeout(() => setLoading(false), delay);
    }
  };

  return (
    <Container size="xs" px="xs">
      <div style={{ position: "relative" }}>
        {loading && (
          <Overlay center>
            <Loader size="md" />
          </Overlay>
        )}
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Título"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <TextInput
              label="Autor"
              name="author"
              value={form.author}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Textarea
              label="Contenido"
              name="body"
              value={form.body}
              onChange={handleChange}
              required
              minRows={4}
              disabled={loading}
            />
            <TextInput
              label="URL de imagen"
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <Group position="right" mt="md">
              <Button variant="default" onClick={onCancel} disabled={loading} radius={"xl"}>
                Cancelar
              </Button>
              <Button type="submit" loading={loading} gradient={{ from: "indigo", to: "grape" }} radius={"xl"}>
                {initialData ? "Actualizar noticia" : "Crear noticia"}
              </Button>
            </Group>
          </Stack>
        </form>
      </div>
    </Container>
  );
}

NewsForm.propTypes = {
  initialData: PropTypes.object,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default NewsForm;
