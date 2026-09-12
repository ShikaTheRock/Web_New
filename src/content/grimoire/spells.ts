export type SpellStatus = 'cast' | 'scribing' | 'conceived';

export interface Spell {
  id: string;
  number: string;
  name: string;
  nameES: string;
  school: string;
  schoolES: string;
  status: SpellStatus;
  description: string;
  descriptionES: string;
  tech: string[];
  github?: string;
  liveUrl?: string;
}

export const spells: Spell[] = [
  {
    id: 'spell-001',
    number: '001',
    name: 'Reverse Polish Notation Calculator',
    nameES: 'Calculadora en Notación Polaca Inversa',
    school: 'Computation',
    schoolES: 'Computación',
    status: 'cast',
    description: 'A Python GUI calculator using Reverse Polish Notation.',
    descriptionES: 'Una calculadora con interfaz gráfica en Python que usa Notación Polaca Inversa.',
    tech: ['Python', 'tkinter'],
    github: 'https://github.com/ShikaTheRock',
  },
  {
    id: 'spell-002',
    number: '002',
    name: 'Markdown Field Manual',
    nameES: 'Manual de Campo Markdown',
    school: 'Documentation',
    schoolES: 'Documentación',
    status: 'scribing',
    description: 'A Markdown tutorial currently in development.',
    descriptionES: 'Un tutorial de Markdown actualmente en desarrollo.',
    tech: ['Markdown'],
    github: 'https://github.com/ShikaTheRock',
  },
];
