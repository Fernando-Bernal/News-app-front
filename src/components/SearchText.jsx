import { useState } from "react";
import { TextInput, Button, Group, Paper, Loader, Container } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import axios from "axios";
import PropTypes from "prop-types";

function SearchText({ setSearchResults }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    setLoading(true);
    try {
      let a = `${import.meta.env.VITE_API_URL_SEARCH}=${encodeURIComponent(query)}`;
      const res = await axios.get(a);
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
          <Group
            noWrap
            sx={{
              "@media (max-width: 600px)": {
                flexDirection: "column",
                alignItems: "stretch",
                gap: 8,
              },
            }}
          >
            <TextInput
              placeholder="Buscar por nombre o autor"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              icon={<IconSearch size={18} />}
              style={{ flex: 1, minWidth: 0 }}
              size="md"
              autoComplete="off"
              sx={{
                "@media (max-width: 600px)": {
                  width: "100%",
                },
              }}
            />
            <Group
              noWrap
              sx={{
                "@media (max-width: 600px)": {
                  width: "100%",
                  justifyContent: "space-between",
                },
              }}
            >
              <Button
                type="submit"
                variant="gradient"
                gradient={{ from: "indigo", to: "grape" }}
                size="md"
                radius="xl"
                sx={{
                  "@media (max-width: 600px)": {
                    flex: 1,
                    size: "xs"
                  },
                }}
              >
                Buscar
              </Button>
              <Button
                type="button"
                color="gray"
                variant="outline"
                size="md"
                radius="xl"
                onClick={handleClear}
                disabled={loading && !query}
                leftIcon={<IconX size={16} />}
                sx={{
                  "@media (max-width: 600px)": {
                    flex: 1,
                    size: "xs"
                  },
                }}
              >
                Limpiar
              </Button>
            </Group>
          </Group>
        </form>
        {loading && <Loader mt="md" />}
      </Paper>
    </Container>
  );
}

export default SearchText;

SearchText.propTypes = {
  setSearchResults: PropTypes.func.isRequired,
};
