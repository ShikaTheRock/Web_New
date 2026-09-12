import { useEffect, useRef } from 'react';
import { useAudioStore } from '../store/useAudioStore';
import { useI18nStore } from '../store/useI18nStore';
import './SongPlayer.css';

export function SongPlayer() {
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const volume = useAudioStore((s) => s.volume);
  const toggle = useAudioStore((s) => s.toggle);
  const setVolume = useAudioStore((s) => s.setVolume);
  const setAudioRef = useAudioStore((s) => s.setAudioRef);
  const getCurrentSong = useAudioStore((s) => s.getCurrentSong);
  const t = useI18nStore((s) => s.t);
  const audioRef = useRef<HTMLAudioElement>(null);
  const song = getCurrentSong();
  const canPlay = Boolean(song?.audioSrc);

  useEffect(() => {
    setAudioRef(audioRef.current);
  }, [setAudioRef]);

  return (
    <aside className="song-player" aria-label={t('os.songOfDay')}>
      <audio ref={audioRef} />
      <p className="song-player__label">{t('os.songOfDay')}</p>
      {song ? (
        <>
          <p className="song-player__title">{song.title}</p>
          <p className="song-player__artist">{song.artist}</p>
        </>
      ) : (
        <p className="song-player__title">{t('audio.noTrack')}</p>
      )}
      {!canPlay && <p className="song-player__offline">{t('audio.unavailable')}</p>}
      <div className="song-player__row">
        <button
          type="button"
          className="song-player__btn"
          onClick={toggle}
          disabled={!canPlay}
          aria-label={isPlaying ? t('audio.pause') : t('audio.play')}
        >
          {isPlaying ? t('audio.pause') : t('audio.play')}
        </button>
        <label className="song-player__vol">
          <span>{t('audio.volume')}</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label={t('audio.volume')}
          />
        </label>
      </div>
    </aside>
  );
}
