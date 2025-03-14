import React from 'react';
import { Song, Artist } from './Songs'; 
import './SongDetail.css';

interface SongDetailProps {
  song: Song | null;
  artists: Artist[]; 
}

const SongDetail: React.FC<SongDetailProps> = ({ song, artists }) => {
  const artist = song ? artists.find(artist => artist.id === song.artist) : null;

  return (
    <div className="song-detail">
      {!song ? (
        <>
          <img 
            src="https://www.the-paulmccartney-project.com/_images/wp-uploads/2023/12/Spotify_Logo_CMYK_Green-scaled.jpg" 
            alt="Spotify Logo" 
            className="song-detail-image"
          />
          <h2 className="song-detail-title">Выберите песню из списка</h2>
        </>
      ) : (
        <>
          <img 
            src={song.image ? song.image : "https://via.placeholder.com/400"} 
            alt={song.title} 
            className="song-detail-image" 
          />
          <h2 className="song-detail-title">{song.title}</h2>
          <p className="song-detail-artist">{artist && artist.name ? artist.name : 'Неизвестный артист'}</p>
        </>
      )}
    </div>
  );
  
};

export default SongDetail;
