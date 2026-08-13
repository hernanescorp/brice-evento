function ArtworkCard({ artwork }) {
  return (
    <article id={artwork.slug} className="artwork-card">
      <div className="artwork-image">
        {artwork.image ? (
          <img src={artwork.image} alt={artwork.title} />
        ) : (
          <div className={`artwork-placeholder artwork-placeholder-${artwork.tone}`}>
            <span>{artwork.title}</span>
          </div>
        )}

        <span className={`artwork-status ${artwork.status === "Reservado" ? "is-sold" : ""}`}>
          {artwork.status}
        </span>
      </div>

      <div className="artwork-information">
        <p>{artwork.category}</p>
        <h3>{artwork.title}</h3>
        <span>{artwork.technique}</span>
        <span>
          {artwork.dimensions} - {artwork.year}
        </span>
        <strong>{artwork.price}</strong>
      </div>
    </article>
  );
}

export default ArtworkCard;
