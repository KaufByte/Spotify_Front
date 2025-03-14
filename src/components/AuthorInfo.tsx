import React from 'react';
import { Artist } from './Songs';
import './AuthorInfo.css';

interface AuthorInfoProps {
  artist: Artist;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ artist }) => {
  return (
    <div className="author-info-container">
      <div className="author-info">
        <div
          className="author-image-container"
          style={{ backgroundImage: `url(${artist.image})` }}
        >
          <div className="author-overlay">
            <div className="author-label">Об исполнителе</div>
          </div>
        </div>

        <div className="artist-info-container">
          <div className="artist-name-section">
            <span className="artist-name">{artist.name}</span>
          </div>
          <div className="artist-stats-section">
            <div className="artist-listeners">{artist.listeners} слушателей за месяц</div>
            <a 
              className="subscribe-button" 
              href={artist.link} 
              tabIndex={0} 
              role="button" 
              aria-label="Подписаться" 
            >
              Подписаться
            </a>
          </div>
          <div className="artist-description">
            {artist.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
