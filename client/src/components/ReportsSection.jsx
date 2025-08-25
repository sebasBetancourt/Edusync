import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Select } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts'
import { 
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  AlertTriangle,
  FileText
} from 'lucide-react'
import { Badge } from './ui/badge'

const revenueByMonth = [
  { month: 'Ene', ingresos: 245000, meta: 220000, prestamos: 45, intereses: 35000 },
  { month: 'Feb', ingresos: 267000, meta: 240000, prestamos: 52, intereses: 38000 },
  { month: 'Mar', ingresos: 298000, meta: 260000, prestamos: 58, intereses: 42000 },
  { month: 'Abr', ingresos: 325000, meta: 280000, prestamos: 61, intereses: 48000 },
  { month: 'May', ingresos: 342000, meta: 300000, prestamos: 67, intereses: 52000 },
  { month: 'Jun', ingresos: 368000, meta: 320000, prestamos: 73, intereses: 58000 }
]

const loansByType = [
  { name: 'Personal', value: 45, color: '#3b82f6' },
  { name: 'Vehicular', value: 28, color: '#10b981' },
  { name: 'Hipotecario', value: 15, color: '#f59e0b' },
  { name: 'Comercial', value: 12, color: '#ef4444' }
]

const delinquencyTrend = [
  { month: 'Ene', tasa: 6.2, casos: 78, monto: 125000 },
  { month: 'Feb', tasa: 7.1, casos: 89, monto: 142000 },
  { month: 'Mar', tasa: 6.8, casos: 85, monto: 138000 },
  { month: 'Abr', tasa: 8.2, casos: 102, monto: 165000 },
  { month: 'May', tasa: 7.9, casos: 98, monto: 158000 },
  { month: 'Jun', tasa: 8.4, casos: 105, monto: 172000 }
]

const collectionEfficiency = [
  { period: 'Sem 1', recuperado: 85, objetivo: 90, casos: 25 },
  { period: 'Sem 2', recuperado: 78, objetivo: 90, casos: 32 },
  { period: 'Sem 3', recuperado: 92, objetivo: 90, casos: 28 },
  { period: 'Sem 4', recuperado: 87, objetivo: 90, casos: 30 }
]

export function ReportsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState('ultimo-mes')
  const [reportType, setReportType] = useState('general')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>Reportes y Análisis</h1>
          <p className="text-muted-foreground">
            Análisis detallado del rendimiento y métricas del negocio
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <option value="ultimo-mes">Último mes</option>
            <option value="ultimo-trimestre">Último trimestre</option>
            <option value="ultimo-ano">Último año</option>
            <option value="personalizado">Período personalizado</option>
          </Select>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ingresos Totales</p>
              <p className="text-2xl font-semibold">$2,845,000</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+12.5%</span>
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">ROI Promedio</p>
              <p className="text-2xl font-semibold">18.4%</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+2.1%</span>
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Clientes Activos</p>
              <p className="text-2xl font-semibold">1,089</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+8.2%</span>
              </div>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tasa Morosidad</p>
              <p className="text-2xl font-semibold">8.4%</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingDown className="w-3 h-3 text-red-600" />
                <span className="text-xs text-red-600">+1.2%</span>
              </div>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="financial">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="financial">Financiero</TabsTrigger>
          <TabsTrigger value="portfolio">Portafolio</TabsTrigger>
          <TabsTrigger value="risk">Riesgo</TabsTrigger>
          <TabsTrigger value="collections">Cobranzas</TabsTrigger>
          <TabsTrigger value="operational">Operacional</TabsTrigger>
        </TabsList>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3>Ingresos vs Meta</h3>
                <Badge>Últimos 6 meses</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  <Bar dataKey="ingresos" fill="#3b82f6" name="Ingresos" />
                  <Bar dataKey="meta" fill="#e5e7eb" name="Meta" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Interest Income Chart */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3>Ingresos por Intereses</h3>
                <Badge>Crecimiento mensual</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Intereses']} />
                  <Area type="monotone" dataKey="intereses" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Profitability Analysis */}
          <Card className="p-6">
            <h3 className="mb-4">Análisis de Rentabilidad</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-semibold text-green-600">$485,000</p>
                <p className="text-sm text-muted-foreground">Margen Bruto</p>
                <p className="text-xs text-green-600 mt-1">+15.2% vs mes anterior</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-semibold text-blue-600">$125,000</p>
                <p className="text-sm text-muted-foreground">Gastos Operacionales</p>
                <p className="text-xs text-blue-600 mt-1">-8.5% vs mes anterior</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-semibold text-purple-600">$360,000</p>
                <p className="text-sm text-muted-foreground">Utilidad Neta</p>
                <p className="text-xs text-purple-600 mt-1">+22.8% vs mes anterior</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Loan Distribution */}
            <Card className="p-6">
              <h3 className="mb-4">Distribución por Tipo de Préstamo</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={loansByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {loansByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Portfolio Quality */}
            <Card className="p-6">
              <h3 className="mb-4">Calidad del Portafolio</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Préstamos al día</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded">
                      <div className="w-3/4 h-full bg-green-500 rounded"></div>
                    </div>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>1-30 días de retraso</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded">
                      <div className="w-1/4 h-full bg-yellow-500 rounded"></div>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>31-60 días de retraso</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded">
                      <div className="w-1/12 h-full bg-orange-500 rounded"></div>
                    </div>
                    <span className="text-sm font-medium">6%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Más de 60 días</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded">
                      <div className="w-1/24 h-full bg-red-500 rounded"></div>
                    </div>
                    <span className="text-sm font-medium">4%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Risk Tab */}
        <TabsContent value="risk" className="space-y-6">
          {/* Delinquency Trend */}
          <Card className="p-6">
            <h3 className="mb-4">Tendencia de Morosidad</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={delinquencyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tasa" stroke="#ef4444" strokeWidth={3} name="Tasa %" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Risk Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h4 className="mb-2">Exposición Total</h4>
              <p className="text-2xl font-semibold">$4.2M</p>
              <p className="text-sm text-muted-foreground">Capital en riesgo</p>
            </Card>
            <Card className="p-4">
              <h4 className="mb-2">Provisiones</h4>
              <p className="text-2xl font-semibold">$324K</p>
              <p className="text-sm text-muted-foreground">7.7% del portafolio</p>
            </Card>
            <Card className="p-4">
              <h4 className="mb-2">Pérdidas YTD</h4>
              <p className="text-2xl font-semibold">$89K</p>
              <p className="text-sm text-muted-foreground">2.1% del portafolio</p>
            </Card>
          </div>
        </TabsContent>

        {/* Collections Tab */}
        <TabsContent value="collections" className="space-y-6">
          {/* Collection Efficiency */}
          <Card className="p-6">
            <h3 className="mb-4">Eficiencia de Cobranzas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={collectionEfficiency}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="recuperado" fill="#10b981" name="Recuperado %" />
                <Bar dataKey="objetivo" fill="#e5e7eb" name="Objetivo %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Collection KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <p className="text-2xl font-semibold text-green-600">78.5%</p>
              <p className="text-sm text-muted-foreground">Tasa Recuperación</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-semibold text-blue-600">12</p>
              <p className="text-sm text-muted-foreground">Días Promedio</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-semibold text-purple-600">$248K</p>
              <p className="text-sm text-muted-foreground">Recuperado Este Mes</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-semibold text-yellow-600">45</p>
              <p className="text-sm text-muted-foreground">Casos Activos</p>
            </Card>
          </div>
        </TabsContent>

        {/* Operational Tab */}
        <TabsContent value="operational" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Processing Times */}
            <Card className="p-6">
              <h3 className="mb-4">Tiempos de Procesamiento</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Solicitud a Aprobación:</span>
                  <span className="font-medium">2.3 días</span>
                </div>
                <div className="flex justify-between">
                  <span>Aprobación a Desembolso:</span>
                  <span className="font-medium">1.8 días</span>
                </div>
                <div className="flex justify-between">
                  <span>Proceso Completo:</span>
                  <span className="font-medium">4.1 días</span>
                </div>
              </div>
            </Card>

            {/* Staff Productivity */}
            <Card className="p-6">
              <h3 className="mb-4">Productividad del Personal</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Préstamos/Analista/Día:</span>
                  <span className="font-medium">8.5</span>
                </div>
                <div className="flex justify-between">
                  <span>Llamadas/Cobrador/Día:</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex justify-between">
                  <span>Tasa de Conversión:</span>
                  <span className="font-medium">68%</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="mb-4">Reportes Predefinidos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <FileText className="w-8 h-8 mb-2" />
                <span>Reporte Mensual</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <TrendingUp className="w-8 h-8 mb-2" />
                <span>Análisis Tendencias</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Users className="w-8 h-8 mb-2" />
                <span>Reporte Clientes</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <AlertTriangle className="w-8 h-8 mb-2" />
                <span>Reporte Riesgo</span>
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}