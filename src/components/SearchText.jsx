import { useState } from "react";
import { TextInput, Button, Group, Paper, Loader, Container, Stack } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import axios from "axios";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mantine/hooks";

function SearchText({ setSearchResults }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_URL_SEARCH}=${encodeURIComponent(query)}`;
      const res = await axios.get(url);
      setSearchResults(res.data);
    } catch {
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSearchResults(null);
  };

  return (
    <Container size="xs" px="xs" my="md">
      <Paper shadow="xs" p="md" mb="xl">
        <form onSubmit={handleSearch}>
          <Stack spacing="sm">
            <TextInput
              placeholder="Buscar por nombre o autor"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              icon={<IconSearch size={18} />}
              style={{ width: "100%" }}
              size={isMobile ? "sm" : "md"}
              autoComplete="off"
              radius="md"
            />
            <Group position="apart" grow spacing="xs">
              <Button
                type="submit"
                variant="gradient"
                gradient={{ from: "indigo", to: "grape" }}
                size={isMobile ? "xs" : "md"}
                radius="xl"
              >
                Buscar
              </Button>
              <Button
                type="button"
                color="gray"
                variant="outline"
                size={isMobile ? "xs" : "md"}
                radius="xl"
                onClick={handleClear}
                disabled={loading && !query}
                leftIcon={<IconX size={16} />}
              >
                Limpiar
              </Button>
            </Group>
          </Stack>
        </form>
        {loading && <Loader mt="md" display="block" m="20px auto" />}
      </Paper>
    </Container>
  );
}

export default SearchText;

SearchText.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
};
