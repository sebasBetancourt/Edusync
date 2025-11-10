<script setup lang="ts">

// @ts-expect-error definePageMeta es global de Nuxt
definePageMeta({
  layout: 'dashboard',
  breadcrumb: 'Mis Pagos'
})

const invoices = [
  {
    invoice: 'INV001',
    fecha: '24/06/26',
    paymentStatus: 'Pagado',
    totalAmount: '$250.00',
    paymentMethod: 'Tarjeta de Crédito',
  },
  {
    invoice: 'INV002',
    fecha: '24/06/26',
    paymentStatus: 'Pendiente',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    fecha: '24/06/26',
    paymentStatus: 'No Pagado',
    totalAmount: '$350.00',
    paymentMethod: 'Transferencia Bancaria',
  },
  {
    invoice: 'INV004',
    fecha: '24/06/26',
    paymentStatus: 'Pagado',
    totalAmount: '$450.00',
    paymentMethod: 'Tarjeta de Crédito',
  },
  {
    invoice: 'INV005',
    fecha: '24/06/26',
    paymentStatus: 'Pagado',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    fecha: '24/06/26',
    paymentStatus: 'Pendiente',
    totalAmount: '$200.00',
    paymentMethod: 'Transferencia Bancaria',
  },
  {
    invoice: 'INV007',
    fecha: '24/06/26',
    paymentStatus: 'No Pagado',
    totalAmount: '$300.00',
    paymentMethod: 'Tarjeta de Crédito',
  },
]
</script>

<template>
  <div class="flex flex-col gap-4 px-4 w-full h-full animate-fadeIn">
    <div class="grid gap-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Pagos
        </h2>
        <p class="text-muted-foreground">
          A responsive table component.
        </p>
      </div>
      <div class="flex gap-2">
        <Badge variant="secondary" class="rounded-full" as-child>
          <NuxtLink
            to="https://www.shadcn-vue.com/docs/components/table"
            external
            target="_blank"
          >
            Component Source
            <Icon name="tabler:arrow-up-right" />
          </NuxtLink>
        </Badge>
      </div>
    </div>
    <div class="w-50 md:w-full lg:w-250 grid gap-1">
      <Card class="">
        <CardHeader>
          <CardTitle>Basic</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="min-h-100px w-full flex items-center justify-center gap-4 md:min-h-200px">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead class="w-[100px]">
                    Id Pago
                  </TableHead>
                  <TableHead class="w-[100px]">
                    Fecha
                  </TableHead>
                  <TableHead>Estatus</TableHead>
                  <TableHead>Metodo</TableHead>
                  <TableHead class="text-right">
                    Monto
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="invoice in invoices" :key="invoice.invoice">
                  <TableCell class="font-medium">
                    {{ invoice.invoice }}
                  </TableCell>
                  <TableCell class="text-muted-foreground">
                    {{ invoice.fecha }}
                  </TableCell>
                  <TableCell>{{ invoice.paymentStatus }}</TableCell>
                  <TableCell>{{ invoice.paymentMethod }}</TableCell>
                  <TableCell class="text-right">
                    {{ invoice.totalAmount }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>
