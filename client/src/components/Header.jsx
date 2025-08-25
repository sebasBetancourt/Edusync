import { useState } from 'react'
import { Button } from './ui/button'
import { Avatar } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Breadcrumbs } from './Breadcrumbs'
import { 
  ChevronLeft,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  X
} from 'lucide-react'
import { useApp } from './AppContext'

const mockNotifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Pago Vencido',
    message: 'Cliente María García tiene un pago vencido por $250,000 COP',
    time: '5 min',
    read: false
  },
  {
    id: 2,
    type: 'info',
    title: 'Nuevo Cliente Registrado',
    message: 'Se ha registrado un nuevo cliente: Carlos Ruiz',
    time: '1 hora',
    read: false
  },
  {
    id: 3,
    type: 'success',
    title: 'Pago Recibido',
    message: 'Pago de $500,000 COP procesado exitosamente',
    time: '2 horas',
    read: true
  },
  {
    id: 4,
    type: 'warning',
    title: 'Próximo Vencimiento',
    message: '15 pagos vencen en los próximos 3 días',
    time: '4 horas',
    read: true
  }
]

export function Header() {
  const { darkMode, toggleDarkMode, sidebarCollapsed, toggleSidebar, user, setActiveSection } = useApp()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'info':
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <Bell className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
      {/* Top Header Row */}
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Sidebar Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="flex-shrink-0"
        >
          <ChevronLeft 
            className={`w-4 h-4 transition-transform duration-200 ${
              sidebarCollapsed ? 'rotate-180' : ''
            }`} 
          />
        </Button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right side items */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="relative"
          >
            <Sun className={`w-4 h-4 transition-all ${darkMode ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} text-yellow-500`} />
            <Moon className={`w-4 h-4 absolute transition-all ${darkMode ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} text-blue-500`} />
          </Button>

          {/* Notifications */}
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end" sideOffset={5}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Notificaciones</h4>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs h-auto p-1"
                    >
                      Marcar todas como leídas
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                        notification.read 
                          ? 'bg-muted/30 border-muted' 
                          : 'bg-background border-border hover:bg-muted/50'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {notifications.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No hay notificaciones</p>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 h-auto py-2">
                <Avatar className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                  <span className="text-sm font-medium">{user.avatar}</span>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" sideOffset={5}>
              <div className="flex items-center gap-3 p-3">
                <Avatar className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                  <span className="font-medium">{user.avatar}</span>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {user.role}
                  </Badge>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveSection('profile')}>
                <User className="w-4 h-4 mr-2" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveSection('settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Breadcrumbs Row */}
      <div className="border-t px-4 py-2 bg-muted/30">
        <Breadcrumbs />
      </div>
    </header>
  )
}