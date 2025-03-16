import React from "react";
import { Song, Artist } from "./Songs"; 
import "./SongInfo.css";

interface SongInfoProps {
  song: Song | null;
  artists: Artist[];
}

const SongInfo: React.FC<SongInfoProps> = ({ song, artists }) => {
  if (!song) return null;

  const currentArtist = artists.find(a => a.id === song.artist);


  return (
    <div className="song-info-container">
   
      <h2 className="song-artist-header">{currentArtist?.name ?? "Неизвестный исполнитель"}</h2>

      <div className="song-card">
        <img 
            src={song.image ? song.image : "https://via.placeholder.com/400"} 
            alt={song.title} 
            className="song-card-image" 
        />

        <div className="song-card-info">
            <h2 className="song-card-title">{song.title}</h2>
            <p className="song-card-artist">
            {currentArtist?.name ?? "Неизвестный артист"}
            </p>
        </div>

        <div className="song-card-check">
          <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              className="check-icon"
          >
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
            <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
          </svg>
        </div>
      </div>

      {currentArtist && (
        <div className="author-info">
          <div 
            className="author-image-container"
            style={{ backgroundImage: `url(${currentArtist.image})` }}
          >
            <div className="author-overlay">
              <div className="author-label">Об исполнителе</div>
            </div>
          </div>
          <div className="artist-info-container">
            <span className="artist-name">{currentArtist.name}</span>
            <div className="artist-stats-section">
              <div className="artist-listeners">
                {currentArtist.listeners} слушателей за месяц
              </div>
              <a 
                className="subscribe-button" 
                href={currentArtist.link} 
                tabIndex={0} 
                role="button" 
                aria-label="Подписаться"
              >
                Подписаться
              </a>
            </div>
            <p className="artist-description">
              {currentArtist.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongInfo;
