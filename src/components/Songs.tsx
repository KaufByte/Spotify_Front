import React, { useEffect, useState } from 'react';
import './Songs.css';
import { Album } from './AlbumCard';

export interface Song {
  id: number;
  title: string;
  artist: number;  
  album: number;   
  image: string;
  music_file_url: string;  
  fullscreen_image: string; 
  duration: string;
  plays: string;
}


export interface Artist {
  id: number;
  name: string;
  description: string;
  image: string;
  listeners: string;
  link: string;
}

export interface SongsProps {
  onSelectSong: (song: Song) => void;
  searchTerm: string;
  songs: Song[];
  artists?: Artist[]; 
  selectedArtist?: Artist;
  selectedAlbum?: Album;
}

const Songs: React.FC<SongsProps> = ({ onSelectSong, searchTerm, selectedArtist, selectedAlbum }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL || 'https://spotify-update.onrender.com/api/';



  useEffect(() => {
    const fetchSongs = async () => {
      try {
        console.log(`📡 Отправляем запрос к API: ${API_URL}songs/`);
        const response = await fetch(`${API_URL}songs/`); 

        if (!response.ok) {
          throw new Error('Ошибка загрузки песен с сервера');
        }

        const data = await response.json();
        console.log('✅ Песни успешно загружены:', data);
        setSongs(data);
      } catch (error) {
        setError('Не удалось загрузить песни');
        console.error('❌ Ошибка загрузки:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  
  useEffect(() => {
    console.log('🔄 Фильтрация песен...');
    console.log('📌 Исходные песни:', songs);
    let filtered = songs;
    
    if (selectedArtist) {
      console.log(`🎤 Фильтруем по артисту: ${selectedArtist.name} (ID: ${selectedArtist.id})`);
      filtered = filtered.filter(song => song.artist === selectedArtist.id);
    } else if (selectedAlbum) {
      console.log(`📀 Фильтруем по альбому: ${selectedAlbum.title} (ID: ${selectedAlbum.id})`);
      filtered = filtered.filter(song => song.album === selectedAlbum.id);
    }

    if (searchTerm) {
      console.log(`🔍 Фильтруем по поиску: "${searchTerm}"`);
      filtered = filtered.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    console.log('✅ Отфильтрованные песни:', filtered);
    setFilteredSongs(filtered);
  }, [songs, selectedArtist, selectedAlbum, searchTerm]);

  return (
    <div className="songs-container">
      {loading ? (
        <p className="loading-text">Загрузка песен...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <>
          <div className="artist-banner-wrapper">
            {selectedAlbum ? (
              <div className="artist-banner">
                <div className="artist-image-container">
                  <img src={selectedAlbum.image} alt={selectedAlbum.title} className="artist-image" />
                </div>
                <div className="artist-info">
                  <h1 className="artist-name">{selectedAlbum.title}</h1>
                </div>
              </div>
            ) : selectedArtist ? (
              <div className="artist-banner">
                <div className="artist-image-container">
                  <img src={selectedArtist.image} alt={selectedArtist.name} className="artist-image" />
                </div>
                <div className="artist-info">
                  <span className="verified-artist">Подтвержденный исполнитель</span>
                  <h1 className="artist-name">{selectedArtist.name}</h1>
                  <p className="listeners-count">
                    {selectedArtist.listeners} слушателя за месяц
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <h2 className="popular-songs-title">Популярные треки</h2>

          <div className="songs-list">
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song, index) => {
                return (
                  <div
                    role="button"
                    tabIndex={0}
                    className="song-row"
                    key={song.id}
                    onClick={() => onSelectSong(song)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onSelectSong(song);
                      }
                    }}
                  >
                    <span className="song-rank">{index + 1}</span>
                    <img src={song.image} alt={song.title} className="song-cover" />
                    <div className="song-info">
                      <span className="song-title">{song.title}</span>
                    </div>
                    <span className="song-plays">{parseInt(song.plays).toLocaleString()}</span>
                    <span className="song-duration">{song.duration}</span>
                  </div>
                );
              })
            ) : (
              <div className="no-songs-container">
                <p className="no-songs">Нет доступных песен</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Songs;
