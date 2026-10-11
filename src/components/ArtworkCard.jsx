function ArtworkCard({ artwork }) {
  return (
    <article id={artwork.slug} className="artwork-card">
      <div className="artwork-image">
        {artwork.image ? (
          <img src={artwork.image} alt={artwork.title} loading="lazy" />
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
        {artwork.technique && <span>{artwork.technique}</span>}
        {(artwork.dimensions || artwork.year) && (
          <span>{[artwork.dimensions, artwork.year].filter(Boolean).join(" - ")}</span>
        )}
        {artwork.price && <strong>{artwork.price}</strong>}
      </div>
    </article>
  );
}

export default ArtworkCard;
