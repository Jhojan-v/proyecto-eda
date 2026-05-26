import type { CategoryNode, Game } from '../types'

export const games: Game[] = [
<<<<<<< HEAD
  { id: 'stardew-valley', title: 'Stardew Valley', category: 'Simulacion', description: 'Una granja acogedora con progreso tranquilo, pixel art y misiones relajadas.', price: 42900, discount: '-20%', tags: ['Cozy', 'Indie', 'Farming'] },
  { id: 'hades', title: 'Hades', category: 'Accion', description: 'Roguelike frenetico con combates fluidos, narrativa dinamica y arte vibrante.', price: 68900, discount: '-35%', tags: ['Roguelike', 'Mitologia', 'Hack & Slash'] },
  { id: 'celeste', title: 'Celeste', category: 'Plataformas', description: 'Plataformas de precision con una historia sensible y ritmo impecable.', price: 37900, discount: '-40%', tags: ['Precision', 'Pixel Art', 'Narrativa'] },
  { id: 'spiritfarer', title: 'Spiritfarer', category: 'Aventura', description: 'Gestion y exploracion en un viaje emotivo con direccion artistica pastel.', price: 59900, discount: '-25%', tags: ['Adventure', 'Management', 'Emotional'] },
  { id: 'hollow-knight', title: 'Hollow Knight', category: 'Accion', description: 'Metroidvania oscuro con exploracion exigente, combates finos y un mundo inolvidable.', price: 52900, discount: '-30%', tags: ['Metroidvania', 'Indie', 'Exploracion'] },
  { id: 'dead-cells', title: 'Dead Cells', category: 'Accion', description: 'Accion veloz y progresion roguelite con armas variadas y castigos justos.', price: 64900, discount: '-33%', tags: ['Roguelite', '2D', 'Combate'] },
  { id: 'cuphead', title: 'Cuphead', category: 'Plataformas', description: 'Jefes memorables, animacion clasica y desafio constante para jugar solo o cooperativo.', price: 57900, discount: '-18%', tags: ['Boss Rush', 'Co-op', 'Run and Gun'] },
  { id: 'ori-and-the-blind-forest', title: 'Ori and the Blind Forest', category: 'Plataformas', description: 'Aventura emotiva con plataformas suaves, arte brillante y gran banda sonora.', price: 46900, discount: '-27%', tags: ['Metroidvania', 'Fantasy', 'Emotional'] },
  { id: 'ori-and-the-will-of-the-wisps', title: 'Ori and the Will of the Wisps', category: 'Plataformas', description: 'Secuela preciosa con exploracion amplia, habilidades fluidas y jefes impactantes.', price: 73900, discount: '-22%', tags: ['Adventure', 'Platformer', 'Fantasy'] },
  { id: 'slay-the-spire', title: 'Slay the Spire', category: 'Aventura', description: 'Deckbuilding roguelike donde cada subida exige estrategia, sinergias y decisiones finas.', price: 45900, discount: '-15%', tags: ['Cards', 'Strategy', 'Roguelike'] },
  { id: 'gris', title: 'GRIS', category: 'Aventura', description: 'Experiencia visual y sonora con plataformas ligeras y narrativa ambiental delicada.', price: 31900, discount: '-45%', tags: ['Artistic', 'Indie', 'Atmospheric'] },
  { id: 'inside', title: 'INSIDE', category: 'Aventura', description: 'Aventura sombria con acertijos ambientales y una tension sostenida de principio a fin.', price: 36900, discount: '-40%', tags: ['Puzzle', 'Dark', 'Narrative'] },
  { id: 'firewatch', title: 'Firewatch', category: 'Aventura', description: 'Thriller narrativo en primera persona con gran direccion artistica y dialogos fuertes.', price: 41900, discount: '-28%', tags: ['Narrativa', 'Mystery', 'First Person'] },
  { id: 'terraria', title: 'Terraria', category: 'Simulacion', description: 'Construccion, supervivencia y aventura 2D con muchisimo contenido y libertad.', price: 34900, discount: '-35%', tags: ['Sandbox', 'Crafting', 'Co-op'] },
  { id: 'core-keeper', title: 'Core Keeper', category: 'Simulacion', description: 'Mineria, bases y exploracion subterranea con enfoque cooperativo y progreso constante.', price: 55900, discount: '-20%', tags: ['Base Building', 'Co-op', 'Survival'] },
  { id: 'planet-zoo', title: 'Planet Zoo', category: 'Simulacion', description: 'Gestiona un zoologico detallado, diseña habitats y optimiza cada rincon del parque.', price: 89900, discount: '-50%', tags: ['Tycoon', 'Management', 'Creative'] },
  { id: 'two-point-campus', title: 'Two Point Campus', category: 'Simulacion', description: 'Crea un campus caotico y divertido con gestion ligera y mucho humor.', price: 65900, discount: '-42%', tags: ['Tycoon', 'Comedy', 'Management'] },
  { id: 'it-takes-two', title: 'It Takes Two', category: 'Multijugador', description: 'Aventura cooperativa creativa con mecanicas cambiantes y ritmo excelente.', price: 109900, discount: '-25%', tags: ['Co-op', 'Adventure', 'Split Screen'] },
  { id: 'overcooked-2', title: 'Overcooked! 2', category: 'Multijugador', description: 'Caos culinario cooperativo ideal para partidas rapidas llenas de risas.', price: 49900, discount: '-30%', tags: ['Party', 'Co-op', 'Arcade'] },
  { id: 'deep-rock-galactic', title: 'Deep Rock Galactic', category: 'Multijugador', description: 'Disparos cooperativos, cuevas procedurales y enanos espaciales muy carismaticos.', price: 69900, discount: '-33%', tags: ['Co-op', 'Shooter', 'Sci-Fi'] },
  { id: 'rocket-league', title: 'Rocket League', category: 'Multijugador', description: 'Futbol con autos, controles accesibles y una curva competitiva muy adictiva.', price: 45900, discount: '-20%', tags: ['Competitive', 'Sports', 'Cars'] },
  { id: 'balatro', title: 'Balatro', category: 'Accion', description: 'Poker roguelike de sinergias absurdas, combos explosivos y decisiones inteligentes.', price: 42900, discount: '-12%', tags: ['Cards', 'Roguelike', 'Indie'] },
  { id: 'outer-wilds', title: 'Outer Wilds', category: 'Aventura', description: 'Exploracion espacial basada en curiosidad, secretos y descubrimientos inolvidables.', price: 62900, discount: '-26%', tags: ['Space', 'Exploration', 'Mystery'] },
  { id: 'dave-the-diver', title: 'Dave the Diver', category: 'Simulacion', description: 'Buceo de dia y gestion de restaurante de noche con ritmo muy adictivo.', price: 58900, discount: '-17%', tags: ['Management', 'Adventure', 'Indie'] },
=======
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
>>>>>>> d73a9970bba699c4b50ec12c1fd4428b30c2f831
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