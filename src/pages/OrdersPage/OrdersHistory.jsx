import React from 'react'
import SectionHeader from '@/components/SctionHeader/SectionHeader'
import { HistoryTable } from '@/components/HistoryTable/HistoryTable'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'

const OrdersHistory = ({ orders }) => {




  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'canceled':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }
  const orderHistoryColumns = [
    {
      accessorKey: 'orderNumber',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Order No.
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className='text-lg font-semibold text-main-green'>#{row.original.orderNumber}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Date & Time
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'type',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Type
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="px-3 py-1 bg-main-gold/20 text-main-green text-xs font-medium rounded-full border border-main-gold/30">
        {row.original.type}
      </span>,
    },
    {
      accessorKey: 'itemsCount',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Items
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'totals',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Total Amount
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green ">${row.original.totals.finalAmount}</span>,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Status
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(row.original.status)}`}>
        {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
      </span>,
    },
    // {
    //   accessorKey: 'platform',
    //   header: 'Platform',
    // },
  ]

  return (
    <div className='mt-8 pb-8'>
      <SectionHeader title="Orders History" />
      <HistoryTable columns={orderHistoryColumns} data={orders} />
    </div>
  )
}

export default OrdersHistory
