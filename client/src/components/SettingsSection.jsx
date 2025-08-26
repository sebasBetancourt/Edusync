import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select } from './ui/select'
import { Badge } from './ui/badge'
import { useApp } from './AppContext'
import { 
  Settings,
  User,
  Shield,
  Bell,
  Globe,
  Database,
  Mail,
  Phone,
  Building,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react'

export function SettingsSection() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    overdue: true,
    newLoans: true,
    payments: true
  })
  const { currency, setCurrency, darkMode, toggleDarkMode } = useApp()

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'system', label: 'Sistema', icon: Settings },
    { id: 'data', label: 'Datos', icon: Database }
  ]

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const saveSettings = () => {
    // Mock save functionality
    console.log('Guardando configuraciones...')
  }

  const exportData = () => {
    // Mock export functionality
    console.log('Exportando datos...')
  }

  const importData = () => {
    // Mock import functionality
    console.log('Importando datos...')
  }

  const resetSystem = () => {
    // Mock reset functionality
    if (confirm('¿Estás seguro de que deseas restablecer la configuración del sistema?')) {
      console.log('Restableciendo sistema...')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Configuración del Sistema</h1>
        <p className="text-muted-foreground">
          Administra las configuraciones de la aplicación y tu cuenta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card className="p-4 h-fit">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </Card>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <Card className="p-6">
              <h3 className="mb-6">Información del Perfil</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-2xl font-medium">
                    JC
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Cambiar Foto
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      JPG, PNG máximo 2MB
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" defaultValue="Juan Carlos" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellidos</Label>
                    <Input id="lastName" defaultValue="Admin" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@dcidecomunicaciones.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" defaultValue="+57 300 123 4567" />
                  </div>
                  <div>
                    <Label htmlFor="position">Cargo</Label>
                    <Input id="position" defaultValue="Administrador del Sistema" />
                  </div>
                  <div>
                    <Label htmlFor="department">Departamento</Label>
                    <Select id="department">
                      <option value="admin">Administración</option>
                      <option value="financial">Financiero</option>
                      <option value="collections">Cobranza</option>
                      <option value="operations">Operaciones</option>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Biografía</Label>
                  <textarea
                    id="bio"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    defaultValue="Administrador del sistema financiero con experiencia en gestión de créditos y cobranzas."
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={saveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                  <Button variant="outline">Cancelar</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card className="p-6">
              <h3 className="mb-6">Configuración de Seguridad</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-4">Cambiar Contraseña</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Contraseña Actual</Label>
                      <div className="relative">
                        <Input 
                          id="currentPassword" 
                          type={showPassword ? "text" : "password"} 
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="newPassword">Nueva Contraseña</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Actualizar Contraseña</Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="mb-4">Autenticación de Dos Factores</h4>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">SMS</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe códigos de verificación por SMS
                      </p>
                    </div>
                    <Badge variant="outline">Inactivo</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg mt-2">
                    <div>
                      <p className="font-medium">Aplicación Autenticadora</p>
                      <p className="text-sm text-muted-foreground">
                        Usa Google Authenticator o similar
                      </p>
                    </div>
                    <Badge variant="outline">Inactivo</Badge>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="mb-4">Sesiones Activas</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Navegador Actual</p>
                        <p className="text-sm text-muted-foreground">
                          Chrome en Windows • Bogotá, Colombia
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Última actividad: hace 2 minutos
                        </p>
                      </div>
                      <Badge>Actual</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">iPhone</p>
                        <p className="text-sm text-muted-foreground">
                          Safari en iOS • Medellín, Colombia
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Última actividad: hace 3 horas
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Cerrar Sesión
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-6">
              <h3 className="mb-6">Configuración de Notificaciones</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-4">Canales de Notificación</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">
                            Recibe notificaciones por correo electrónico
                          </p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium">SMS</p>
                          <p className="text-sm text-muted-foreground">
                            Recibe notificaciones por mensaje de texto
                          </p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium">Push</p>
                          <p className="text-sm text-muted-foreground">
                            Notificaciones del navegador
                          </p>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.push}
                        onChange={() => handleNotificationChange('push')}
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="mb-4">Tipos de Notificación</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Pagos Vencidos</p>
                        <p className="text-sm text-muted-foreground">
                          Alertas de pagos con retraso
                        </p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.overdue}
                        onChange={() => handleNotificationChange('overdue')}
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Nuevos Préstamos</p>
                        <p className="text-sm text-muted-foreground">
                          Solicitudes de crédito pendientes
                        </p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.newLoans}
                        onChange={() => handleNotificationChange('newLoans')}
                        className="rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Pagos Recibidos</p>
                        <p className="text-sm text-muted-foreground">
                          Confirmación de pagos procesados
                        </p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={notifications.payments}
                        onChange={() => handleNotificationChange('payments')}
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={saveSettings}>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Configuración
                </Button>
              </div>
            </Card>
          )}

          {activeTab === 'system' && (
            <Card className="p-6">
              <h3 className="mb-6">Configuración del Sistema</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-4">Configuración Regional</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currency">Moneda</Label>
                      <Select 
                        id="currency" 
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        <option value="COP">Peso Colombiano (COP)</option>
                        <option value="USD">Dólar Americano (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">Zona Horaria</Label>
                      <Select id="timezone">
                        <option value="America/Bogota">Colombia (UTC-5)</option>
                        <option value="America/New_York">Nueva York (UTC-5)</option>
                        <option value="Europe/Madrid">Madrid (UTC+1)</option>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Idioma</Label>
                      <Select id="language">
                        <option value="es">Español</option>
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dateFormat">Formato de Fecha</Label>
                      <Select id="dateFormat">
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="mb-4">Apariencia</h4>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Modo Oscuro</p>
                      <p className="text-sm text-muted-foreground">
                        Cambia entre tema claro y oscuro
                      </p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={darkMode}
                      onChange={toggleDarkMode}
                      className="rounded"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="mb-4">Configuración de Empresa</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Nombre de la Empresa</Label>
                      <Input id="companyName" defaultValue="D&C IDEM COMUNICACIONES S.A.S." />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyPhone">Teléfono</Label>
                        <Input id="companyPhone" defaultValue="+57 1 234 5678" />
                      </div>
                      <div>
                        <Label htmlFor="companyEmail">Email</Label>
                        <Input id="companyEmail" defaultValue="info@dcidecomunicaciones.com" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="companyAddress">Dirección</Label>
                      <Input id="companyAddress" defaultValue="Calle 123 #45-67, Bogotá, Colombia" />
                    </div>
                  </div>
                </div>

                <Button onClick={saveSettings}>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Configuración
                </Button>
              </div>
            </Card>
          )}

          {activeTab === 'data' && (
            <Card className="p-6">
              <h3 className="mb-6">Gestión de Datos</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-4">Copia de Seguridad</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Última Copia de Seguridad</p>
                        <p className="text-sm text-muted-foreground">
                          15 de Abril de 2024, 2:30 AM
                        </p>
                      </div>
                      <Badge variant="outline">Exitosa</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={exportData}>
                        <Download className="w-4 h-4 mr-2" />
                        Crear Copia de Seguridad
                      </Button>
                      <Button variant="outline">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Programar Automática
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="mb-4">Importar/Exportar Datos</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Download className="w-5 h-5 text-blue-600" />
                          <p className="font-medium">Exportar Datos</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Descarga todos los datos en formato Excel o CSV
                        </p>
                        <div className="space-y-2">
                          <Button size="sm" variant="outline" className="w-full">
                            Exportar Clientes
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            Exportar Préstamos
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            Exportar Pagos
                          </Button>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Upload className="w-5 h-5 text-green-600" />
                          <p className="font-medium">Importar Datos</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Sube archivos para importar información masiva
                        </p>
                        <div className="space-y-2">
                          <Button size="sm" variant="outline" className="w-full">
                            Importar Clientes
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            Importar Préstamos
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            Descargar Plantilla
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="mb-4">Limpieza de Datos</h4>
                  <div className="space-y-4">
                    <div className="p-4 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="w-5 h-5 text-yellow-600" />
                        <p className="font-medium text-yellow-800 dark:text-yellow-200">
                          Base de Datos
                        </p>
                      </div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                        Optimiza y limpia la base de datos para mejorar el rendimiento
                      </p>
                      <Button size="sm" variant="outline">
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Optimizar BD
                      </Button>
                    </div>

                    <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-950 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Trash2 className="w-5 h-5 text-red-600" />
                        <p className="font-medium text-red-800 dark:text-red-200">
                          Zona Peligrosa
                        </p>
                      </div>
                      <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                        Elimina todos los datos del sistema. Esta acción no se puede deshacer.
                      </p>
                      <Button size="sm" variant="destructive" onClick={resetSystem}>
                        <Trash2 className="w-3 h-3 mr-1" />
                        Restablecer Sistema
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}