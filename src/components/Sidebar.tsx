import type { CategoryNode } from '../types'

type SidebarProps = {
  tree: CategoryNode
  selectedCategory: string
  totalGames: number
  onSelectCategory: (category: string) => void
}

export function Sidebar({
  tree,
  selectedCategory,
  totalGames,
  onSelectCategory,
}: SidebarProps) {
  const categories = tree.children ?? []

  return (
    <aside className="sidebar glass-card" id="categorias">
      <div className="sidebar-header">
        <span className="status-chip">Explorar</span>
        <h2>Géneros</h2>
        <p className="muted">Filtra el catálogo por tipo de juego.</p>
      </div>

      <div className="sidebar-summary">
        <strong>{totalGames}</strong>
        <span>juegos disponibles</span>
      </div>

      <nav className="sidebar-filter-list" aria-label="Filtros por género">
        <button
          className={selectedCategory === 'Todos' ? 'sidebar-filter active' : 'sidebar-filter'}
          type="button"
          onClick={() => onSelectCategory('Todos')}
        >
          <span>Todos</span>
          <small>Ver catálogo completo</small>
        </button>

        {categories.map((category) => (
          <button
            className={
              selectedCategory === category.title ? 'sidebar-filter active' : 'sidebar-filter'
            }
            key={category.title}
            type="button"
            onClick={() => onSelectCategory(category.title)}
          >
            <span>{category.title}</span>
            <small>{category.children?.map((child) => child.title).join(' · ')}</small>
          </button>
        ))}
      </nav>
    </aside>
  )
}
