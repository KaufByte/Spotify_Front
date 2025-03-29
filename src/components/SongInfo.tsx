import React from "react";
import { Song, Artist } from "./Songs";
import "./SongInfo.css";

interface SongInfoProps {
  song: Song;
  artists: Artist[];
  favoriteSongIds: number[];
  subscribedArtistIds: number[];
  onToggleFavorite: (songId: number) => Promise<void>;
  onToggleSubscribe: (artistId: number) => Promise<void>;
}

const SongInfo: React.FC<SongInfoProps> = ({
  song,
  artists,
  favoriteSongIds,
  subscribedArtistIds,
  onToggleFavorite,
  onToggleSubscribe
}) => {
  const currentArtist = artists.find(a => a.id === song.artist);
  if (!currentArtist) return null;

  const isFavorite = favoriteSongIds.includes(song.id);
  const isSubscribed = subscribedArtistIds.includes(currentArtist.id);

  const handleArtistImageClick = () => {
    if (currentArtist?.link) {
      window.open(currentArtist.link, "_blank");
    }
  };

  return (
    <div className="song-info-container">
      <h2 className="song-artist-header">{currentArtist.name}</h2>
      <div className="song-card">
        <img
          src={song.image || "https://via.placeholder.com/400"}
          alt={song.title}
          className="song-card-image"
        />
        <div className="song-card-info">
          <h2 className="song-card-title">{song.title}</h2>
          <p className="song-card-artist">{currentArtist.name}</p>
        </div>
        <div
          className="song-card-check"
          onClick={() => onToggleFavorite(song.id)}
          role="button"
          tabIndex={0}
        >
          {isFavorite ? (
            <svg viewBox="0 0 24 24" fill="green" className="check-icon">
              <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5L9 16.2z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" fill="currentColor" className="check-icon">
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
              <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z" />
            </svg>
          )}
        </div>
      </div>

      <div className="author-info">
        <div
          className="author-image-container"
          style={{ backgroundImage: `url(${currentArtist.image})` }}
          onClick={handleArtistImageClick}
          role="button"
          tabIndex={0}
          aria-label={`Открыть страницу ${currentArtist.name}`}
        >
          <div className="author-overlay">
            <div className="author-label">Об исполнителе</div>
          </div>
        </div>

        <div className="artist-info-container">
          <span className="artist-name">{currentArtist.name}</span>
          <div className="artist-stats-section">
            <div className="artist-listeners">{currentArtist.listeners} слушателей за месяц</div>
            <button
              className="subscribe-button"
              aria-label="Подписаться"
              onClick={() => onToggleSubscribe(currentArtist.id)}
            >
              {isSubscribed ? "Отписаться" : "Подписаться"}
            </button>
          </div>
          <p className="artist-description">{currentArtist.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SongInfo;