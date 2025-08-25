import { useApp } from './AppContext'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Separator } from './ui/separator'
import { 
  LayoutDashboard, 
  CreditCard, 
  Users, 
  Receipt, 
  BarChart3, 
  Settings,
  Home,
  DollarSign,
  FileText
} from 'lucide-react'

const navigationSections = [
  {
    title: "Principal",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        id: "dashboard"
      }
    ]
  },
  {
    title: "Gestión Financiera",
    items: [
      {
        title: "Gestión de Créditos",
        icon: CreditCard,
        id: "loans"
      },
      {
        title: "Pagos y Cobranzas",
        icon: Receipt,
        id: "payments"
      },
      {
        title: "Clientes",
        icon: Users,
        id: "clients"
      }
    ]
  },
  {
    title: "Reportes",
    items: [
      {
        title: "Análisis y Reportes",
        icon: BarChart3,
        id: "reports"
      }
    ]
  },
  {
    title: "Configuración",
    items: [
      {
        title: "Configuración",
        icon: Settings,
        id: "settings"
      }
    ]
  }
]

export function AppSidebar() {
  const { activeSection, setActiveSection, sidebarCollapsed } = useApp()

  const SidebarButton = ({ item }) => {
    const button = (
      <button
        onClick={() => setActiveSection(item.id)}
        className={`w-full flex items-center gap-3 rounded-lg text-left transition-all duration-200 group ${
          activeSection === item.id
            ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border-l-2 border-primary'
            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
        } ${sidebarCollapsed ? 'justify-center px-2 py-2' : 'px-3 py-3'}`}
      >
        <item.icon className={`flex-shrink-0 transition-all ${
          sidebarCollapsed ? 'w-5 h-5' : 'w-5 h-5'
        } ${activeSection === item.id ? 'text-primary' : ''}`} />
        {!sidebarCollapsed && (
          <span className="truncate transition-all duration-200">
            {item.title}
          </span>
        )}
      </button>
    )

    if (sidebarCollapsed) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {button}
            </TooltipTrigger>
            <TooltipContent side="right" className="ml-2">
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return button
  }

  return (
    <aside className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 flex-shrink-0 h-screen ${
      sidebarCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className={`p-4 border-b border-sidebar-border ${
          sidebarCollapsed ? 'px-3' : ''
        }`}>
          <div className={`flex items-center transition-all duration-300 ${
            sidebarCollapsed ? 'justify-center' : 'gap-3'
          }`}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-primary-foreground font-bold text-lg">D&C</span>
            </div>
            {!sidebarCollapsed && (
              <div className="transition-all duration-200">
                <h1 className="font-semibold text-sidebar-foreground leading-tight">
                  D&C IDEM
                </h1>
                <p className="text-sm text-sidebar-foreground/70 leading-tight">
                  Sistema Financiero
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className={`space-y-6 ${sidebarCollapsed ? 'p-2' : 'p-4'}`}>
            {navigationSections.map((section, sectionIndex) => (
              <div key={section.title}>
                {!sidebarCollapsed && (
                  <div className="px-3 mb-2">
                    <h3 className="text-xs font-medium text-sidebar-foreground/50 uppercase tracking-wider">
                      {section.title}
                    </h3>
                  </div>
                )}
                <nav className="space-y-1">
                  {section.items.map((item) => (
                    <SidebarButton key={item.id} item={item} />
                  ))}
                </nav>
                {sectionIndex < navigationSections.length - 1 && !sidebarCollapsed && (
                  <Separator className="mt-4 opacity-50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}