export interface EducationEntry {
  id: string;
  degree: string;
  degreeShort: string;
  institution: string;
  location: string;
  period: string;
  yearStart: number;
  yearEnd: number | null;
  current: boolean;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  yearStart: number;
  yearEnd: number | null;
  current: boolean;
}

export interface LangEntry {
  id: string;
  language: string;
  languageES: string;
  level: string;
  levelES: string;
  code: string;
}

export interface CertEntry {
  id: string;
  title: string;
}

export interface Resume {
  name: string;
  alias: string;
  level: number;
  born: string;
  role: string;
  roleES: string;
  location: string;
  github: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  languages: LangEntry[];
  certifications: CertEntry[];
}

export const resume: Resume = {
  name: 'Hector Villanueva Tomas',
  alias: 'ShikaTheRock',
  level: 19,
  born: '21/07/2007',
  role: 'IT Student',
  roleES: 'Estudiante de IT',
  location: 'Valencia, Spain',
  github: 'https://github.com/ShikaTheRock',

  education: [
    {
      id: 'asir',
      degree: 'Ciclo Formativo de Grado Superior — Administración de Sistemas Informáticos en Red',
      degreeShort: 'ASIR',
      institution: 'IES La Sénia',
      location: 'Valencia, Spain',
      period: 'September 2025 – May 2027',
      yearStart: 2025,
      yearEnd: 2027,
      current: true,
    },
    {
      id: 'smr',
      degree: 'Ciclo Formativo de Grado Medio — Sistemas Microinformáticos y Redes',
      degreeShort: 'SMR',
      institution: 'IES La Sénia',
      location: 'Valencia, Spain',
      period: 'September 2023 – June 2025',
      yearStart: 2023,
      yearEnd: 2025,
      current: false,
    },
  ],

  experience: [
    {
      id: 'creatic',
      role: 'Técnico de Infraestructura y DevOps',
      company: 'Creatic - Tecnología Creativa',
      location: 'Valencia, Spain',
      period: 'June 2026 – Present',
      yearStart: 2026,
      yearEnd: null,
      current: true,
    },
    {
      id: 'milano',
      role: 'Reparación de equipos informáticos',
      company: 'Centro Telefonia Mobile Milano',
      location: 'Milan, Italy',
      period: 'March 2025 – August 2025',
      yearStart: 2025,
      yearEnd: 2025,
      current: false,
    },
  ],

  languages: [
    { id: 'va', language: 'Valencian', languageES: 'Valenciano', level: 'Native / Bilingual', levelES: 'Nativo / Bilingüe', code: 'VAL' },
    { id: 'es', language: 'Spanish', languageES: 'Español', level: 'Native / Bilingual', levelES: 'Nativo / Bilingüe', code: 'ES' },
    { id: 'en', language: 'English', languageES: 'Inglés', level: 'Professional Working', levelES: 'Nivel profesional de trabajo', code: 'EN' },
  ],

  certifications: [
    {
      id: 'android-repair',
      title: 'Curso Intermedio de reparación de móviles Android',
    },
  ],
};
