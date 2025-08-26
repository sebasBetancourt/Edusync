import { useApp } from './AppContext'
import { ChevronRight, Home } from 'lucide-react'

const sectionTitles = {
  dashboard: 'Dashboard',
  loans: 'Gestión de Créditos', 
  clients: 'Clientes',
  payments: 'Pagos y Cobranzas',
  reports: 'Análisis y Reportes',
  settings: 'Configuración'
}

export function Breadcrumbs() {
  const { activeSection } = useApp()

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <div className="flex items-center space-x-2">
        <Home className="w-4 h-4" />
        <span>Inicio</span>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
      <span className="text-foreground font-medium">
        {sectionTitles[activeSection] || 'Dashboard'}
      </span>
    </nav>
  )
}