import React from "react";
import "./SpotifyInfo.css";

const SpotifyInfo: React.FC = () => {
  return (
    <div className="spotify-info-container">
      <div className="spotify-card">
        <img 
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" 
          alt="Spotify Logo" 
          className="spotify-card-image" 
        />

        <div className="spotify-card-info">
          <h2 className="spotify-title">Добро пожаловать в Spotify</h2>
          <p className="spotify-description">
            Откройте для себя миллионы песен, подкастов и плейлистов на любой вкус.
          </p>
        </div>
      </div>

      {/* 🔥 Дополнительный блок с информацией */}
      <div className="about-container">
        <p className="about-text">
          Spotify — это крупнейший в мире музыкальный стриминговый сервис с миллионами пользователей по всему миру. 
          <p>Мы помогаем находить музыку, создавать плейлисты и наслаждаться любимыми треками в любое время.</p>
        </p>
        
        {/* 🔥 Красивая кнопка */}
        <button 
          className="learn-more-button"
          onClick={() => window.open("https://www.spotify.com", "_blank")}
        >
          Узнать больше
        </button>
      </div>
    </div>
  );
};

export default SpotifyInfo;
