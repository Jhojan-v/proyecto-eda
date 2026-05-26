import type { CategoryNode, Game } from '../types'

export const games: Game[] = [
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
