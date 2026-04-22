import type { CategoryNode } from '../types'

function SidebarBranch({ node }: { node: CategoryNode }) {
  return (
    <li>
      <a href={node.link}>{node.title}</a>
      {node.children && node.children.length > 0 ? (
        <ul>
          {node.children.map((child) => (
            <SidebarBranch key={`${node.title}-${child.title}`} node={child} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function Sidebar({ tree }: { tree: CategoryNode }) {
  return (
    <aside className="sidebar glass-card">
      <h2>Géneros</h2>
      <p className="muted">Explora la tienda por estilo, ambiente y tipo de juego.</p>
      <ul>
        <SidebarBranch node={tree} />
      </ul>
    </aside>
  )
}
