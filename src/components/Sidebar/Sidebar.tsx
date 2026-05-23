import type { CategoryNode } from '../../types'
import styles from './Sidebar.module.scss'

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
    <aside className={styles.sidebar} id="categorias">
      <div className={styles.sidebarHeader}>
        <span className="status-chip">Explorar</span>
        <h2>Géneros</h2>
        <p className="muted">Filtra el catálogo por tipo de juego.</p>
      </div>

      <div className={styles.sidebarSummary}>
        <span>Resultados filtrados:</span>
        <strong>{totalGames}</strong>
      </div>

      <nav className={styles.sidebarFilterList} aria-label="Filtros por género">
        <button
          className={`${styles.sidebarFilter} ${selectedCategory === 'Todos' ? styles.active : ''}`}
          type="button"
          onClick={() => onSelectCategory('Todos')}
        >
          <span>Todos los Géneros</span>
          <small>Ver catálogo completo</small>
        </button>

        {categories.map((category) => (
          <button
            className={`${styles.sidebarFilter} ${
              selectedCategory === category.title ? styles.active : ''
            }`}
            key={category.title}
            type="button"
            onClick={() => onSelectCategory(category.title)}
          >
            <span>{category.title}</span>
            <small>
              {category.children && category.children.length > 0
                ? category.children.map((child) => child.title).join(', ')
                : 'Licencias directas'}
            </small>
          </button>
        ))}
      </nav>
    </aside>
  )
}