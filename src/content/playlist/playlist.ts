// ── SHIKA OS — Song of the Day Playlist ───────────────────────────────────
// Songs are drawn from personal music interests.
// todayIndex = getDayOfYear() % playlist.length  (stable per day)
// audioSrc: path to public/audio/*.mp3 — set to null if no file available.

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration?: string;    // "3:47" display format
  audioSrc: string | null;
  genre?: string;
}

export const playlist: Song[] = [
  {
    id: 'nujabes-featherfoot',
    title: 'Feather',
    artist: 'Nujabes ft. Cise Starr',
    album: 'Modal Soul',
    duration: '5:28',
    audioSrc: null,
    genre: 'Jazz Hip-Hop',
  },
  {
    id: 'mfdoom-rhinestone',
    title: 'Rhinestone Cowboy',
    artist: 'MF DOOM',
    album: 'MM..FOOD',
    duration: '4:51',
    audioSrc: null,
    genre: 'Hip-Hop',
  },
  {
    id: 'nujabes-aruarian',
    title: 'Aruarian Dance',
    artist: 'Nujabes',
    album: 'Hydeout Productions 1st Collection',
    duration: '5:17',
    audioSrc: null,
    genre: 'Jazz Hip-Hop',
  },
  {
    id: 'extremoduro-la-historia',
    title: 'La Historia de Juan Palomo',
    artist: 'Extremoduro',
    album: 'Agila',
    duration: '4:02',
    audioSrc: null,
    genre: 'Rock',
  },
  {
    id: 'mfdoom-accordion',
    title: 'Accordion',
    artist: 'Madvillain',
    album: 'Madvillainy',
    duration: '2:21',
    audioSrc: null,
    genre: 'Hip-Hop',
  },
  {
    id: 'nujabes-mystline',
    title: 'Mystline',
    artist: 'Nujabes',
    album: 'Metaphorical Music',
    duration: '4:28',
    audioSrc: null,
    genre: 'Jazz Hip-Hop',
  },
  {
    id: 'extremoduro-jardin',
    title: 'Jardín de los presentes',
    artist: 'Extremoduro',
    album: 'Agila',
    duration: '5:11',
    audioSrc: null,
    genre: 'Rock',
  },
];
