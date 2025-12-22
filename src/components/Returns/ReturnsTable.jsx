
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useState } from "react"
import { Input } from "../ui/input"
import { Plus, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { DataTablePagination } from "../RawMateriales/TablePagination"
import { Button } from "../ui/button"



export default function ReturnsTable({
  columns,
  data,
  setIsDialogOpen,
}) {
  /* Global Filter State */
  const [globalFilter, setGlobalFilter] = useState("")

  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  })

  // const statusFilter = table.getState().columnFilters.find((filter) => filter.id === "status")?.value;
  const statuses = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "completed", label: "Completed" },
    { value: "rejected", label: "Rejected" },
  ];

  const currentStatus = table.getColumn("status")?.getFilterValue();

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="bg-white p-4 rounded-xl border border-main-green/20 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center flex-1">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              value={(globalFilter ?? "")}
              onChange={(event) =>
                setGlobalFilter(event.target.value)
              }
              className="pl-9 border-main-green/30 focus:border-main-green"
            />
          </div>
          <Select
            value={currentStatus || "all"}
            onValueChange={(value) => {
              table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value);
            }}
          >
            <SelectTrigger className="w-[180px] border-main-green/30">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((stat) => (
                <SelectItem key={stat.value} value={stat.value}>
                  {stat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* New Return Button */}
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-main-green hover:bg-main-green/90 text-main-gold"
        >
          <Plus className="w-4 h-4 " />
          New Return Request
        </Button>
      </div>
      <div className="overflow-hidden rounded-md border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-main-green hover:bg-main-green ">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-main-gold">

                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-4" >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}