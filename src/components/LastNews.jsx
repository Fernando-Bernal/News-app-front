import NewsCardHome from "./NewsCardHome";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function LastNews({ lastNews }) {
  const navigate = useNavigate();

  return (
    <>
      <h2 style={{ textAlign: "left", margin: "20px 10px", color: "red" }}>Ultimas Novedades</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "10px",
          padding: "20px",
        }}
      >
        {lastNews && lastNews.length > 0 ? (
          lastNews.map((newsItem) => (
            <button
              key={newsItem.id}
              style={{
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                flex: 1,
                background: "transparent",
                border: "none",
                padding: 0,
                textAlign: "inherit",
              }}
              onClick={() => navigate(`/news/${newsItem.id}`)}
            >
              <NewsCardHome
                title={newsItem.title}
                author={newsItem.author}
                date={newsItem.date}
                image_url={newsItem.image_url || "https://via.placeholder.com/150"}
              />
            </button>
          ))
        ) : (
          <p style={{ color: "#999", textAlign: "center", width: "100%" }}>
            No hay noticias para mostrar.
          </p>
        )}
      </div>
    </>
  );
}

LastNews.propTypes = {
  lastNews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      date: PropTypes.string,
      image_url: PropTypes.string,
    })
  ),
};

export default LastNews;
