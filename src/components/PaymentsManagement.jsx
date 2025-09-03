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
  Receipt,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Phone,
  Mail
} from 'lucide-react'

// Mock data for payments
const mockPayments = [
  {
    id: 'PAG-001',
    loanId: 'PR-001',
    clientName: 'María García',
    amount: 450000,
    dueDate: '2024-04-15',
    paymentDate: '2024-04-14',
    status: 'Pagado',
    method: 'Transferencia',
    lateDays: 0,
    interestAmount: 12500,
    principalAmount: 437500,
    reference: 'TXN123456789'
  },
  {
    id: 'PAG-002',
    loanId: 'PR-002',
    clientName: 'Carlos Rodríguez',
    amount: 410000,
    dueDate: '2024-03-20',
    paymentDate: null,
    status: 'Vencido',
    method: null,
    lateDays: 26,
    interestAmount: 15000,
    principalAmount: 395000,
    reference: null
  },
  {
    id: 'PAG-003',
    loanId: 'PR-003',
    clientName: 'Ana Martínez',
    amount: 520000,
    dueDate: '2024-04-10',
    paymentDate: null,
    status: 'Pendiente',
    method: null,
    lateDays: 0,
    interestAmount: 18200,
    principalAmount: 501800,
    reference: null
  },
  {
    id: 'PAG-004',
    loanId: 'PR-001',
    clientName: 'María García',
    amount: 450000,
    dueDate: '2024-05-15',
    paymentDate: null,
    status: 'Programado',
    method: null,
    lateDays: 0,
    interestAmount: 12500,
    principalAmount: 437500,
    reference: null
  },
  {
    id: 'PAG-005',
    loanId: 'PR-004',
    clientName: 'Luis Fernández',
    amount: 380000,
    dueDate: '2024-04-18',
    paymentDate: null,
    status: 'Retraso',
    method: null,
    lateDays: 5,
    interestAmount: 22000,
    principalAmount: 358000,
    reference: null
  }
]

export function PaymentsManagement() {
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [showCollectionModal, setShowCollectionModal] = useState(false)
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
    const colors = {
      'Pagado': 'bg-green-100 text-green-800 border-green-200',
      'Vencido': 'bg-red-100 text-red-800 border-red-200',
      'Pendiente': 'bg-blue-100 text-blue-800 border-blue-200',
      'Programado': 'bg-gray-100 text-gray-800 border-gray-200',
      'Retraso': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    return (
      <Badge variant="outline" className={colors[status]}>
        {status}
      </Badge>
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pagado':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'Vencido':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case 'Retraso':
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <Receipt className="w-4 h-4 text-blue-600" />
    }
  }

  const columns = [
    {
      key: 'id',
      label: 'ID Pago',
      sortable: true,
      render: (value) => (
        <span className="font-mono font-medium">{value}</span>
      )
    },
    {
      key: 'loanId',
      label: 'Préstamo',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm">{value}</span>
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
      key: 'dueDate',
      label: 'Fecha Vencimiento',
      sortable: true,
      render: (value) => (
        <div className="text-sm">{value}</div>
      )
    },
    {
      key: 'status',
      label: 'Estado',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(value)}
          {getStatusBadge(value)}
          {row.lateDays > 0 && (
            <span className="text-xs text-red-600">
              +{row.lateDays}d
            </span>
          )}
        </div>
      )
    },
    {
      key: 'method',
      label: 'Método',
      sortable: true,
      render: (value) => (
        <span className="text-sm">{value || 'N/A'}</span>
      )
    },
    {
      key: 'paymentDate',
      label: 'Fecha Pago',
      sortable: true,
      render: (value) => (
        <span className="text-sm">{value || 'Pendiente'}</span>
      )
    }
  ]

  const filters = [
    {
      key: 'status',
      label: 'Estado',
      options: [
        { value: 'Pagado', label: 'Pagado' },
        { value: 'Vencido', label: 'Vencido' },
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'Programado', label: 'Programado' },
        { value: 'Retraso', label: 'Retraso' }
      ]
    },
    {
      key: 'method',
      label: 'Método',
      options: [
        { value: 'Transferencia', label: 'Transferencia' },
        { value: 'Efectivo', label: 'Efectivo' },
        { value: 'Cheque', label: 'Cheque' }
      ]
    }
  ]

  const handleRowClick = (payment) => {
    setSelectedPayment(payment)
  }

  const stats = {
    totalPayments: mockPayments.length,
    paidPayments: mockPayments.filter(p => p.status === 'Pagado').length,
    overduePayments: mockPayments.filter(p => p.status === 'Vencido').length,
    latePayments: mockPayments.filter(p => p.status === 'Retraso').length,
    totalCollected: mockPayments
      .filter(p => p.status === 'Pagado')
      .reduce((sum, p) => sum + p.amount, 0),
    pendingAmount: mockPayments
      .filter(p => p.status !== 'Pagado')
      .reduce((sum, p) => sum + p.amount, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1>Pagos y Cobranzas</h1>
          <p className="text-muted-foreground">
            Gestiona los pagos, cobranzas y seguimiento de la cartera
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowCollectionModal(true)}>
            <Phone className="w-4 h-4 mr-2" />
            Gestión de Cobro
          </Button>
          <Button onClick={() => setShowPaymentForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Registrar Pago
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Pagos</p>
              <p className="text-2xl font-semibold text-blue-600">{stats.totalPayments}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Receipt className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pagos Realizados</p>
              <p className="text-2xl font-semibold text-green-600">{stats.paidPayments}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pagos Vencidos</p>
              <p className="text-2xl font-semibold text-red-600">{stats.overduePayments}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">En Retraso</p>
              <p className="text-2xl font-semibold text-yellow-600">{stats.latePayments}</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Recaudado</p>
              <p className="text-xl font-semibold text-purple-600">{formatCurrency(stats.totalCollected)}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Monto Pendiente</p>
              <p className="text-xl font-semibold text-orange-600">{formatCurrency(stats.pendingAmount)}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Data Table */}
      <DataTable
        data={mockPayments}
        columns={columns}
        filters={filters}
        onRowClick={handleRowClick}
        searchable={true}
        filterable={true}
        exportable={true}
      />

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Detalles del Pago {selectedPayment.id}</h3>
                <Button variant="ghost" onClick={() => setSelectedPayment(null)}>
                  ×
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Payment Info */}
                <Card className="p-4">
                  <h4 className="mb-4">Información del Pago</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID Préstamo:</span>
                      <span className="font-mono font-medium">{selectedPayment.loanId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cliente:</span>
                      <span className="font-medium">{selectedPayment.clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monto Total:</span>
                      <span className="font-medium">{formatCurrency(selectedPayment.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capital:</span>
                      <span className="font-medium">{formatCurrency(selectedPayment.principalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Interés:</span>
                      <span className="font-medium">{formatCurrency(selectedPayment.interestAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estado:</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedPayment.status)}
                        {getStatusBadge(selectedPayment.status)}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Dates and Status */}
                <Card className="p-4">
                  <h4 className="mb-4">Fechas y Estado</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha Vencimiento:</span>
                      <span className="font-medium">{selectedPayment.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha de Pago:</span>
                      <span className="font-medium">{selectedPayment.paymentDate || 'Pendiente'}</span>
                    </div>
                    {selectedPayment.lateDays > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Días de Retraso:</span>
                        <span className="font-medium text-red-600">{selectedPayment.lateDays} días</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Método:</span>
                      <span className="font-medium">{selectedPayment.method || 'N/A'}</span>
                    </div>
                    {selectedPayment.reference && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Referencia:</span>
                        <span className="font-mono text-sm">{selectedPayment.reference}</span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              <div className="flex gap-2 pt-6">
                {selectedPayment.status !== 'Pagado' && (
                  <Button>Registrar Pago</Button>
                )}
                <Button variant="outline">Enviar Recordatorio</Button>
                <Button variant="outline">Ver Historial</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Register Payment Form */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Registrar Pago</h3>
                <Button variant="ghost" onClick={() => setShowPaymentForm(false)}>
                  ×
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="payment-loan">Préstamo</Label>
                  <Select id="payment-loan">
                    <option value="">Seleccionar préstamo</option>
                    <option value="PR-001">PR-001 - María García</option>
                    <option value="PR-002">PR-002 - Carlos Rodríguez</option>
                    <option value="PR-003">PR-003 - Ana Martínez</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="payment-amount">Monto</Label>
                  <Input id="payment-amount" type="number" placeholder="450000" />
                </div>
                <div>
                  <Label htmlFor="payment-method">Método de Pago</Label>
                  <Select id="payment-method">
                    <option value="">Seleccionar método</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="cheque">Cheque</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="payment-date">Fecha de Pago</Label>
                  <Input id="payment-date" type="date" />
                </div>
                <div>
                  <Label htmlFor="payment-reference">Referencia</Label>
                  <Input id="payment-reference" placeholder="Número de transacción" />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    Registrar Pago
                  </Button>
                  <Button variant="outline" onClick={() => setShowPaymentForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Collection Management Modal */}
      {showCollectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-3xl m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Gestión de Cobranza</h3>
                <Button variant="ghost" onClick={() => setShowCollectionModal(false)}>
                  ×
                </Button>
              </div>

              <div className="space-y-6">
                {/* Overdue Payments */}
                <div>
                  <h4 className="mb-4">Pagos Vencidos Urgentes</h4>
                  <div className="space-y-3">
                    {mockPayments.filter(p => p.status === 'Vencido').map((payment) => (
                      <Card key={payment.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                            <div>
                              <p className="font-medium">{payment.clientName}</p>
                              <p className="text-sm text-muted-foreground">
                                {payment.loanId} • Vencido desde {payment.dueDate}
                              </p>
                              <p className="text-sm font-medium text-red-600">
                                {payment.lateDays} días de retraso
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-red-600">{formatCurrency(payment.amount)}</p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline">
                                <Phone className="w-3 h-3 mr-1" />
                                Llamar
                              </Button>
                              <Button size="sm" variant="outline">
                                <Mail className="w-3 h-3 mr-1" />
                                Email
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Late Payments */}
                <div>
                  <h4 className="mb-4">Pagos en Retraso</h4>
                  <div className="space-y-3">
                    {mockPayments.filter(p => p.status === 'Retraso').map((payment) => (
                      <Card key={payment.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Clock className="w-6 h-6 text-yellow-600" />
                            <div>
                              <p className="font-medium">{payment.clientName}</p>
                              <p className="text-sm text-muted-foreground">
                                {payment.loanId} • Vence: {payment.dueDate}
                              </p>
                              <p className="text-sm font-medium text-yellow-600">
                                {payment.lateDays} días de retraso
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-yellow-600">{formatCurrency(payment.amount)}</p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline">
                                <Phone className="w-3 h-3 mr-1" />
                                Llamar
                              </Button>
                              <Button size="sm" variant="outline">
                                Recordatorio
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}