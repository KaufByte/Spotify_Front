import React, { useState, useEffect, useMemo } from "react";
import Songs, { Artist, Song } from "./Songs";
import SongInfo from "./SongInfo";
import AudioPlayer from "./AudioPlayer";
import Layout from "./Layout";
import AlbumCard, { Album } from "./AlbumCard";
import Artists from "./Artists";
import SpotifyInfo from "./SpotifyInfo";
import "./SpotifyPage.css";

const BASE_URL = import.meta.env.VITE_API_URL || "https://spotify-update.onrender.com/api/";

const SpotifyPage: React.FC = () => {
  // Состояние
  const [userId, setUserId] = useState<string>("");
  const [userFavorites, setUserFavorites] = useState<number[]>([]);
  const [userSubscriptions, setUserSubscriptions] = useState<number[]>([]);

  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ⚡ Загружаем данные пользователя и очищаем прошлые
  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem("userEmail");

      // Очищаем данные перед загрузкой нового пользователя
      setUserId("");
      setUserFavorites([]);
      setUserSubscriptions([]);

      if (!email) return;

      const res = await fetch(`${BASE_URL}users/?email=${email}`);
      const users = await res.json();
      const user = users.find((u: any) => u.email === email);

      if (user) {
        setUserId(user.id);
        setUserFavorites(user.favorite_songs || []);
        setUserSubscriptions(user.subscribed_artists || []);
      }
    };

    fetchUser();
  }, [localStorage.getItem("userEmail")]); // Будет реагировать на смену email

  // ⚡ Загружаем базу данных (глобальные сущности)
  useEffect(() => {
    Promise.all([
      fetch(`${BASE_URL}artists/`).then((res) => res.json()),
      fetch(`${BASE_URL}albums/`).then((res) => res.json()),
      fetch(`${BASE_URL}songs/`).then((res) => res.json())
    ])
      .then(([artists, albums, songs]) => {
        setArtists(artists);
        setAlbums(albums);
        setSongs(songs);
        setFilteredSongs(songs);
      })
      .catch((err) => console.error("Ошибка загрузки данных:", err));
  }, []);

  // ✅ Обновление данных только для этого user
  const refreshUser = async () => {
    if (!userId) {
      setUserFavorites([]);
      setUserSubscriptions([]);
      return;
    }

    const res = await fetch(`${BASE_URL}users/${userId}/`);
    if (!res.ok) {
      setUserFavorites([]);
      setUserSubscriptions([]);
      return;
    }
    const user = await res.json();
    setUserFavorites(user.favorite_songs || []);
    setUserSubscriptions(user.subscribed_artists || []);
  };

  // ➕ / ➖ избранное
  const toggleFavorite = async (songId: number) => {
    await fetch(`${BASE_URL}users/${userId}/toggle-song/${songId}/`, { method: "POST" });
    refreshUser();
  };

  // ➕ / ➖ подписка
  const toggleSubscribe = async (artistId: number) => {
    await fetch(`${BASE_URL}users/${userId}/toggle-artist/${artistId}/`, { method: "POST" });
    refreshUser();
  };

  // Выбор артистов и альбомов
  const handleSelectArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setSelectedAlbum(null);
    const artistSongs = songs.filter(song => song.artist === artist.id);
    setFilteredSongs(artistSongs);
    setSelectedSong(artistSongs[0] || null);
  };

  const handleSelectAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setSelectedArtist(null);
    const albumSongs = songs.filter(song => song.album === album.id);
    setFilteredSongs(albumSongs);
    setSelectedSong(albumSongs[0] || null);
  };

  // 🟣 Мемоизация
  const favoriteSongs = useMemo(() => songs.filter(song => userFavorites.includes(song.id)), [songs, userFavorites]);
  const subscribedArtists = useMemo(() => artists.filter(a => userSubscriptions.includes(a.id)), [artists, userSubscriptions]);

  return (
    <div className="main-page">
      <div className="app-container">
        <Layout setSearchTerm={setSearchTerm} />

        <div className="artists-container">
          <Artists
            subscribedArtists={subscribedArtists}
            favoriteSongs={favoriteSongs}
            onSelectArtist={handleSelectArtist}
            onSelectSong={setSelectedSong}
          />
        </div>

        {selectedArtist ? (
          <Songs
            onSelectSong={setSelectedSong}
            artists={artists}
            searchTerm={searchTerm}
            songs={filteredSongs}
            selectedArtist={selectedArtist}
          />
        ) : selectedAlbum ? (
          <Songs
            onSelectSong={setSelectedSong}
            artists={artists}
            searchTerm={searchTerm}
            songs={filteredSongs}
            selectedAlbum={selectedAlbum}
          />
        ) : (
          <div className="albums-container">
            <h1 className="albums-header">Альбомы с треками, которые тебе нравятся</h1>
            <div className="albums-list">
              {albums.map(album => (
                <AlbumCard key={album.id} album={album} onSelectAlbum={() => handleSelectAlbum(album)} />
              ))}
            </div>

            <h1 className="popular-artists-header">Популярные исполнители</h1>
            <div className="popular-artists-list">
              {artists.map(artist => (
                <div className="popular-artist-card" key={artist.id} onClick={() => handleSelectArtist(artist)}>
                  <img src={artist.image} alt={artist.name} className="popular-artist-image" />
                  <h3 className="popular-artist-name">{artist.name}</h3>
                  <p className="popular-artist-listeners">{artist.listeners} слушателя</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="content">
          {selectedSong ? (
            <SongInfo
              song={selectedSong}
              artists={artists}
              favoriteSongIds={userFavorites}
              subscribedArtistIds={userSubscriptions}
              onToggleFavorite={toggleFavorite}
              onToggleSubscribe={toggleSubscribe}
            />
          ) : (
            <SpotifyInfo />
          )}
        </div>

        {selectedSong && (
          <AudioPlayer
            songSrc={selectedSong.music_file_url || ""}
            songImage={selectedSong.image || ""}
            songTitle={selectedSong.title || ""}
            artistName={artists.find((a) => a.id === selectedSong.artist)?.name || ""}
            currentSongId={selectedSong.id || null}
            fullscreen_image={selectedSong.fullscreen_image || ""}
            songs={filteredSongs.map(song => ({
              id: song.id,
              musicFile: song.music_file_url || "",
              fullscreen_image: song.fullscreen_image || "",
            }))}
            onSongChange={(id) => setSelectedSong(filteredSongs.find(s => s.id === id) || null)}
          />
        )}
      </div>
    </div>
  );
};

export default SpotifyPage;
