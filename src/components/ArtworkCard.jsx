function ArtworkCard({ artwork }) {
  return (
    <article className="artwork-card">
      <div className="artwork-image">
        {artwork.image ? (
          <img src={artwork.image} alt={artwork.title} />
        ) : (
          <div className="artwork-placeholder">
            <span>IMAGEN PENDIENTE</span>
            <small>{artwork.slug}</small>
          </div>
        )}

        <span
          className={`artwork-status ${
            artwork.status === "Vendida" ? "is-sold" : ""
          }`}
        >
          {artwork.status}
        </span>
      </div>

      <div className="artwork-information">
        <div>
          <p>{artwork.category}</p>
          <h3>{artwork.title}</h3>
        </div>

        <span>{artwork.year}</span>
      </div>
    </article>
  );
}

export default ArtworkCard;
