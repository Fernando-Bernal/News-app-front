import NewsCardHome from "./NewsCardHome";
import PropTypes from "prop-types";

function LastNews({lastNews}) {
  return (
    <>
      <h2 style={{ textAlign: "left", margin: "20px 10px", color: "red" }}>Ultimas Novedades</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "20px",
          padding: "20px",
        }}
      >
        {lastNews && lastNews.length > 0 ? (
          lastNews.map((newsItem) => (
            <NewsCardHome
              key={newsItem.id}
              title={newsItem.title}
              author={newsItem.author}
              date={newsItem.date}
              image_url={newsItem.image_url || "https://via.placeholder.com/150"}
            />
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
