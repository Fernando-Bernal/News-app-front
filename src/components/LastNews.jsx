import NewsCardHome from "./NewsCardHome";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function LastNews({ lastNews, title }) {
  const navigate = useNavigate();

  return (
    <>
      <h2 style={{ textAlign: "center", margin: "20px 10px" }}>{title}</h2>
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "20px",
          minHeight: "260px",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "22px",
            minWidth: "min(100%, 300px)",
          }}
        >
          {lastNews && lastNews.length > 0 ? (
            lastNews.map((newsItem) => (
              <div
                key={newsItem.id}
                role="button"
                tabIndex={0}
                style={{
                  cursor: "pointer",
                  outline: "none",
                  border: "none",
                  background: "transparent",
                  padding: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "stretch",
                  height: "100%",
                }}
                onClick={() => navigate(`/news/${newsItem.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/news/${newsItem.id}`);
                  }
                }}
              >
                <NewsCardHome
                  title={newsItem.title}
                  author={newsItem.author}
                  date={newsItem.date}
                  image_url={newsItem.image_url || "https://via.placeholder.com/150"}
                />
              </div>
            ))
          ) : (
            <p style={{ color: "#999", textAlign: "center", width: "100%" }}>
              No hay noticias para mostrar.
            </p>
          )}
        </div>
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
  title: PropTypes.string.isRequired,
};

export default LastNews;
