import React, { useState } from "react";
import { Artist, Song } from "./Songs";
import "./Artists.css";

interface ArtistsProps {
  subscribedArtists: Artist[];
  favoriteSongs: Song[];
  onSelectArtist: (artist: Artist) => void;
  onSelectSong: (song: Song) => void;
}

const Artists: React.FC<ArtistsProps> = ({
  subscribedArtists,
  favoriteSongs,
  onSelectArtist,
  onSelectSong,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"songs" | "artists" | null>(null);

  // Фильтруем избранные песни
  const filteredSongs = favoriteSongs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Фильтруем подписанных артистов
  const filteredArtists = subscribedArtists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isEmpty =
    (activeTab === "artists" && filteredArtists.length === 0) ||
    (activeTab === "songs" && filteredSongs.length === 0) ||
    (activeTab === null && filteredSongs.length === 0 && filteredArtists.length === 0);

  return (
    <div className="artists-container">
      <div className="artists-header">
        <div className="artists-title">
          <svg viewBox="0 0 24 24" className="library-icon">
            <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z" />
          </svg>
          <span>Моя медиатека</span>
        </div>
      </div>

      <div className="artists-tabs">
        <button
          className={`artists-tab ${activeTab === "songs" ? "active" : ""}`}
          onClick={() => setActiveTab(prev => (prev === "songs" ? null : "songs"))}
        >
          Песни
        </button>
        <button
          className={`artists-tab ${activeTab === "artists" ? "active" : ""}`}
          onClick={() => setActiveTab(prev => (prev === "artists" ? null : "artists"))}
        >
          Исполнители
        </button>
      </div>

      <div className="artists-search">
        <svg viewBox="0 0 16 16" className="search-icon">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.398 1.398l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zM6.5 11a4.5 4.5 0 1 1 4.5-4.5A4.5 4.5 0 0 1 6.5 11z" />
        </svg>
        <input
          type="text"
          placeholder="Поиск"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="artists-list">
        {(activeTab === "songs" || activeTab === null) &&
          filteredSongs.map((song) => (
            <div key={`song-${song.id}`} className="artist-item" onClick={() => onSelectSong(song)}>
              <img src={song.image} alt={song.title} className="artist-image" />
              <div className="artist-info">
                <span className="artist-name">{song.title}</span>
                <span className="artist-subtext">Песня</span>
              </div>
            </div>
          ))}

        {(activeTab === "artists" || activeTab === null) &&
          filteredArtists.map((artist) => (
            <div key={`artist-${artist.id}`} className="artist-item" onClick={() => onSelectArtist(artist)}>
              <img src={artist.image} alt={artist.name} className="artist-image" />
              <div className="artist-info">
                <span className="artist-name">{artist.name}</span>
                <span className="artist-subtext">Исполнитель</span>
              </div>
            </div>
          ))}

        {isEmpty && <p className="no-results"><strong>Ничего не найдено</strong></p>}
      </div>
    </div>
  );
};

export default Artists;
