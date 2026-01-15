import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryTable } from '../HistoryTable/HistoryTable';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';
const FinanceDtailes = ({ reports }) => {
  const columns = [
    {
      accessorKey: 'source',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Source
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.getValue("source")}</span>,
    },
    {
      accessorKey: 'total_sales',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Total Sales (₺)
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.getValue("total_sales")}</span>,
    },
    {
      accessorKey: 'net_income',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Net Income (₺)
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.getValue("net_income")}</span>,
    },
    {
      accessorKey: 'discount_percent',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Discount (%)
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.getValue("discount_percent")}</span>,
    },
    {
      accessorKey: 'orders',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Orders
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.getValue("orders")}</span>,
    },
    {
      accessorKey: 'avg_before_discount',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Avg Before Discount
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.getValue("avg_before_discount")}</span>,
    },
    {
      accessorKey: 'avg_after_discount',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Avg After Discount
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.getValue("avg_after_discount")}</span>,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">

        {/*  Sales Amount Card */}
        <Card className="md:col-span-2 border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Sales Amount (₺)</CardTitle>
          </CardHeader>
          <CardContent className='flex  items-center justify-between'>
            <p className="text-3xl font-semibold text-main-green">{reports?.kpis?.sales_amount?.value}</p>
            <div>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: {reports?.kpis?.sales_amount?.change_yesterday}</p>
              <p className="text-sm text-gray-600 mt-1"> to last month: {reports?.kpis?.sales_amount?.change_last_month}</p>
            </div>
          </CardContent>
        </Card>
        {/* Net Revenue Card */}
        <Card className="md:col-span-2 border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Net Revenue (₺)</CardTitle>
          </CardHeader>
          <CardContent className='flex  items-center justify-between'>
            <p className="text-3xl font-semibold text-main-green"> {reports?.kpis?.net_revenue?.value}</p>
            <div>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: {reports?.kpis?.net_revenue?.change_yesterday}</p>
              <p className="text-sm text-gray-600 mt-1"> to last month: {reports?.kpis?.net_revenue?.change_last_month}</p>
            </div>
          </CardContent>
        </Card>
        {/* Discount Amount Card */}
        <Card className=" border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Discount Amount (₺)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-main-green">{reports?.kpis?.discount_amount?.value || 0}</p>
            <div className='flex  items-center justify-between'>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className={reports?.kpis?.discount_amount?.change_yesterday?.startsWith("-") ? "text-red-600" : "text-green-600"}>{reports?.kpis?.discount_amount?.change_yesterday || 0}</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className={reports?.kpis?.discount_amount?.change_last_month?.startsWith("-") ? "text-red-600" : "text-green-600"}>{reports?.kpis?.discount_amount?.change_last_month || 0}</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Valid Orders Count */}
        <Card className=" border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Effective Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-main-green">{reports?.kpis?.orders?.value || 0}</p>
            <div className='flex  items-center justify-between'>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className={reports?.kpis?.orders?.change_yesterday < 0 ? "text-red-600" : "text-green-600"}>{reports?.kpis?.orders?.change_yesterday || 0}</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className={reports?.kpis?.orders?.change_last_month < 0 ? "text-red-600" : "text-green-600"}>{reports?.kpis?.orders?.change_last_month || 0}</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Average Order Amount (Before Discount) Card */}
        <Card className=" border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Average (Before Discount) (₺)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-main-green">{reports?.kpis?.avg_before_discount?.value || 0}</p>
            <div className='flex  items-center justify-between'>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className={reports?.kpis?.avg_before_discount?.change_yesterday?.startsWith("-") ? "text-red-600" : "text-green-600"}>{reports?.kpis?.avg_before_discount?.change_yesterday || 0}</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className={reports?.kpis?.avg_before_discount?.change_last_month?.startsWith("-") ? "text-red-600" : "text-green-600"}>{reports?.kpis?.avg_before_discount?.change_last_month || 0}</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Average Order Amount (after Discount) Card */}
        <Card className=" border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Average (After Discount) (₺)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-main-green">{reports?.kpis?.avg_after_discount?.value || 0}</p>
            <div className='flex  items-center justify-between'>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className={reports?.kpis?.avg_after_discount?.change_yesterday?.startsWith("-") ? "text-red-600" : "text-green-600"}>{reports?.kpis?.avg_after_discount?.change_yesterday || 0}</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className={reports?.kpis?.avg_after_discount?.change_last_month?.startsWith("-") ? "text-red-600" : "text-green-600"}>{reports?.kpis?.avg_after_discount?.change_last_month || 0}</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card className="mt-4 border border-l-4 border-main-gold bg-main-gold/20 ">
        <CardHeader>
          <CardTitle className="text-main-green text-xl font-semibold ">statistics Details</CardTitle>
        </CardHeader>
        <CardContent>
          <HistoryTable columns={columns} data={reports?.statistics_details || []} />
        </CardContent>
      </Card>
    </div>
  )
}

export default FinanceDtailes
