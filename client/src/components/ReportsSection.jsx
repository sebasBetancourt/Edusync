import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Badge } from './ui/badge'
import { useApp } from './AppContext'
import { 
  BarChart, 
  Download,
  Calendar,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  PieChart
} from 'lucide-react'
import { LineChart, Line, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// … (mock data igual que antes)

export function ReportsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedReport, setSelectedReport] = useState('portfolio-status')
  const [selectedChart, setSelectedChart] = useState('performance')
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

  const getCategoryBadge = (category) => {
    const colors = {
      'Financiero': 'bg-green-100 text-green-800 border-green-200',
      'Análisis': 'bg-blue-100 text-blue-800 border-blue-200',
      'Cobranza': 'bg-red-100 text-red-800 border-red-200',
      'Clientes': 'bg-purple-100 text-purple-800 border-purple-200',
      'Ejecutivo': 'bg-orange-100 text-orange-800 border-orange-200'
    }
    return (
      <Badge variant="outline" className={colors[category]} size="sm">
        {category}
      </Badge>
    )
  }

  const generateReport = (reportId) => {
    console.log(`Generando reporte: ${reportId}`)
  }

  const exportChart = () => {
    console.log('Exportando gráfica')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1>Análisis y Reportes</h1>
          <p className="text-muted-foreground">
            Genera reportes detallados y analiza el rendimiento del portafolio
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona un período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última Semana</SelectItem>
              <SelectItem value="month">Último Mes</SelectItem>
              <SelectItem value="quarter">Último Trimestre</SelectItem>
              <SelectItem value="year">Último Año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportChart}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* … resto de tarjetas igual … */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Rendimiento Mensual</h3>
            <Select value={selectedChart} onValueChange={setSelectedChart}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Selecciona gráfico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Rendimiento</SelectItem>
                <SelectItem value="clients">Clientes</SelectItem>
                <SelectItem value="loans">Préstamos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* gráfico igual que antes */}
        </Card>

        {/* Portfolio Risk Distribution … igual */}
      </div>

      {/* Reports Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Reports … igual */}

        {/* Custom Report Builder */}
        <Card className="p-6">
          <h3 className="mb-6">Crear Reporte Personalizado</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Reporte</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financiero</SelectItem>
                  <SelectItem value="portfolio">Portafolio</SelectItem>
                  <SelectItem value="collections">Cobranza</SelectItem>
                  <SelectItem value="clients">Clientes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Período</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Personalizado</SelectItem>
                  <SelectItem value="last-week">Última Semana</SelectItem>
                  <SelectItem value="last-month">Último Mes</SelectItem>
                  <SelectItem value="last-quarter">Último Trimestre</SelectItem>
                  <SelectItem value="last-year">Último Año</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Formato</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* … métricas igual … */}

            <Button className="w-full mt-6">
              <FileText className="w-4 h-4 mr-2" />
              Generar Reporte Personalizado
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
