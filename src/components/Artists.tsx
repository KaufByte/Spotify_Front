import React, { useState } from 'react';
import './Artists.css';

export interface Artist {
  id: number;
  name: string;
  description: string;
  image: string;
  listeners: string;
  link: string;
}

interface ArtistsProps {
  artists: Artist[];
  onSelectArtist: (artist: Artist) => void;
}

const Artists: React.FC<ArtistsProps> = ({ artists, onSelectArtist }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 🔥 Фильтрация исполнителей по поисковому запросу
  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="artists-container">
      {/* 🔥 Заголовок "Моя медиатека" */}
      <div className="artists-header">
        <div className="artists-title">
          <svg viewBox="0 0 24 24" className="library-icon">
            <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
          </svg>
          <span>Моя медиатека</span>
        </div>
        <div className="artists-actions">
          <button className="add-button">+</button>
          <button className="arrow-button">→</button>
        </div>
      </div>

      {/* 🔥 Кнопки переключения */}
      <div className="artists-tabs">
        <button className="artists-tab">Плейлисты</button>
        <button className="artists-tab">Исполнители</button>
      </div>

      {/* 🔥 Поиск */}
      <div className="artists-search">
        <svg viewBox="0 0 16 16" className="search-icon">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.398 1.398l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zM6.5 11a4.5 4.5 0 1 1 4.5-4.5A4.5 4.5 0 0 1 6.5 11z"></path>
        </svg>
        <input
          type="text"
          placeholder="Поиск"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 🔥 Обновляем `searchTerm`
        />
      </div>

      {/* 🔥 Список исполнителей */}
      <h3 className="artists-recent-header">Недавно прослушано</h3>
      <div className="artists-list">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <div key={artist.id} className="artist-item" onClick={() => onSelectArtist(artist)}>
              <img src={artist.image} alt={artist.name} className="artist-image" />
              <div className="artist-info">
                <span className="artist-name">{artist.name}</span>
                <span className="artist-subtext">Исполнитель</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">😞 Исполнитель не найден</p> 
        )}
      </div>
    </div>
  );
};

export default Artists;
