import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';
import { HistoryTable } from "../HistoryTable/HistoryTable";
const OperationsDetailes = ({reports}) => {
  const columns = [
    {
      accessorKey: 'product_name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Product
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.getValue("product_name")}</span>,
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
      accessorKey: 'sales',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Sales (₺)
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.getValue("sales")}</span>,
    },
    {
      accessorKey: 'rate',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Rate
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.getValue("rate")}</span>,
    },
    {
      accessorKey: 'in_store_order_ids',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            In Store
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.getValue("in_store_order_ids").length}</span>,
    },
    {
      accessorKey: 'delivery_order_ids',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-left hover:bg-transparent hover:text-main-gold"
          >
            Delivery
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <span className="font-bold text-main-green">{row.getValue("delivery_order_ids").length}</span>,
    }
  ]

  return (
    <div className="space-y-6 ">

      {/* =====================
          Quick Stats Section
      ===================== */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Total Sales (₺)</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-2xl font-semibold ">
            {reports?.kpis?.total_sales?.value}
            <p className="text-sm text-gray-600 mt-1"> to yesterday: {reports?.kpis?.total_sales?.change_yesterday}</p>
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-xl font-semibold">
            {reports?.kpis?.orders?.value}
            <p className="text-sm text-gray-600 mt-1"> to yesterday: {reports?.kpis?.orders?.change_yesterday}</p>
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">AVG Order (₺)</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-xl font-semibold">
            {reports?.kpis?.avg_order?.value}
            <p className="text-sm text-gray-600 mt-1"> to yesterday: {reports?.kpis?.avg_order?.change_yesterday}</p>
          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Peak Hour</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-xl font-semibold">
            {reports?.kpis?.peak_hour?.value}
            <p className="text-sm text-gray-600 mt-1">yesterday: {reports?.kpis?.peak_hour?.yesterday}</p>

          </CardContent>
        </Card>

        <Card className="bg-main-gold/20 border-main-gold border-l-4">
          <CardHeader>
            <CardTitle className="text-main-green text-xl font-semibold">Lowest Hour</CardTitle>
          </CardHeader>
          <CardContent className="text-main-green text-xl font-semibold">
            {reports?.kpis?.lowest_hour?.value}
            <p className="text-sm text-gray-600 mt-1">yesterday: {reports?.kpis?.lowest_hour?.yesterday}</p>

          </CardContent>
        </Card>
      </div>

      {/* =====================
          Products Table
      ===================== */}
      <Card className="border-main-gold bg-main-gold/20 border-l-4">
        <CardHeader>
          <CardTitle className="text-main-green text-lg">Products Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <HistoryTable columns={columns} data={reports?.products_performance||[]} />
        </CardContent>
      </Card>

    </div>
  );
};

export default OperationsDetailes;
