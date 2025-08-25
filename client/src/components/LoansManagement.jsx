import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select } from './ui/select'
import { Badge } from './ui/badge'
import { DataTable } from './DataTable'
import { useApp } from './AppContext'
import { 
  Plus, 
  Calculator,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react'

// Mock data for loans
const mockLoans = [
  {
    id: 'PR-001',
    clientName: 'María García',
    amount: 5000000,
    interestRate: 2.5,
    term: 12,
    status: 'Activo',
    disbursementDate: '2024-01-15',
    dueDate: '2025-01-15',
    nextPayment: '2024-04-15',
    nextPaymentAmount: 450000,
    totalPaid: 1350000,
    balance: 3650000,
    paymentFrequency: 'Mensual',
    riskLevel: 'Bajo'
  },
  {
    id: 'PR-002', 
    clientName: 'Carlos Rodríguez',
    amount: 3000000,
    interestRate: 3.0,
    term: 8,
    status: 'Vencido',
    disbursementDate: '2023-08-20',
    dueDate: '2024-04-20',
    nextPayment: '2024-03-20',
    nextPaymentAmount: 410000,
    totalPaid: 2460000,
    balance: 540000,
    paymentFrequency: 'Mensual',
    riskLevel: 'Alto'
  },
  {
    id: 'PR-003',
    clientName: 'Ana Martínez', 
    amount: 8000000,
    interestRate: 2.2,
    term: 18,
    status: 'Activo',
    disbursementDate: '2023-11-10',
    dueDate: '2025-05-10', 
    nextPayment: '2024-04-10',
    nextPaymentAmount: 520000,
    totalPaid: 2600000,
    balance: 5400000,
    paymentFrequency: 'Mensual',
    riskLevel: 'Bajo'
  },
  {
    id: 'PR-004',
    clientName: 'Luis Fernández',
    amount: 2000000,
    interestRate: 4.0,
    term: 6,
    status: 'Pendiente',
    disbursementDate: null,
    dueDate: null,
    nextPayment: null,
    nextPaymentAmount: 0,
    totalPaid: 0,
    balance: 2000000,
    paymentFrequency: 'Mensual',
    riskLevel: 'Medio'
  },
  {
    id: 'PR-005',
    clientName: 'Carmen López',
    amount: 6500000,
    interestRate: 2.8,
    term: 15,
    status: 'Pagado',
    disbursementDate: '2023-01-15',
    dueDate: '2024-04-15',
    nextPayment: null,
    nextPaymentAmount: 0,
    totalPaid: 6500000,
    balance: 0,
    paymentFrequency: 'Mensual',
    riskLevel: 'Bajo'
  }
]

export function LoansManagement() {
  const [showLoanForm, setShowLoanForm] = useState(false)
  const [showCalculator, setShowCalculator] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState(null)
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
      'Vencido': 'destructive',
      'Pendiente': 'secondary',
      'Pagado': 'outline'
    }
    const colors = {
      'Activo': 'bg-green-100 text-green-800 border-green-200',
      'Vencido': 'bg-red-100 text-red-800 border-red-200', 
      'Pendiente': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Pagado': 'bg-blue-100 text-blue-800 border-blue-200'
    }
    return (
      <Badge variant="outline" className={colors[status]}>
        {status}
      </Badge>
    )
  }

  const getRiskBadge = (risk) => {
    const colors = {
      'Bajo': 'bg-green-100 text-green-800 border-green-200',
      'Medio': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Alto': 'bg-red-100 text-red-800 border-red-200'
    }
    return (
      <Badge variant="outline" className={colors[risk]} size="sm">
        {risk}
      </Badge>
    )
  }

  const columns = [
    {
      key: 'id',
      label: 'ID Préstamo',
      sortable: true,
      render: (value) => (
        <span className="font-mono font-medium">{value}</span>
      )
    },
    {
      key: 'clientName',
      label: 'Cliente',
      sortable: true,
      render: (value) => (
        <div className="font-medium">{value}</div>
      )
    },
    {
      key: 'amount',
      label: 'Monto',
      sortable: true,
      render: (value) => (
        <span className="font-medium">{formatCurrency(value)}</span>
      )
    },
    {
      key: 'interestRate',
      label: 'Tasa (%)',
      sortable: true,
      render: (value) => (
        <span>{value}%</span>
      )
    },
    {
      key: 'status',
      label: 'Estado',
      sortable: true,
      render: (value) => getStatusBadge(value)
    },
    {
      key: 'nextPayment',
      label: 'Próximo Pago',
      sortable: true,
      render: (value, row) => (
        <div>
          {value ? (
            <>
              <div className="font-medium">{value}</div>
              <div className="text-sm text-muted-foreground">
                {formatCurrency(row.nextPaymentAmount)}
              </div>
            </>
          ) : (
            <span className="text-muted-foreground">N/A</span>
          )}
        </div>
      )
    },
    {
      key: 'balance',
      label: 'Saldo',
      sortable: true,
      render: (value) => (
        <span className="font-medium">{formatCurrency(value)}</span>
      )
    },
    {
      key: 'riskLevel',
      label: 'Riesgo',
      sortable: true,
      render: (value) => getRiskBadge(value)
    }
  ]

  const filters = [
    {
      key: 'status',
      label: 'Estado',
      options: [
        { value: 'Activo', label: 'Activo' },
        { value: 'Vencido', label: 'Vencido' },
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'Pagado', label: 'Pagado' }
      ]
    },
    {
      key: 'riskLevel',
      label: 'Riesgo',
      options: [
        { value: 'Bajo', label: 'Bajo' },
        { value: 'Medio', label: 'Medio' },
        { value: 'Alto', label: 'Alto' }
      ]
    }
  ]

  const handleRowClick = (loan) => {
    setSelectedLoan(loan)
  }

  const stats = {
    totalLoans: mockLoans.length,
    activeLoans: mockLoans.filter(l => l.status === 'Activo').length,
    overdueLoans: mockLoans.filter(l => l.status === 'Vencido').length,
    totalAmount: mockLoans.reduce((sum, l) => sum + l.amount, 0),
    totalBalance: mockLoans.reduce((sum, l) => sum + l.balance, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1>Gestión de Créditos</h1>
          <p className="text-muted-foreground">
            Administra el portafolio de préstamos y solicitudes de crédito
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowCalculator(true)}>
            <Calculator className="w-4 h-4 mr-2" />
            Calculadora
          </Button>
          <Button onClick={() => setShowLoanForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Préstamo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Préstamos</p>
              <p className="text-2xl font-semibold text-blue-600">{stats.totalLoans}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <CreditCard className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Préstamos Activos</p>
              <p className="text-2xl font-semibold text-green-600">{stats.activeLoans}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Préstamos Vencidos</p>
              <p className="text-2xl font-semibold text-red-600">{stats.overdueLoans}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Monto Total</p>
              <p className="text-xl font-semibold text-purple-600">{formatCurrency(stats.totalAmount)}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Saldo Pendiente</p>
              <p className="text-xl font-semibold text-orange-600">{formatCurrency(stats.totalBalance)}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        data={mockLoans}
        columns={columns}
        filters={filters}
        onRowClick={handleRowClick}
        searchable={true}
        filterable={true}
        exportable={true}
      />

      {/* Loan Detail Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Detalles del Préstamo {selectedLoan.id}</h3>
                <Button variant="ghost" onClick={() => setSelectedLoan(null)}>
                  ×
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Info */}
                <Card className="p-4">
                  <h4 className="mb-4">Información Básica</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cliente:</span>
                      <span className="font-medium">{selectedLoan.clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monto:</span>
                      <span className="font-medium">{formatCurrency(selectedLoan.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tasa de Interés:</span>
                      <span className="font-medium">{selectedLoan.interestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Plazo:</span>
                      <span className="font-medium">{selectedLoan.term} meses</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estado:</span>
                      {getStatusBadge(selectedLoan.status)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Riesgo:</span>
                      {getRiskBadge(selectedLoan.riskLevel)}
                    </div>
                  </div>
                </Card>

                {/* Payment Info */}
                <Card className="p-4">
                  <h4 className="mb-4">Información de Pagos</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frecuencia:</span>
                      <span className="font-medium">{selectedLoan.paymentFrequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Pagado:</span>
                      <span className="font-medium text-green-600">{formatCurrency(selectedLoan.totalPaid)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saldo Pendiente:</span>
                      <span className="font-medium text-orange-600">{formatCurrency(selectedLoan.balance)}</span>
                    </div>
                    {selectedLoan.nextPayment && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Próximo Pago:</span>
                          <span className="font-medium">{selectedLoan.nextPayment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monto Próximo Pago:</span>
                          <span className="font-medium">{formatCurrency(selectedLoan.nextPaymentAmount)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </Card>

                {/* Dates */}
                <Card className="p-4">
                  <h4 className="mb-4">Fechas Importantes</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha de Desembolso:</span>
                      <span className="font-medium">{selectedLoan.disbursementDate || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha de Vencimiento:</span>
                      <span className="font-medium">{selectedLoan.dueDate || 'N/A'}</span>
                    </div>
                  </div>
                </Card>

                {/* Progress */}
                <Card className="p-4">
                  <h4 className="mb-4">Progreso del Préstamo</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Pagado</span>
                        <span>{((selectedLoan.totalPaid / selectedLoan.amount) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${(selectedLoan.totalPaid / selectedLoan.amount) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex gap-2 pt-6">
                <Button>Registrar Pago</Button>
                <Button variant="outline">Editar Préstamo</Button>
                <Button variant="outline">Ver Historial</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Calculadora de Préstamos</h3>
                <Button variant="ghost" onClick={() => setShowCalculator(false)}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="calc-amount">Monto del Préstamo</Label>
                  <Input id="calc-amount" type="number" placeholder="5000000" />
                </div>
                <div>
                  <Label htmlFor="calc-rate">Tasa de Interés (%)</Label>
                  <Input id="calc-rate" type="number" step="0.1" placeholder="2.5" />
                </div>
                <div>
                  <Label htmlFor="calc-term">Plazo (meses)</Label>
                  <Input id="calc-term" type="number" placeholder="12" />
                </div>
                <div>
                  <Label htmlFor="calc-frequency">Frecuencia de Pago</Label>
                  <Select id="calc-frequency">
                    <option value="monthly">Mensual</option>
                    <option value="weekly">Semanal</option>
                    <option value="biweekly">Quincenal</option>
                  </Select>
                </div>
                
                <Card className="p-4 bg-muted/50">
                  <h4 className="mb-2">Resultado del Cálculo</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Cuota Mensual:</span>
                      <span className="font-medium">{formatCurrency(450000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total a Pagar:</span>
                      <span className="font-medium">{formatCurrency(5400000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Intereses:</span>
                      <span className="font-medium">{formatCurrency(400000)}</span>
                    </div>
                  </div>
                </Card>
                
                <Button className="w-full">
                  Calcular
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Add Loan Form */}
      {showLoanForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Nuevo Préstamo</h3>
                <Button variant="ghost" onClick={() => setShowLoanForm(false)}>
                  ×
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Cliente</Label>
                  <Select id="client">
                    <option value="">Seleccionar cliente</option>
                    <option value="maria">María García</option>
                    <option value="carlos">Carlos Rodríguez</option>
                    <option value="ana">Ana Martínez</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="loan-amount">Monto del Préstamo</Label>
                  <Input id="loan-amount" type="number" placeholder="5000000" />
                </div>
                <div>
                  <Label htmlFor="loan-rate">Tasa de Interés (%)</Label>
                  <Input id="loan-rate" type="number" step="0.1" placeholder="2.5" />
                </div>
                <div>
                  <Label htmlFor="loan-term">Plazo (meses)</Label>
                  <Input id="loan-term" type="number" placeholder="12" />
                </div>
                <div>
                  <Label htmlFor="loan-frequency">Frecuencia de Pago</Label>
                  <Select id="loan-frequency">
                    <option value="monthly">Mensual</option>
                    <option value="weekly">Semanal</option>
                    <option value="biweekly">Quincenal</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="loan-purpose">Propósito del Préstamo</Label>
                  <Select id="loan-purpose">
                    <option value="">Seleccionar propósito</option>
                    <option value="personal">Personal</option>
                    <option value="business">Negocio</option>
                    <option value="education">Educación</option>
                    <option value="medical">Médico</option>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2 pt-6">
                <Button className="flex-1">
                  Crear Préstamo
                </Button>
                <Button variant="outline" onClick={() => setShowLoanForm(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}