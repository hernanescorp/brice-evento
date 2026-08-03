import ArtworkCard from "./ArtworkCard";

function ArtworkGrid({ artworks, limit }) {
  const visibleArtworks = limit ? artworks.slice(0, limit) : artworks;

  return (
    <div className="artwork-grid">
      {visibleArtworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}

export default ArtworkGrid;