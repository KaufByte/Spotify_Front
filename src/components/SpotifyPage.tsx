// import React, { useState, useEffect } from 'react';
// import Songs, { Artist, Song } from './Songs'; 
// import './AlbumCard.css';
// import SongInfo from "./SongInfo";
// import AudioPlayer from './AudioPlayer'; 
// import Layout from './Layout'; 
// import { Album } from './AlbumCard'; 
// import songsData from '../server/db.json'; 
// import AlbumCard from './AlbumCard';
// import Artists from './Artists';
// import SpotifyInfo from "./SpotifyInfo";

// import './SpotifyPage.css';

// const SpotifyPage: React.FC = () => {
//   const [selectedSong, setSelectedSong] = useState<Song | null>(null);
//   const [artists, setArtists] = useState<Artist[]>([]);
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>(''); 
//   const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
//   const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
//   const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

//   useEffect(() => {
//     setArtists(
//       songsData.artists.map(artist => ({
//         ...artist,
//         id: Number(artist.id), // 🔥 Преобразуем id в число
//       }))
//     );
  
//     setAlbums(
//       songsData.albums.map(album => ({
//         ...album,
//         id: Number(album.id), // 🔥 Преобразуем в число
//         artistId: Number(album.artistId), // 🔥 Преобразуем в число
//         songs: album.songs.map(songId => Number(songId)), // 🔥 Преобразуем массив ID песен в числа
//       }))
//     );
//   }, []);
  
  

//   const handleSelectArtist = (artist: Artist) => {
//     console.log("Выбран артист:", artist);
//     setSelectedArtist(artist);
  
//     const songsByArtist: Song[] = songsData.songs
//       .filter(song => Number(song.artistId) === Number(artist.id)) // Преобразуем в число
//       .map(song => ({
//         ...song,
//         id: Number(song.id), // 🔥 Преобразуем в число
//         artistId: Number(song.artistId), // 🔥 Преобразуем в число
//         albumId: Number(song.albumId), // 🔥 Преобразуем в число
//         plays: song.plays ?? "0", // Если plays нет, задаём "0"
//         duration: song.duration ?? "0:00" // Если duration нет, задаём "0:00"
//       }));

//     console.log("✅ Отфильтрованные песни:", songsByArtist);
//     setFilteredSongs(songsByArtist);
//   };
  
//   const handleSongChange = (songId: number) => {
//     const newSong = filteredSongs.find(song => song.id === songId);
//     if (newSong) {
//       setSelectedSong(newSong);
//     }
//   };
//   const handleSelectAlbum = (album: Album) => {
//     console.log("Выбран альбом:", album);
//     setSelectedAlbum(album);
//     setSelectedArtist(null);
  
//     const songsByAlbum: Song[] = songsData.songs
//       .filter(song => Number(song.albumId) === Number(album.id)) // 🔥 Приводим к числу
//       .map(song => ({
//         ...song,
//         id: Number(song.id), // 🔥 Приводим id к числу
//         artistId: Number(song.artistId), // 🔥 Приводим artistId к числу
//         albumId: Number(song.albumId), // 🔥 Приводим albumId к числу
//         plays: song.plays ?? "0", // Оставляем строкой, если нужно
//         duration: song.duration ?? "0:00"
//       }));
  
//     setFilteredSongs(songsByAlbum);
//   };
  
//   return (
//     <div className="main-page">
//       <div className="app-container">
//         <Layout setSearchTerm={setSearchTerm} /> 
        
//         {/* 🔥 Колонка выбора исполнителей */}
//         <div className="artists-container">
//           <Artists artists={artists} onSelectArtist={handleSelectArtist} />
//         </div>

//         {/* 🔥 Если выбран артист - показываем его песни, иначе альбомы */}
//         {selectedArtist ? (
//           <Songs
//             onSelectSong={setSelectedSong}
//             artists={artists}
//             searchTerm={searchTerm}
//             songs={filteredSongs}
//             selectedArtist={selectedArtist}
//           />
//         ) : selectedAlbum ? (
//           <Songs
//             onSelectSong={setSelectedSong}
//             artists={artists}
//             searchTerm={searchTerm}
//             songs={filteredSongs}
//             selectedAlbum={selectedAlbum}
//           />
//         ) : (
//           <div className="albums-container">
//             <h1 className="albums-header">Альбомы с треками, которые тебе нравятся</h1> 
//             <div className="albums-list">
//               {albums.map(album => (
//                 <AlbumCard key={album.id} album={album} onSelectAlbum={() => handleSelectAlbum(album)} />
//               ))}
//             </div>

//             <h1 className="popular-artists-header">Популярные исполнители</h1>
//             <div className="popular-artists-list">
//               {artists.map(artist => (
//                 <div className="popular-artist-card" key={artist.id} onClick={() => handleSelectArtist(artist)}>
//                   <img src={artist.image} alt={artist.name} className="popular-artist-image" />
//                   <h3 className="popular-artist-name">{artist.name}</h3>
//                   <p className="popular-artist-listeners">{artist.listeners} слушателя</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
        
//         {/* 🔥 Блок информации о песне */}
//         <div className="content">
//           {selectedSong ? (
//             <SongInfo song={selectedSong} artists={artists} />
//           ) : (
//             <SpotifyInfo />
//           )}
//         </div>
//         {/* 🔥 Аудиоплеер */}
//         {selectedSong && (
//           <AudioPlayer 
//             songSrc={selectedSong?.musicFile || ""}
//             songImage={selectedSong?.image || ""}
//             songTitle={selectedSong?.title || ""}
//             artistName={artists.find(a => a.id === selectedSong?.artistId)?.name || ""}
//             currentSongId={selectedSong?.id || null} 
//             fullscreenImage={selectedSong?.fullscreenImage || ""}
//             songs={filteredSongs} 
//             onSongChange={handleSongChange}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpotifyPage;
import React, { useState, useEffect } from 'react';
import Songs, { Artist, Song } from './Songs'; 
import './AlbumCard.css';
import SongInfo from "./SongInfo";
import AudioPlayer from './AudioPlayer'; 
import Layout from './Layout'; 
import { Album } from './AlbumCard'; 
import AlbumCard from './AlbumCard';
import Artists from './Artists';
import SpotifyInfo from "./SpotifyInfo";

import './SpotifyPage.css';

const API_URL = 'https://spotify-update.onrender.com/api/';

const SpotifyPage: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  
  useEffect(() => {
    console.log("📡 Загружаем данные с API...");

    Promise.all([
      fetch(`${API_URL}artists/`).then(res => res.json()),
      fetch(`${API_URL}albums/`).then(res => res.json()),
      fetch(`${API_URL}songs/`).then(res => res.json())      
    ])
    .then(([fetchedArtists, fetchedAlbums, fetchedSongs]: [Artist[], Album[], Song[]]) => {
        console.log("🎤 Исполнители загружены:", fetchedArtists);
        console.log("📀 Альбомы загружены:", fetchedAlbums);
        console.log("🎵 Песни загружены:", fetchedSongs);

        setArtists(fetchedArtists);

        const albumsWithArtistName = fetchedAlbums.map((album: Album) => {
            const artist = fetchedArtists.find((a: Artist) => a.id === album.artist);
            return { ...album, artistName: artist ? artist.name : "Неизвестный исполнитель" };
        });

        setAlbums(albumsWithArtistName);
        setSongs(fetchedSongs);
        setFilteredSongs(fetchedSongs);
    })
    .catch(err => console.error("❌ Ошибка загрузки данных:", err));
  }, []);

  const handleSelectArtist = (artist: Artist) => {
    console.log("🎤 Выбран артист:", artist);
    setSelectedArtist(artist);
    setSelectedAlbum(null);

    if (!songs || songs.length === 0) {
        console.warn("⚠️ `songs` пуст! Не удалось найти песни исполнителя.");
        return;
    }

    const songsByArtist = songs.filter(song => song.artist === artist.id);
    console.log("🎵 Найдено песен:", songsByArtist);
    
    if (songsByArtist.length === 0) {
        console.warn("⚠️ У исполнителя нет песен.");
        setFilteredSongs([]); 
        setSelectedSong(null);
    } else {
        setFilteredSongs(songsByArtist);
        setSelectedSong(songsByArtist[0]);
    }
  };

  const handleSelectAlbum = (album: Album) => {
    console.log("📀 Выбран альбом:", album);

    if (!songs || songs.length === 0) {
        console.error("❌ Ошибка: `songs` пуст, не можем фильтровать!");
        return;
    }

    setSelectedAlbum(album);
    setSelectedArtist(null);

    const songsByAlbum = songs.filter(song => song.album === album.id);
    console.log("🎵 Найдено песен в альбоме:", songsByAlbum);

    if (songsByAlbum.length === 0) {
        console.warn("⚠️ В этом альбоме нет песен!");
        setFilteredSongs([]);
        setSelectedSong(null);
    } else {
        setFilteredSongs(songsByAlbum);
        setSelectedSong(songsByAlbum[0]);
    }
  };


  const handleSongChange = (songId: number) => {
    const newSong = filteredSongs.find(song => song.id === songId);
    if (newSong) {
      console.log("🎶 Переключаем трек на:", newSong);
      setSelectedSong(newSong);
    } else {
      console.warn("⚠️ Трек не найден в `filteredSongs`:", songId);
    }
  };

  useEffect(() => {
    if (filteredSongs.length > 0) {
        setSelectedSong(filteredSongs[0]); 
    } else {
        setSelectedSong(null);
    }
}, [filteredSongs]);


  return (
    <div className="main-page">
      <div className="app-container">
        <Layout setSearchTerm={setSearchTerm} /> 

        <div className="artists-container">
          <Artists artists={artists} onSelectArtist={handleSelectArtist} />
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
            <SongInfo song={selectedSong} artists={artists} />
          ) : (
            <SpotifyInfo />
          )}
        </div>

        {selectedSong && (
          <AudioPlayer 
            songSrc={selectedSong?.music_file_url || ""}
            songImage={selectedSong?.image || ""}
            songTitle={selectedSong?.title || ""}
            artistName={artists.find(a => a.id === selectedSong?.artist)?.name || ""}
            currentSongId={selectedSong?.id || null} 
            fullscreen_image={selectedSong?.fullscreen_image || ""}  
            songs={filteredSongs.map(song => ({
                id: song.id,
                musicFile: song.music_file_url || "", 
                fullscreen_image: song.fullscreen_image || "", 
            }))}
            onSongChange={handleSongChange}
        />
        )}
      </div>
    </div>
  );
};

export default SpotifyPage;
