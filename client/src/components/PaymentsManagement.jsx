import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select } from './ui/select'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { DataTable } from './DataTable'
import { 
  Plus, 
  DollarSign, 
  Calendar,
  Eye,
  Edit,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react'
import { useApp } from './AppContext'

const mockPayments = [
  {
    id: 'PAY-001',
    loanId: 'CR-001',
    clientName: 'Juan Carlos Pérez',
    amount: 4583333,
    paymentDate: '2024-07-30',
    dueDate: '2024-07-25',
    status: 'Pagado',
    paymentMethod: 'Transferencia',
    reference: 'TRF-789456',
    type: 'Cuota',
    lateDays: 5,
    penalty: 45833
  },
  {
    id: 'PAY-002',
    loanId: 'CR-002',
    clientName: 'María Elena García',
    amount: 1282051,
    paymentDate: null,
    dueDate: '2024-07-15',
    status: 'Vencido',
    paymentMethod: null,
    reference: null,
    type: 'Cuota',
    lateDays: 15,
    penalty: 128205
  },
  {
    id: 'PAY-003',
    loanId: 'CR-003',
    clientName: 'Carlos Roberto López',
    amount: 4130435,
    paymentDate: '2024-07-28',
    dueDate: '2024-07-28',
    status: 'Pagado',
    paymentMethod: 'Efectivo',
    reference: 'EFE-123789',
    type: 'Cuota',
    lateDays: 0,
    penalty: 0
  }
]

const mockClients = [
  { id: 'CLI-001', name: 'Juan Carlos Pérez', email: 'juan.perez@email.com' },
  { id: 'CLI-002', name: 'María Elena García', email: 'maria.garcia@email.com' },
  { id: 'CLI-003', name: 'Carlos Roberto López', email: 'carlos.lopez@email.com' },
  { id: 'CLI-004', name: 'Ana Sofía Martínez', email: 'ana.martinez@email.com' },
  { id: 'CLI-005', name: 'Luis Fernando Torres', email: 'luis.torres@email.com' }
]

export function PaymentsManagement() {
  const [isNewPaymentDialogOpen, setIsNewPaymentDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const { currency } = useApp()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      'Pagado': 'default',
      'Pendiente': 'secondary',
      'Vencido': 'destructive',
      'Parcial': 'destructive'
    }
    return <Badge variant={variants[status as keyof typeof variants] || 'outline'}>{status}</Badge>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pagado':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'Vencido':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'Pendiente':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const columns = [
    {
      key: 'id',
      label: 'ID Pago',
      sortable: true,
      render: (value: string) => <span className="font-mono">{value}</span>
    },
    {
      key: 'clientName',
      label: 'Cliente',
      sortable: true,
      render: (value: string, row: any) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-xs text-muted-foreground">{row.loanId}</p>
        </div>
      )
    },
    {
      key: 'amount',
      label: 'Monto',
      sortable: true,
      render: (value: number, row: any) => (
        <div>
          <p className="font-medium">{formatCurrency(value)}</p>
          {row.penalty > 0 && (
            <p className="text-xs text-red-600">+ {formatCurrency(row.penalty)} mora</p>
          )}
        </div>
      )
    },
    {
      key: 'dueDate',
      label: 'Fecha Venc.',
      sortable: true,
      className: 'hidden md:table-cell',
      render: (value: string) => new Date(value).toLocaleDateString('es-CO')
    },
    {
      key: 'paymentDate',
      label: 'Fecha Pago',
      className: 'hidden lg:table-cell',
      render: (value: string | null) => 
        value ? new Date(value).toLocaleDateString('es-CO') : '-'
    },
    {
      key: 'status',
      label: 'Estado',
      filterable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(value)}
          {getStatusBadge(value)}
          {row.lateDays > 0 && value !== 'Pagado' && (
            <span className="text-xs text-red-600">
              {row.lateDays}d retraso
            </span>
          )}
        </div>
      )
    },
    {
      key: 'paymentMethod',
      label: 'Método',
      className: 'hidden xl:table-cell',
      render: (value: string | null) => value || '-'
    },
    {
      key: 'reference',
      label: 'Referencia',
      className: 'hidden xl:table-cell',
      render: (value: string | null) => (
        <span className="font-mono text-xs">{value || '-'}</span>
      )
    },
    {
      key: 'actions',
      label: 'Acciones',
      render: (value: any, row: any) => (
        <div className="flex gap-1">
          <Button size="sm" variant="outline" onClick={() => setSelectedPayment(row)}>
            <Eye className="w-3 h-3" />
          </Button>
          {row.status !== 'Pagado' && (
            <Button size="sm" variant="outline">
              <Edit className="w-3 h-3" />
            </Button>
          )}
        </div>
      )
    }
  ]

  const filters = [
    {
      key: 'status',
      label: 'Estado',
      options: [
        { value: 'Pagado', label: 'Pagados' },
        { value: 'Pendiente', label: 'Pendientes' },
        { value: 'Vencido', label: 'Vencidos' },
        { value: 'Parcial', label: 'Parciales' }
      ]
    },
    {
      key: 'paymentMethod',
      label: 'Método',
      options: [
        { value: 'Transferencia', label: 'Transferencia' },
        { value: 'Efectivo', label: 'Efectivo' },
        { value: 'Tarjeta', label: 'Tarjeta' },
        { value: 'Cheque', label: 'Cheque' }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1>Pagos y Cobranzas</h1>
          <p className="text-muted-foreground">
            Gestiona pagos, registra cobros y controla la morosidad
          </p>
        </div>
        <Dialog open={isNewPaymentDialogOpen} onOpenChange={setIsNewPaymentDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Registrar Pago
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Nuevo Pago</DialogTitle>
            </DialogHeader>
            <NewPaymentForm onClose={() => setIsNewPaymentDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="text-center">
            <p className="text-2xl font-semibold text-green-600">{formatCurrency(125600000)}</p>
            <p className="text-sm text-muted-foreground">Recaudado Hoy</p>
          </div>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="text-center">
            <p className="text-2xl font-semibold text-blue-600">{formatCurrency(892000000)}</p>
            <p className="text-sm text-muted-foreground">Recaudado Mes</p>
          </div>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="text-center">
            <p className="text-2xl font-semibold text-red-600">156</p>
            <p className="text-sm text-muted-foreground">Pagos Vencidos</p>
          </div>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="text-center">
            <p className="text-2xl font-semibold text-yellow-600">{formatCurrency(245800000)}</p>
            <p className="text-sm text-muted-foreground">Por Vencer</p>
          </div>
        </Card>
      </div>

      {/* Payments Table */}
      <DataTable
        data={mockPayments}
        columns={columns}
        filters={filters}
        onRowClick={(row) => setSelectedPayment(row)}
        itemsPerPageOptions={[10, 25, 50, 100]}
        defaultItemsPerPage={10}
      />

      {/* Payment Detail Dialog */}
      {selectedPayment && (
        <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalle del Pago: {selectedPayment.id}</DialogTitle>
            </DialogHeader>
            <PaymentDetailView payment={selectedPayment} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function NewPaymentForm({ onClose }: { onClose: () => void }) {
  const { currency } = useApp()
  const [paymentData, setPaymentData] = useState({
    clientId: '',
    loanId: '',
    amount: '',
    paymentMethod: 'Transferencia',
    reference: '',
    paymentDate: new Date().toISOString().split('T')[0],
    notes: ''
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="client">Cliente *</Label>
          <Select
            value={paymentData.clientId}
            onValueChange={(value) => setPaymentData({ ...paymentData, clientId: value })}
          >
            <option value="">Seleccionar cliente</option>
            {mockClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} - {client.id}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="loan">Préstamo *</Label>
          <Select
            value={paymentData.loanId}
            onValueChange={(value) => setPaymentData({ ...paymentData, loanId: value })}
            disabled={!paymentData.clientId}
          >
            <option value="">Seleccionar préstamo</option>
            <option value="CR-001">CR-001 - {formatCurrency(50000000)}</option>
            <option value="CR-002">CR-002 - {formatCurrency(25000000)}</option>
            <option value="CR-003">CR-003 - {formatCurrency(75000000)}</option>
          </Select>
          {!paymentData.clientId && (
            <p className="text-xs text-muted-foreground mt-1">
              Primero selecciona un cliente
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Monto del Pago ({currency}) *</Label>
          <div className="relative">
            <DollarSign className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="amount"
              type="number"
              value={paymentData.amount}
              onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
              placeholder="0"
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="paymentDate">Fecha de Pago *</Label>
          <div className="relative">
            <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="paymentDate"
              type="date"
              value={paymentData.paymentDate}
              onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="paymentMethod">Método de Pago *</Label>
          <Select
            value={paymentData.paymentMethod}
            onValueChange={(value) => setPaymentData({ ...paymentData, paymentMethod: value })}
          >
            <option value="Transferencia">Transferencia Bancaria</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta de Débito/Crédito</option>
            <option value="Cheque">Cheque</option>
            <option value="PSE">PSE</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="reference">Referencia/Comprobante</Label>
          <Input
            id="reference"
            value={paymentData.reference}
            onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
            placeholder="Número de referencia o comprobante"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notas Adicionales</Label>
        <Input
          id="notes"
          value={paymentData.notes}
          onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
          placeholder="Observaciones del pago"
        />
      </div>

      {paymentData.loanId && paymentData.amount && (
        <Card className="p-4 bg-muted/30">
          <h4 className="mb-2">Resumen del Pago</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Cliente:</strong> Cliente seleccionado</div>
            <div><strong>Préstamo:</strong> {paymentData.loanId}</div>
            <div><strong>Monto:</strong> {paymentData.amount ? formatCurrency(parseFloat(paymentData.amount)) : formatCurrency(0)}</div>
            <div><strong>Método:</strong> {paymentData.paymentMethod}</div>
          </div>
        </Card>
      )}

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button disabled={!paymentData.clientId || !paymentData.loanId || !paymentData.amount}>
          Registrar Pago
        </Button>
      </div>
    </div>
  )
}

function PaymentDetailView({ payment }: { payment: any }) {
  const { currency } = useApp()
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      {/* Payment Header */}
      <div className="flex items-center justify-between p-6 bg-muted/30 rounded-lg">
        <div>
          <h3>Pago {payment.id}</h3>
          <p className="text-muted-foreground">{payment.clientName}</p>
          <p className="text-sm text-muted-foreground">Préstamo: {payment.loanId}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold">{formatCurrency(payment.amount)}</p>
          <Badge variant={payment.status === 'Pagado' ? 'default' : 'destructive'}>
            {payment.status}
          </Badge>
        </div>
      </div>

      {/* Payment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-muted-foreground">Fecha de Vencimiento</Label>
            <p className="font-medium">{new Date(payment.dueDate).toLocaleDateString('es-CO')}</p>
          </div>
          
          {payment.paymentDate && (
            <div>
              <Label className="text-muted-foreground">Fecha de Pago</Label>
              <p className="font-medium">{new Date(payment.paymentDate).toLocaleDateString('es-CO')}</p>
            </div>
          )}

          <div>
            <Label className="text-muted-foreground">Método de Pago</Label>
            <p className="font-medium">{payment.paymentMethod || 'No especificado'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-muted-foreground">Referencia</Label>
            <p className="font-medium font-mono">{payment.reference || 'No disponible'}</p>
          </div>

          {payment.lateDays > 0 && (
            <div>
              <Label className="text-muted-foreground">Días de Retraso</Label>
              <p className="font-medium text-red-600">{payment.lateDays} días</p>
            </div>
          )}

          {payment.penalty > 0 && (
            <div>
              <Label className="text-muted-foreground">Penalidad por Mora</Label>
              <p className="font-medium text-red-600">{formatCurrency(payment.penalty)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Amount Breakdown */}
      <Card className="p-4">
        <h4 className="mb-4">Desglose del Pago</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Monto de la Cuota:</span>
            <span className="font-medium">{formatCurrency(payment.amount - (payment.penalty || 0))}</span>
          </div>
          {payment.penalty > 0 && (
            <div className="flex justify-between">
              <span>Penalidad por Mora:</span>
              <span className="font-medium text-red-600">{formatCurrency(payment.penalty)}</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total Pagado:</span>
            <span>{formatCurrency(payment.amount)}</span>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        {payment.status !== 'Pagado' && (
          <>
            <Button variant="outline">
              Marcar como Pagado
            </Button>
            <Button>
              Registrar Pago Parcial
            </Button>
          </>
        )}
        <Button variant="outline">
          Imprimir Recibo
        </Button>
      </div>
    </div>
  )
}