import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select } from './ui/select'
import { Switch } from './ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Separator } from './ui/separator'
import { toast } from 'sonner'
import { 
  Settings,
  Percent,
  Calendar,
  Bell,
  Shield,
  Database,
  Mail,
  Phone,
  Save,
  AlertTriangle,
  DollarSign,
  Globe
} from 'lucide-react'
import { Badge } from './ui/badge'
import { useApp } from './AppContext'

export function SettingsSection() {
  const { currency, setCurrency } = useApp()
  
  const [interestRates, setInterestRates] = useState({
    personal: '15.0',
    vehicular: '12.5',
    hipotecario: '8.5',
    comercial: '18.0'
  })

  const [latePaymentSettings, setLatePaymentSettings] = useState({
    graceDays: '5',
    lateInterestRate: '5.0',
    penaltyFee: '50000',
    maxLateDays: '90'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailReminders: true,
    smsReminders: false,
    paymentConfirmations: true,
    latePaymentAlerts: true,
    reminderDaysBefore: '7'
  })

  const [systemSettings, setSystemSettings] = useState({
    companyName: 'D&C IDEM COMUNICACIONES S.A.S.',
    companyAddress: 'Carrera 15 #123-45, Bogotá D.C., Colombia',
    companyPhone: '+57 1 234-5678',
    companyEmail: 'info@dcidecomunicaciones.com',
    taxId: '900123456-1',
    timezone: 'america/bogota',
    language: 'es'
  })

  const currencies = [
    { code: 'COP', name: 'Peso Colombiano', symbol: '$' },
    { code: 'USD', name: 'Dólar Estadounidense', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'MXN', name: 'Peso Mexicano', symbol: '$' }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const handleSaveSettings = () => {
    toast.success('Configuración guardada exitosamente')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1>Configuración del Sistema</h1>
          <p className="text-muted-foreground">
            Administra parámetros del sistema, tasas de interés y configuraciones
          </p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="w-4 h-4 mr-2" />
          Guardar Configuración
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="rates">Tasas e Intereses</TabsTrigger>
          <TabsTrigger value="payments">Pagos y Mora</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-blue-600" />
              <h3>Configuración Regional</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="currency">Moneda Principal</Label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code} - {curr.name} ({curr.symbol})
                    </option>
                  ))}
                </select>
                <p className="text-sm text-muted-foreground mt-1">
                  Esta será la moneda utilizada en todo el sistema
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <select
                    value={systemSettings.timezone}
                    onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="america/bogota">América/Bogotá (UTC-5)</option>
                    <option value="america/mexico_city">América/Ciudad_de_México (UTC-6)</option>
                    <option value="america/new_york">América/Nueva_York (UTC-5)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="language">Idioma</Label>
                  <select
                    value={systemSettings.language}
                    onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
                    className="w-full mt-1 px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Vista Previa de Formato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Montos:</Label>
                <p className="font-semibold">{formatCurrency(1500000)}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Fecha:</Label>
                <p className="font-semibold">{new Date().toLocaleDateString('es-CO')}</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Rates and Interest Tab */}
        <TabsContent value="rates" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Percent className="w-5 h-5 text-blue-600" />
              <h3>Tasas de Interés por Tipo de Préstamo</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="personal-rate">Préstamos Personales (% anual)</Label>
                  <Input
                    id="personal-rate"
                    type="number"
                    step="0.1"
                    value={interestRates.personal}
                    onChange={(e) => setInterestRates({...interestRates, personal: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="vehicular-rate">Préstamos Vehiculares (% anual)</Label>
                  <Input
                    id="vehicular-rate"
                    type="number"
                    step="0.1"
                    value={interestRates.vehicular}
                    onChange={(e) => setInterestRates({...interestRates, vehicular: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="hipotecario-rate">Préstamos Hipotecarios (% anual)</Label>
                  <Input
                    id="hipotecario-rate"
                    type="number"
                    step="0.1"
                    value={interestRates.hipotecario}
                    onChange={(e) => setInterestRates({...interestRates, hipotecario: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="comercial-rate">Préstamos Comerciales (% anual)</Label>
                  <Input
                    id="comercial-rate"
                    type="number"
                    step="0.1"
                    value={interestRates.comercial}
                    onChange={(e) => setInterestRates({...interestRates, comercial: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Configuración de Comisiones</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="origination-fee">Comisión de Apertura (%)</Label>
                <Input
                  id="origination-fee"
                  type="number"
                  step="0.1"
                  defaultValue="2.0"
                />
              </div>

              <div>
                <Label htmlFor="admin-fee">Comisión Administrativa ({currency})</Label>
                <Input
                  id="admin-fee"
                  type="number"
                  defaultValue="25000"
                />
              </div>

              <div>
                <Label htmlFor="early-payment-penalty">Penalidad Pago Anticipado (%)</Label>
                <Input
                  id="early-payment-penalty"
                  type="number"
                  step="0.1"
                  defaultValue="1.5"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Payments and Late Fees Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h3>Configuración de Morosidad</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="grace-days">Días de Gracia</Label>
                  <Input
                    id="grace-days"
                    type="number"
                    value={latePaymentSettings.graceDays}
                    onChange={(e) => setLatePaymentSettings({...latePaymentSettings, graceDays: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Días después del vencimiento antes de aplicar penalidades
                  </p>
                </div>

                <div>
                  <Label htmlFor="late-interest">Interés Moratorio (% mensual)</Label>
                  <Input
                    id="late-interest"
                    type="number"
                    step="0.1"
                    value={latePaymentSettings.lateInterestRate}
                    onChange={(e) => setLatePaymentSettings({...latePaymentSettings, lateInterestRate: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="penalty-fee">Multa por Retraso ({currency})</Label>
                  <Input
                    id="penalty-fee"
                    type="number"
                    value={latePaymentSettings.penaltyFee}
                    onChange={(e) => setLatePaymentSettings({...latePaymentSettings, penaltyFee: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="max-late-days">Días Máximos de Retraso</Label>
                  <Input
                    id="max-late-days"
                    type="number"
                    value={latePaymentSettings.maxLateDays}
                    onChange={(e) => setLatePaymentSettings({...latePaymentSettings, maxLateDays: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Después de este período, el préstamo se considera incobrable
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Métodos de Pago</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Transferencias Bancarias</p>
                  <p className="text-sm text-muted-foreground">Permite pagos por transferencia</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pagos en Efectivo</p>
                  <p className="text-sm text-muted-foreground">Permite pagos en oficinas</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tarjetas de Débito/Crédito</p>
                  <p className="text-sm text-muted-foreground">Integración con procesadores de pago</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Débito Automático</p>
                  <p className="text-sm text-muted-foreground">Descuento automático de cuentas bancarias</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-blue-600" />
              <h3>Configuración de Notificaciones</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Recordatorios por Email</p>
                  <p className="text-sm text-muted-foreground">Enviar recordatorios de pago por correo</p>
                </div>
                <Switch 
                  checked={notificationSettings.emailReminders}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailReminders: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Recordatorios por SMS</p>
                  <p className="text-sm text-muted-foreground">Enviar recordatorios de pago por mensaje de texto</p>
                </div>
                <Switch 
                  checked={notificationSettings.smsReminders}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsReminders: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Confirmaciones de Pago</p>
                  <p className="text-sm text-muted-foreground">Confirmar recepción de pagos</p>
                </div>
                <Switch 
                  checked={notificationSettings.paymentConfirmations}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, paymentConfirmations: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alertas de Morosidad</p>
                  <p className="text-sm text-muted-foreground">Notificar sobre pagos vencidos</p>
                </div>
                <Switch 
                  checked={notificationSettings.latePaymentAlerts}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, latePaymentAlerts: checked})}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div>
                <Label htmlFor="reminder-days">Días de Anticipación para Recordatorios</Label>
                <Input
                  id="reminder-days"
                  type="number"
                  value={notificationSettings.reminderDaysBefore}
                  onChange={(e) => setNotificationSettings({...notificationSettings, reminderDaysBefore: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email-template">Plantilla de Email</Label>
                  <select className="w-full mt-1 px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Recordatorio estándar</option>
                    <option>Recordatorio formal</option>
                    <option>Recordatorio amigable</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="sms-template">Plantilla de SMS</Label>
                  <select className="w-full mt-1 px-3 py-2 border border-border bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>Mensaje corto</option>
                    <option>Mensaje detallado</option>
                    <option>Mensaje personalizado</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-green-600" />
              <h3>Configuración de Seguridad</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="session-timeout">Tiempo de Sesión (minutos)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  defaultValue="30"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Autenticación de Dos Factores</p>
                  <p className="text-sm text-muted-foreground">Requerir 2FA para acceso administrativo</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Registro de Auditoría</p>
                  <p className="text-sm text-muted-foreground">Registrar todas las acciones del sistema</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Encriptación de Datos</p>
                  <p className="text-sm text-muted-foreground">Encriptar información sensible</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h4>Políticas de Contraseñas</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min-length">Longitud Mínima</Label>
                  <Input
                    id="min-length"
                    type="number"
                    defaultValue="8"
                  />
                </div>
                <div>
                  <Label htmlFor="password-expiry">Expiración (días)</Label>
                  <Input
                    id="password-expiry"
                    type="number"
                    defaultValue="90"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-5 h-5 text-purple-600" />
              <h3>Información de la Empresa</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="company-name">Nombre de la Empresa</Label>
                <Input
                  id="company-name"
                  value={systemSettings.companyName}
                  onChange={(e) => setSystemSettings({...systemSettings, companyName: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="company-address">Dirección</Label>
                <Input
                  id="company-address"
                  value={systemSettings.companyAddress}
                  onChange={(e) => setSystemSettings({...systemSettings, companyAddress: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-phone">Teléfono</Label>
                  <Input
                    id="company-phone"
                    value={systemSettings.companyPhone}
                    onChange={(e) => setSystemSettings({...systemSettings, companyPhone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="company-email">Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={systemSettings.companyEmail}
                    onChange={(e) => setSystemSettings({...systemSettings, companyEmail: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tax-id">NIT / ID Fiscal</Label>
                <Input
                  id="tax-id"
                  value={systemSettings.taxId}
                  onChange={(e) => setSystemSettings({...systemSettings, taxId: e.target.value})}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Configuración de Base de Datos</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Respaldo Automático</p>
                  <p className="text-sm text-muted-foreground">Backup diario de la base de datos</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="backup-time">Hora de Respaldo</Label>
                  <Input
                    id="backup-time"
                    type="time"
                    defaultValue="02:00"
                  />
                </div>
                <div>
                  <Label htmlFor="retention-period">Período de Retención (días)</Label>
                  <Input
                    id="retention-period"
                    type="number"
                    defaultValue="30"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex gap-3">
              <Button variant="outline">
                <Database className="w-4 h-4 mr-2" />
                Respaldar Ahora
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Optimizar DB
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}