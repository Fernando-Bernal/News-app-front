import { Card, Text, Group, Image } from "@mantine/core";
import PropTypes from "prop-types";
import dayjs from "dayjs";

function NewsCardHome({ title, author, date, image_url }) {
  const formattedDate = dayjs(date).format("DD/MM/YYYY");

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder style={{ minWidth: 320, maxWidth: 400 }}>
      <Card.Section>
        <Image src={image_url} height={180} alt={title} withPlaceholder />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={700} size="lg" style={{ color: "#501aaf" }}>{title}</Text>
      </Group>
      <Text size="sm" c="dimmed" mb="xs">
        {author} &bull; {formattedDate}
      </Text>
    </Card>
  );
}

NewsCardHome.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image_url: PropTypes.string,
};

export default NewsCardHome;
