import React, { useRef, useState, useEffect } from 'react';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import './AudioPlayer.css';

interface AudioPlayerProps {
  songSrc: string | null;
  songImage: string | null;
  songTitle: string | null;
  artistName: string | null;
  currentSongId: number | null;
  fullscreen_image: string | null;  // ✅ исправлено!
  songs: { id: number; musicFile: string; fullscreen_image: string }[];  // ✅ исправлено!
  onSongChange: (songId: number) => void;
}


const AudioPlayer: React.FC<AudioPlayerProps> = ({
  songSrc,
  songImage,
  songTitle,
  artistName,
  currentSongId,
  fullscreen_image,
  songs,
  onSongChange,
}) => {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);

  
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      console.log('⏸ Пауза аудио');
      audioRef.current.pause();
    } else {
      console.log('▶ Воспроизведение аудио');
      audioRef.current
        .play()
        .catch((error) => console.error('❌ Ошибка воспроизведения:', error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      console.log('⏩ Текущее время:', audioRef.current.currentTime);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    console.log('🔊 Изменение громкости:', newVolume);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  const waitForAudioReady = async (audioElement: HTMLAudioElement) => {
    return new Promise<void>((resolve) => {
      const checkReadyState = () => {
        if (audioElement.readyState === 4) {
          console.log("✅ Трек полностью загружен!");
          resolve();
        } else {
          console.warn("⏳ Трек ещё загружается...");
          setTimeout(checkReadyState, 100); 
        }
      };
      checkReadyState();
    });
  };

  useEffect(() => {
    if (!audioRef.current || !songSrc) return;
  
    console.log("🎵 Загружаем трек:", songSrc);
    audioRef.current.src = songSrc;
    audioRef.current.load();

    const tryPlay = () => {
      audioRef.current!.play().then(() => {
        console.log("✅ Трек запущен автоматически");
        setIsPlaying(true);
        document.removeEventListener("click", tryPlay); 
      }).catch((error) => {
        console.warn("⚠️ Не удалось запустить трек, ждём взаимодействия", error);
      });
    };
  
    document.addEventListener("click", tryPlay);
  }, [songSrc]);
  

  const getRandomSongId = () => {
    let randomSongId;
    do {
      const randomIndex = Math.floor(Math.random() * songs.length);
      randomSongId = songs[randomIndex].id;
    } while (randomSongId === currentSongId);
    console.log('🔀 Случайный ID:', randomSongId);
    return randomSongId;
  };

  const handleSkipNext = () => {
    console.log("⏭ handleSkipNext вызван");
    if (!audioRef.current || songs.length === 0) return;
  
    let nextSongId;
    if (isShuffling && currentSongId !== null) {
      nextSongId = getRandomSongId(); 
    } else {
      const currentIndex = songs.findIndex((song) => song.id === currentSongId);
      nextSongId = currentIndex === songs.length - 1 ? songs[0].id : songs[currentIndex + 1].id;
    }
  
    console.log("⏭ Переключаемся на:", nextSongId);
    onSongChange(nextSongId);

    const nextSong = songs.find((s) => s.id === nextSongId);
    if (audioRef.current && nextSong) {
      audioRef.current.src = nextSong.musicFile;
      audioRef.current.load();
      audioRef.current.play().catch((err) => console.warn("⚠️ Ошибка при запуске:", err));
    }
  };
  
  
  const handleSkipPrevious = async () => {
    console.log("⏮ handleSkipPrevious вызван");
    if (!audioRef.current) return;
  
    if (isShuffling && currentSongId !== null) {
      const newId = getRandomSongId();
      console.log("⏮ (Шафл) Меняем трек на:", newId);
      await waitForAudioReady(audioRef.current);
      onSongChange(newId);
    } else if (currentSongId !== null) {
      const currentIndex = songs.findIndex((song) => song.id === currentSongId);
      const previousIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
      console.log("⏮ (Обычный) Меняем трек на:", songs[previousIndex].id);
      await waitForAudioReady(audioRef.current);
      onSongChange(songs[previousIndex].id);
    }
  };
  const handleRepeatToggle = () => {
    console.log('🔁 handleRepeatToggle:', !isRepeating);
    setIsRepeating((prev) => !prev);
  };

  const handleShuffleToggle = () => {
    console.log('🔀 handleShuffleToggle:', !isShuffling);
    setIsShuffling((prev) => !prev);
  };


  const handleEnded = () => {
    console.log("⏹ Трек закончился");
    if (!audioRef.current) return;
  
    if (isRepeating) {
      console.log("🔁 Повтор трека");
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      return;
    }
  
    handleSkipNext(); 
  };
  


  const toggleFullscreen = () => {
    console.log('🖥 toggleFullscreen');
    if (!isFullscreen) {
      if (playerRef.current) {
        playerRef.current.requestFullscreen().catch((err) => {
          console.error('❌ Ошибка включения fullscreen:', err);
        });
      }
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('❌ Ошибка выхода fullscreen:', err);
      });
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        console.log('🖥 Выключили fullscreen');
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);


  useEffect(() => {
    if (!audioRef.current || !songSrc) return;
  
    console.log("🎵 Загружаем новый трек:", songSrc);
  
    audioRef.current.pause();
    audioRef.current.src = songSrc;
    audioRef.current.load(); 
  
    const onCanPlay = () => {
      console.log("✅ Трек полностью загружен, начинаем воспроизведение");
      audioRef.current?.play().catch((err) => console.warn("⚠️ Ошибка play():", err));
    };
  
    audioRef.current.addEventListener("canplaythrough", onCanPlay);
  
    return () => {
      audioRef.current?.removeEventListener("canplaythrough", onCanPlay);
    };
  }, [songSrc]);
  useEffect(() => {
    localStorage.setItem("isPlaying", String(isPlaying)); // ✅ Обновляем `isPlaying` в `localStorage`
  }, [isPlaying]);
  

  return (
    <div className={`spotify-player ${isFullscreen ? 'fullscreen' : ''}`} ref={playerRef}>
     <audio
        ref={audioRef}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            console.log('📏 Длительность загружена:', audioRef.current.duration);
            setCurrentTime(0);
          }
        }}
        onEnded={handleEnded}
      />


      {/* Информация о треке */}
      <div className="track-info">
        {songImage && <img src={songImage} className="track-image" alt="track" />}
        <div className="track-details">
          <span className="track-title">{songTitle}</span>
          <span className="track-artist">{artistName}</span>
        </div>
      </div>

      {/* Основные кнопки управления */}
      <div className="player-controls">
        <ShuffleIcon
          className={`icon ${isShuffling ? 'active' : 'inactive'}`}
          onClick={handleShuffleToggle}
        />
        <SkipPreviousIcon className="icon arrow" onClick={handleSkipPrevious} />

        {isPlaying ? (
          <PauseCircleFilledIcon className="icon play-pause" onClick={togglePlay} />
        ) : (
          <PlayCircleFilledWhiteIcon className="icon play-pause" onClick={togglePlay} />
        )}

        <SkipNextIcon className="icon arrow" onClick={handleSkipNext} />
        <RepeatIcon
          className={`icon ${isRepeating ? 'active' : 'inactive'}`}
          onClick={handleRepeatToggle}
        />
      </div>

      {/* Прогресс-бар */}
      <div className="progress-bar">
        <span>
          {Math.floor(currentTime / 60)}:
          {Math.floor(currentTime % 60).toString().padStart(2, '0')}
        </span>

        <input
          type="range"
          min="0"
          max={audioRef.current?.duration || 100}
          value={currentTime}
          onChange={(e) => {
            const newTime = parseFloat(e.target.value);
            console.log('➡️ Перемотка на', newTime);
            if (audioRef.current) {
              audioRef.current.currentTime = newTime;
            }
          }}
        />

        <span>
          {Math.floor((audioRef.current?.duration || 0) / 60)}:
          {Math.floor((audioRef.current?.duration || 0) % 60)
            .toString()
            .padStart(2, '0')}
        </span>

        {/* Кнопки справа */}
        <div className="right-controls">
          <VolumeUpIcon className="icon" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
          <FullscreenIcon className="icon" onClick={toggleFullscreen} />
        </div>
      </div>

      {/* Оверлей во весь экран */}
      {isFullscreen && fullscreen_image && fullscreen_image !== "" && (
          <div className="fullscreen-overlay">
            <img src={fullscreen_image} alt="fullscreen" className="fullscreen-image" />
          </div>
      )}

    </div>
  );
};

export default AudioPlayer;
