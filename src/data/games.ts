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
  {
    id: 'Cyberpunk-2077',
    title: 'Cyberpunk 2077: Ultimate Edition',
    description: 'Un RPG de aventura y acción de mundo abierto ambientado en Night City, una megalópolis obsesionada con el poder y la modificación corporal.',
    price: 59.99,
    category: 'RPG',
    discount: '20%',
    tags: ['Mundo Abierto', 'Sci-Fi', 'Aventura']
  },
  {
    id: 'Elden-Ring',
    title: 'Elden Ring',
    description: 'Álzate, Sinluz, y déjate guiar por la gracia para esgrimir el poder del Círculo de Elden en las Tierras Intermedias. Un RPG de acción implacable.',
    price: 49.99,
    category: 'RPG',
    discount: '15%',
    tags: ['Souls-like', 'Fantasía Dark', 'Difícil']
  },
  {
    id: 'The-Witcher-3',
    title: 'The Witcher 3: Wild Hunt',
    description: 'Te han contratado para una misión crucial: encontrar a la niña de la profecía en un mundo de fantasía devastado por la guerra.',
    price: 39.99,
    category: 'RPG',
    discount: '50%',
    tags: ['Historia', 'Fantasía', 'Rol']
  },
  {
    id: 'Grand-Theft-Auto-V',
    title: 'Grand Theft Auto V',
    description: 'Cuando un joven estafador callejero, un ladrón de bancos retirado y un psicópata aterrador se ven involucrados, deben realizar una serie de peligrosos golpes.',
    price: 29.99,
    category: 'Acción',
    discount: '33%',
    tags: ['Mundo Abierto', 'Crimen', 'Multijugador']
  },
  {
    id: 'Hades-II',
    title: 'Hades II',
    description: 'Ábrete paso a golpes más allá del Inframundo utilizando magia negra para enfrentarte al mismísimo Titán del Tiempo en este rogue-like de acción.',
    price: 24.99,
    category: 'Acción',
    discount: '10%',
    tags: ['Rogue-like', 'Mitología', 'Acción']
  },
  {
    id: 'Doom-Eternal',
    title: 'Doom Eternal',
    description: 'Los ejércitos del infierno han invadido la Tierra. Conviértete en el Slayer en una épica campaña para un jugador para conquistar demonios e impedir la destrucción total.',
    price: 19.99,
    category: 'Acción',
    discount: '60%',
    tags: ['FPS', 'Gore', 'Banda Sonora']
  },
  {
    id: 'Age-of-Empires-IV',
    title: 'Age of Empires IV: Anniversary Edition',
    description: 'Uno de los juegos de estrategia en tiempo real más queridos regresa a su gloria, poniéndote en el centro de las batallas históricas que moldearon el mundo.',
    price: 39.99,
    category: 'Estrategia',
    discount: '25%',
    tags: ['RTS', 'Histórico', 'Táctico']
  },
  {
    id: 'Civilization-VI',
    title: 'Civilization VI',
    description: 'Un juego de estrategia por turnos en el que tu objetivo es construir un imperio que resista el paso del tiempo. Explora, expande, explota y extermina.',
    price: 59.99,
    category: 'Estrategia',
    discount: '75%',
    tags: ['Estrategia por Turnos', 'Gestión', '4X']
  },
  {
    id: 'Microsoft-Flight-Simulator',
    title: 'Microsoft Flight Simulator',
    description: 'Desde aviones ligeros hasta reactores de fuselaje ancho, vuela aeronaves altamente detalladas en un mundo increíblemente realista con clima dinámico.',
    price: 69.99,
    category: 'Simulación',
    discount: 'Novedad',
    tags: ['Simulador', 'Aviación', 'Fotorrealista']
  },
  {
    id: 'The-Sims-4',
    title: 'The Sims 4: Pack de Expansión',
    description: 'Desata tu imaginación y crea un mundo único de Sims a tu medida. Explora y personaliza cada detalle, desde los Sims hasta sus hogares.',
    price: 19.99,
    category: 'Simulación',
    discount: '40%',
    tags: ['Casual', 'Sandbox', 'Vida']
  },
  {
    id: 'EA-SPORTS-FC-26',
    title: 'EA SPORTS FC 26',
    description: 'La nueva entrega del juego mundial que ofrece la experiencia futbolística más fiel a la realidad con las mayores competiciones, clubes y estrellas del balompié.',
    price: 69.99,
    category: 'Deportes',
    discount: 'Novedad',
    tags: ['Fútbol', 'Competitivo', 'Deportes']
  },
  {
    id: 'Forza-Horizon',
    title: 'Forza Horizon 5',
    description: 'Lidera vibrantes expediciones por los cambiantes paisajes de un mundo abierto en México con una acción de conducción divertida e ilimitada en cientos de autos.',
    price: 49.99,
    category: 'Deportes',
    discount: '45%',
    tags: ['Carreras', 'Autos', 'Mundo Abierto']
  }
]

export const categoryTree: CategoryNode = {
  title: 'Categorias',
  link: '#categorias',
  children: [
    { title: 'Accion', link: '#accion', children: [{ title: 'Roguelike', link: '#roguelike' }, { title: 'Soulslike', link: '#soulslike' }] },
    { title: 'Aventura', link: '#aventura', children: [{ title: 'Narrativa', link: '#narrativa' }, { title: 'Exploracion', link: '#exploracion' }] },
    { title: 'Simulacion', link: '#simulacion', children: [{ title: 'Farming', link: '#farming' }, { title: 'Tycoon', link: '#tycoon' }] },
    { title: 'Multijugador', link: '#multijugador', children: [{ title: 'Co-op', link: '#coop' }, { title: 'Competitivo', link: '#competitivo' }] },
  ],
}