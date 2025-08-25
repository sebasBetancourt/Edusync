import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { DataTable } from './DataTable'
import { useApp } from './AppContext'
import { 
  Plus, 
  Users, 
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp
} from 'lucide-react'

// Mock data for clients
const mockClients = [
  {
    id: 1,
    name: 'María García',
    email: 'maria.garcia@email.com', 
    phone: '+57 300 123 4567',
    city: 'Bogotá',
    registrationDate: '2024-01-15',
    status: 'Activo',
    totalLoans: 3,
    activeLoans: 1,
    totalBorrowed: 15000000,
    totalPaid: 12000000,
    score: 850,
    category: 'Premium'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez', 
    email: 'carlos.rodriguez@email.com',
    phone: '+57 301 234 5678',
    city: 'Medellín',
    registrationDate: '2024-02-20',
    status: 'Activo',
    totalLoans: 2,
    activeLoans: 2,
    totalBorrowed: 8500000,
    totalPaid: 4000000,
    score: 720,
    category: 'Regular'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '+57 302 345 6789', 
    city: 'Cali',
    registrationDate: '2023-11-10',
    status: 'Inactivo',
    totalLoans: 5,
    activeLoans: 0,
    totalBorrowed: 25000000,
    totalPaid: 25000000,
    score: 900,
    category: 'VIP'
  },
  {
    id: 4,
    name: 'Luis Fernández',
    email: 'luis.fernandez@email.com',
    phone: '+57 303 456 7890',
    city: 'Barranquilla', 
    registrationDate: '2024-03-05',
    status: 'Suspendido',
    totalLoans: 1,
    activeLoans: 1,
    totalBorrowed: 3000000,
    totalPaid: 1500000,
    score: 550,
    category: 'Riesgo'
  },
  {
    id: 5,
    name: 'Carmen López',
    email: 'carmen.lopez@email.com',
    phone: '+57 304 567 8901',
    city: 'Cartagena',
    registrationDate: '2024-01-30',
    status: 'Activo',
    totalLoans: 4,
    activeLoans: 2,
    totalBorrowed: 18000000,
    totalPaid: 14000000,
    score: 780,
    category: 'Premium'
  }
]

export function ClientsManagement() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const { currency } = useApp()

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusBadge = (status) => {
    const variants = {
      'Activo': 'default',
      'Inactivo': 'secondary', 
      'Suspendido': 'destructive'
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  const getCategoryBadge = (category) => {
    const colors = {
      'VIP': 'bg-purple-100 text-purple-800 border-purple-200',
      'Premium': 'bg-blue-100 text-blue-800 border-blue-200',
      'Regular': 'bg-green-100 text-green-800 border-green-200',
      'Riesgo': 'bg-red-100 text-red-800 border-red-200'
    }
    return (
      <Badge variant="outline" className={colors[category]}>
        {category}
      </Badge>
    )
  }

  const getScoreColor = (score) => {
    if (score >= 800) return 'text-green-600'
    if (score >= 700) return 'text-blue-600'
    if (score >= 600) return 'text-yellow-600'
    return 'text-red-600'
  }

  const columns = [
    {
      key: 'name',
      label: 'Cliente',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-medium">
            {value.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="font-medium">{value}</p>
            <p className="text-sm text-muted-foreground">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Teléfono',
      sortable: true
    },
    {
      key: 'city',
      label: 'Ciudad',
      sortable: true
    },
    {
      key: 'status',
      label: 'Estado',
      sortable: true,
      render: (value) => getStatusBadge(value)
    },
    {
      key: 'category',
      label: 'Categoría',
      sortable: true,
      render: (value) => getCategoryBadge(value)
    },
    {
      key: 'score',
      label: 'Score',
      sortable: true,
      render: (value) => (
        <div className="flex items-center gap-2">
          <span className={`font-medium ${getScoreColor(value)}`}>{value}</span>
          <div className="flex">
            {[1,2,3,4,5].map(star => (
              <Star 
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.floor(value / 200) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'activeLoans',
      label: 'Préstamos Activos',
      sortable: true,
      render: (value) => (
        <Badge variant="outline">
          {value}
        </Badge>
      )
    },
    {
      key: 'totalBorrowed',
      label: 'Total Prestado',
      sortable: true,
      render: (value) => (
        <span className="font-medium">
          {formatCurrency(value)}
        </span>
      )
    }
  ]

  const filters = [
    {
      key: 'status',
      label: 'Estado',
      options: [
        { value: 'Activo', label: 'Activo' },
        { value: 'Inactivo', label: 'Inactivo' },
        { value: 'Suspendido', label: 'Suspendido' }
      ]
    },
    {
      key: 'category', 
      label: 'Categoría',
      options: [
        { value: 'VIP', label: 'VIP' },
        { value: 'Premium', label: 'Premium' },
        { value: 'Regular', label: 'Regular' },
        { value: 'Riesgo', label: 'Riesgo' }
      ]
    }
  ]

  const handleRowClick = (client) => {
    setSelectedClient(client)
  }

  const stats = {
    totalClients: mockClients.length,
    activeClients: mockClients.filter(c => c.status === 'Activo').length,
    premiumClients: mockClients.filter(c => c.category === 'Premium' || c.category === 'VIP').length,
    averageScore: Math.round(mockClients.reduce((sum, c) => sum + c.score, 0) / mockClients.length)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1>Gestión de Clientes</h1>
          <p className="text-muted-foreground">
            Administra la base de datos de clientes y su información
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Clientes</p>
              <p className="text-2xl font-semibold text-blue-600">{stats.totalClients}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Clientes Activos</p>
              <p className="text-2xl font-semibold text-green-600">{stats.activeClients}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Clientes Premium</p>
              <p className="text-2xl font-semibold text-purple-600">{stats.premiumClients}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Star className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Score Promedio</p>
              <p className="text-2xl font-semibold text-orange-600">{stats.averageScore}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <DollarSign className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        data={mockClients}
        columns={columns}
        filters={filters}
        onRowClick={handleRowClick}
        searchable={true}
        filterable={true}
        exportable={true}
      />

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Detalles del Cliente</h3>
                <Button variant="ghost" onClick={() => setSelectedClient(null)}>
                  ×
                </Button>
              </div>

              <div className="space-y-6">
                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-xl font-medium">
                    {selectedClient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h4>{selectedClient.name}</h4>
                    <div className="flex items-center gap-4 mt-2">
                      {getStatusBadge(selectedClient.status)}
                      {getCategoryBadge(selectedClient.category)}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedClient.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Teléfono</p>
                      <p className="font-medium">{selectedClient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ciudad</p>
                      <p className="font-medium">{selectedClient.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Registro</p>
                      <p className="font-medium">{selectedClient.registrationDate}</p>
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Total Préstamos</p>
                    <p className="text-xl font-semibold">{selectedClient.totalLoans}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Préstamos Activos</p>
                    <p className="text-xl font-semibold">{selectedClient.activeLoans}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Total Prestado</p>
                    <p className="text-xl font-semibold">{formatCurrency(selectedClient.totalBorrowed)}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Total Pagado</p>
                    <p className="text-xl font-semibold">{formatCurrency(selectedClient.totalPaid)}</p>
                  </Card>
                </div>

                {/* Score */}
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Score Crediticio</p>
                      <p className={`text-2xl font-semibold ${getScoreColor(selectedClient.score)}`}>
                        {selectedClient.score}
                      </p>
                    </div>
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <Star 
                          key={star}
                          className={`w-6 h-6 ${
                            star <= Math.floor(selectedClient.score / 200) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Add Client Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Nuevo Cliente</h3>
                <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Ingrese el nombre completo" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@ejemplo.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" placeholder="+57 300 123 4567" />
                </div>
                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input id="city" placeholder="Ciudad de residencia" />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    Crear Cliente
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}