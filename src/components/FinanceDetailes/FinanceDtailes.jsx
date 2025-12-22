import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HistoryTable } from '../HistoryTable/HistoryTable';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';
const FinanceDtailes = () => {
  const data = [
    {
      source: "In Store",
      totalSales: 17775.4,
      netIncome: 11211.44,
      discount: 7563.96,
      orders: 700,
      avgBeforeDiscount: 27.31,
      avgAfterDiscount: 16.87
    },
    {
      source: "Delivery",
      totalSales: 2775.4,
      netIncome: 1211.44,
      discount: 1563.96,
      orders: 24,
      avgBeforeDiscount: 27.31,
      avgAfterDiscount: 16.87
    }
  ];
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
        )},
      cell: ({ row }) => <span className="font-bold text-main-green">{row.original.source}</span>,
    },
    {
      accessorKey: 'totalSales',
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
      cell: ({ row }) => <span className="font-bold text-main-green">${row.original.totalSales}</span>,
    },
    {
      accessorKey: 'netIncome',
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
      cell: ({ row }) => <span className="font-bold text-main-green">${row.original.netIncome}</span>,
    },
    {
      accessorKey: 'discount',
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
      cell: ({ row }) => <span className="font-bold text-main-green">${row.original.discount}</span>,
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
      cell: ({ row }) => <span className="font-bold text-main-green">{row.original.orders}</span>,
    },
    {
      accessorKey: 'avgBeforeDiscount',
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
      cell: ({ row }) => <span className="font-bold text-main-green">${row.original.avgBeforeDiscount}</span>,
    },
    {
      accessorKey: 'avgAfterDiscount',
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
      cell: ({ row }) => <span className="font-bold text-main-green">${row.original.avgAfterDiscount}</span>,
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
            <p className="text-3xl font-semibold text-main-green">19,775.40</p>
            <div>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-31.74%</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className="text-green-600">+3.74%</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Net Revenue Card */}
        <Card className="md:col-span-2 border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Net Revenue (₺)</CardTitle>
          </CardHeader>
          <CardContent className='flex  items-center justify-between'>
            <p className="text-3xl font-semibold text-main-green"> 12211.44</p>
            <div>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-31.74%</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className="text-green-600">+3.74%</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Discount Amount Card */}
        <Card className=" border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Discount Amount (₺)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-main-green">7563.96</p>
            <div className='flex  items-center justify-between'>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-31.74%</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className="text-green-600">+3.74%</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Valid Orders Count */}
        <Card className=" border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Effective Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-main-green">724</p>
            <div className='flex  items-center justify-between'>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-12</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className="text-red-600">-268</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Average Order Amount (Before Discount) Card */}
        <Card className=" border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Average (Before Discount) (₺)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-main-green">27.31</p>
            <div className='flex  items-center justify-between'>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-31.74%</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className="text-green-600">+3.74%</span></p>
            </div>
          </CardContent>
        </Card>
        {/* Average Order Amount (after Discount) Card */}
        <Card className=" border border-l-4 border-main-gold bg-main-gold/20 ">
          <CardHeader >
            <CardTitle className="text-main-green text-xl font-semibold">Average (After Discount) (₺)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-main-green">16.87</p>
            <div className='flex  items-center justify-between'>
              <p className="text-sm text-gray-600 mt-1"> to yesterday: <span className="text-red-600">-31.74%</span></p>
              <p className="text-sm text-gray-600 mt-1"> to last month: <span className="text-green-600">+3.74%</span></p>
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
          <HistoryTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  )
}

export default FinanceDtailes
