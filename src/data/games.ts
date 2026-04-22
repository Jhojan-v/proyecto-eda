import type { CategoryNode, Game } from '../types'

export const games: Game[] = [
  {
    id: 'stardew-valley',
    title: 'Stardew Valley',
    category: 'Simulación',
    description: 'Una granja acogedora con progreso tranquilo, pixel art y misiones relajadas.',
    price: 14.99,
    discount: '-20%',
    tags: ['Cozy', 'Indie', 'Farming'],
  },
  {
    id: 'hades',
    title: 'Hades',
    category: 'Acción',
    description: 'Roguelike frenético con combates fluidos, narrativa dinámica y arte vibrante.',
    price: 24.99,
    discount: '-35%',
    tags: ['Roguelike', 'Mitología', 'Hack & Slash'],
  },
  {
    id: 'celeste',
    title: 'Celeste',
    category: 'Plataformas',
    description: 'Plataformas de precisión con una historia sensible y ritmo impecable.',
    price: 11.99,
    discount: '-40%',
    tags: ['Precision', 'Pixel Art', 'Narrativa'],
  },
  {
    id: 'spiritfarer',
    title: 'Spiritfarer',
    category: 'Aventura',
    description: 'Gestión y exploración en un viaje emotivo con dirección artística pastel.',
    price: 19.99,
    discount: '-25%',
    tags: ['Adventure', 'Management', 'Emotional'],
  },
]

export const categoryTree: CategoryNode = {
  title: 'Categorías',
  link: '#categorias',
  children: [
    {
      title: 'Acción',
      link: '#accion',
      children: [
        { title: 'Roguelike', link: '#roguelike' },
        { title: 'Soulslike', link: '#soulslike' },
      ],
    },
    {
      title: 'Aventura',
      link: '#aventura',
      children: [
        { title: 'Narrativa', link: '#narrativa' },
        { title: 'Exploración', link: '#exploracion' },
      ],
    },
    {
      title: 'Simulación',
      link: '#simulacion',
      children: [
        { title: 'Farming', link: '#farming' },
        { title: 'Tycoon', link: '#tycoon' },
      ],
    },
    {
      title: 'Multijugador',
      link: '#multijugador',
      children: [
        { title: 'Co-op', link: '#coop' },
        { title: 'Competitivo', link: '#competitivo' },
      ],
    },
  ],
}
