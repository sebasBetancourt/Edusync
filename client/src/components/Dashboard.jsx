import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Select } from './ui/select'
import { Badge } from './ui/badge'
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Clock,
  AlertTriangle,
  Calendar,
  BarChart3
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useApp } from './AppContext'

// Mock data for different time periods
const dataByPeriod = {
  week: {
    collections: [
      { name: 'Lun', amount: 12500000, target: 15000000 },
      { name: 'Mar', amount: 18200000, target: 15000000 },
      { name: 'Mié', amount: 15800000, target: 15000000 },
      { name: 'Jue', amount: 22100000, target: 15000000 },
      { name: 'Vie', amount: 19300000, target: 15000000 },
      { name: 'Sáb', amount: 8500000, target: 15000000 },
      { name: 'Dom', amount: 5200000, target: 15000000 }
    ],
    loans: [
      { name: 'Lun', nuevos: 8, aprobados: 6, rechazados: 2 },
      { name: 'Mar', nuevos: 12, aprobados: 10, rechazados: 2 },
      { name: 'Mié', nuevos: 15, aprobados: 12, rechazados: 3 },
      { name: 'Jue', nuevos: 18, aprobados: 15, rechazados: 3 },
      { name: 'Vie', nuevos: 22, aprobados: 18, rechazados: 4 },
      { name: 'Sáb', nuevos: 5, aprobados: 4, rechazados: 1 },
      { name: 'Dom', nuevos: 2, aprobados: 2, rechazados: 0 }
    ]
  },
  month: {
    collections: [
      { name: 'Sem 1', amount: 85200000, target: 80000000 },
      { name: 'Sem 2', amount: 92300000, target: 80000000 },
      { name: 'Sem 3', amount: 78900000, target: 80000000 },
      { name: 'Sem 4', amount: 105800000, target: 80000000 }
    ],
    loans: [
      { name: 'Sem 1', nuevos: 45, aprobados: 38, rechazados: 7 },
      { name: 'Sem 2', nuevos: 52, aprobados: 44, rechazados: 8 },
      { name: 'Sem 3', nuevos: 38, aprobados: 32, rechazados: 6 },
      { name: 'Sem 4', nuevos: 48, aprobados: 41, rechazados: 7 }
    ]
  },
  quarter: {
    collections: [
      { name: 'Ene', amount: 350000000, target: 320000000 },
      { name: 'Feb', amount: 385000000, target: 320000000 },
      { name: 'Mar', amount: 420000000, target: 320000000 }
    ],
    loans: [
      { name: 'Ene', nuevos: 180, aprobados: 155, rechazados: 25 },
      { name: 'Feb', nuevos: 195, aprobados: 168, rechazados: 27 },
      { name: 'Mar', nuevos: 210, aprobados: 182, rechazados: 28 }
    ]
  },
  year: {
    collections: [
      { name: 'Q1', amount: 1155000000, target: 960000000 },
      { name: 'Q2', amount: 1280000000, target: 960000000 },
      { name: 'Q3', amount: 1095000000, target: 960000000 },
      { name: 'Q4', amount: 1425000000, target: 960000000 }
    ],
    loans: [
      { name: 'Q1', nuevos: 585, aprobados: 505, rechazados: 80 },
      { name: 'Q2', nuevos: 640, aprobados: 558, rechazados: 82 },
      { name: 'Q3', nuevos: 520, aprobados: 445, rechazados: 75 },
      { name: 'Q4', nuevos: 695, aprobados: 612, rechazados: 83 }
    ]
  }
}

const portfolioData = [
  { name: 'Vigentes', value: 65, amount: 2800000000, color: '#059669' },
  { name: 'Retraso (1-30 días)', value: 18, amount: 780000000, color: '#ea580c' },
  { name: 'Retraso (31-90 días)', value: 12, amount: 520000000, color: '#dc2626' },
  { name: 'Moratorios (+90 días)', value: 5, amount: 215000000, color: '#991b1b' }
]

export function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedMetric, setSelectedMetric] = useState('collections')
  const { currency } = useApp()

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: 'compact',
      compactDisplay: 'short'
    }).format(amount)
  }

  const formatCurrencyFull = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getKPIData = () => {
    const currentData = dataByPeriod[selectedPeriod]
    const totalCollections = currentData.collections.reduce((sum, item) => sum + item.amount, 0)
    const totalNewLoans = currentData.loans.reduce((sum, item) => sum + item.nuevos, 0)
    const totalApproved = currentData.loans.reduce((sum, item) => sum + item.aprobados, 0)
    const approvalRate = totalNewLoans > 0 ? (totalApproved / totalNewLoans) * 100 : 0

    return {
      totalCollections,
      totalNewLoans,
      totalApproved,
      approvalRate
    }
  }

  const kpiData = getKPIData()

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'week': return 'Esta Semana'
      case 'month': return 'Este Mes'
      case 'quarter': return 'Este Trimestre'
      case 'year': return 'Este Año'
      default: return 'Período'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1>Dashboard Financiero</h1>
          <p className="text-muted-foreground">
            Monitoreo en tiempo real del rendimiento financiero
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Select
            value={selectedPeriod}
            onValueChange={(value) => setSelectedPeriod(value)}
          >
            <option value="week">Última Semana</option>
            <option value="month">Último Mes</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Año</option>
          </Select>
          <Select
            value={selectedMetric}
            onValueChange={(value) => setSelectedMetric(value)}
          >
            <option value="collections">Recaudación</option>
            <option value="loans">Préstamos</option>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Recaudado {getPeriodLabel()}</p>
              <p className="text-2xl font-semibold text-green-600 mt-2">
                {formatCurrencyFull(kpiData.totalCollections)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12.5%</span>
                <span className="text-sm text-muted-foreground ml-2">vs período anterior</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nuevos Préstamos</p>
              <p className="text-2xl font-semibold text-blue-600 mt-2">
                {kpiData.totalNewLoans.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">+8.2%</span>
                <span className="text-sm text-muted-foreground ml-2">vs período anterior</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <CreditCard className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tasa de Aprobación</p>
              <p className="text-2xl font-semibold text-purple-600 mt-2">
                {kpiData.approvalRate.toFixed(1)}%
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
                <span className="text-sm text-purple-600">+2.1%</span>
                <span className="text-sm text-muted-foreground ml-2">vs período anterior</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Clientes Activos</p>
              <p className="text-2xl font-semibold text-orange-600 mt-2">1,247</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">-1.2%</span>
                <span className="text-sm text-muted-foreground ml-2">vs período anterior</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Users className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dynamic Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>
              {selectedMetric === 'collections' ? 'Recaudación' : 'Gestión de Préstamos'} - {getPeriodLabel()}
            </h3>
            <Badge variant="secondary">
              {dataByPeriod[selectedPeriod][selectedMetric].length} períodos
            </Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === 'collections' ? (
                <BarChart data={dataByPeriod[selectedPeriod].collections}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      formatCurrencyFull(value), 
                      name === 'amount' ? 'Recaudado' : 'Meta'
                    ]}
                    labelFormatter={(label) => `Período: ${label}`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="amount" 
                    name="Recaudado"
                    fill="var(--primary)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="target" 
                    name="Meta"
                    fill="var(--muted-foreground)"
                    opacity={0.5}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              ) : (
                <LineChart data={dataByPeriod[selectedPeriod].loans}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      value, 
                      name === 'nuevos' ? 'Nuevos' : name === 'aprobados' ? 'Aprobados' : 'Rechazados'
                    ]}
                    labelFormatter={(label) => `Período: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="nuevos" 
                    name="Nuevos"
                    stroke="var(--primary)" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="aprobados" 
                    name="Aprobados"
                    stroke="#059669" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rechazados" 
                    name="Rechazados"
                    stroke="#dc2626" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Portfolio Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Estado del Portafolio</h3>
            <Badge variant="outline">Total: {formatCurrency(4315000000)}</Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}% (${formatCurrencyFull(props.payload.amount)})`,
                    props.payload.name
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3>Alertas Importantes</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm text-red-800 dark:text-red-200">
                  156 pagos vencidos requieren atención
                </p>
                <p className="text-xs text-red-600 dark:text-red-300 mt-1">
                  Monto total: {formatCurrencyFull(245800000)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <Clock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm text-yellow-800 dark:text-yellow-200">
                  89 pagos vencen en los próximos 3 días
                </p>
                <p className="text-xs text-yellow-600 dark:text-yellow-300 mt-1">
                  Monto total: {formatCurrencyFull(178500000)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm text-blue-800 dark:text-blue-200">
                  23 clientes elegibles para aumento de crédito
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  Oportunidad de crecimiento identificada
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3>Actividades del Día</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Reunión comité de crédito</p>
                  <p className="text-xs text-muted-foreground">10:00 AM</p>
                </div>
              </div>
              <Badge variant="secondary">En curso</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Revisión solicitudes pendientes</p>
                  <p className="text-xs text-muted-foreground">2:00 PM</p>
                </div>
              </div>
              <Badge variant="outline">Programado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Llamadas de cobranza</p>
                  <p className="text-xs text-muted-foreground">4:00 PM</p>
                </div>
              </div>
              <Badge variant="outline">Programado</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Cierre diario</p>
                  <p className="text-xs text-muted-foreground">6:00 PM</p>
                </div>
              </div>
              <Badge variant="outline">Programado</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}